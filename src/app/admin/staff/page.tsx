'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { database } from '@/lib/firebase/clientApp';
import { ref as dbRef, onValue, set, push, remove } from 'firebase/database';
import type { Staff } from '@/lib/types';
import { getColumns } from '@/components/admin/staff/columns';
import { useToast } from '@/hooks/use-toast';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

async function deleteImage(publicId: string) {
    try {
        await fetch('/api/delete-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public_id: publicId }),
        });
    } catch (error) {
        console.error("Failed to delete image from Cloudinary", error);
    }
}

export default function StaffAdminPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Partial<Staff>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const staffRef = dbRef(database, 'staff');
    const unsubscribe = onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      const loadedStaff = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setStaff(loadedStaff);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleEdit = (staffMember: Staff) => {
    setCurrentStaff(staffMember);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (staffMember: Staff) => {
    if (window.confirm('Are you sure you want to delete this staff image?')) {
      try {
        if (staffMember.imagePublicId) {
            await deleteImage(staffMember.imagePublicId);
        }
        await remove(dbRef(database, `staff/${staffMember.id}`));
        toast({ title: 'Staff image deleted successfully' });
      } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error deleting staff image' });
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStaff.name) {
        toast({ variant: 'destructive', title: 'Please provide a name for the image.' });
        return;
    }

    if (!currentStaff.id && !imageFile) {
      toast({ variant: 'destructive', title: 'Please select an image for the new staff member.' });
      return;
    }

    setLoading(true);
    let imageUrl = currentStaff.imageUrl || '';
    let imagePublicId = currentStaff.imagePublicId || '';

    try {
        if (imageFile) {
            if (currentStaff.imagePublicId) {
                await deleteImage(currentStaff.imagePublicId);
            }

            const formData = new FormData();
            formData.append('file', imageFile);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

             if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            
            const { secure_url, public_id } = await response.json();
            imageUrl = secure_url;
            imagePublicId = public_id;
        }

        const staffData = {
            name: currentStaff.name,
            imageUrl,
            imagePublicId,
        };

        if (currentStaff.id) {
            await set(dbRef(database, `staff/${currentStaff.id}`), staffData);
            toast({ title: 'Staff member updated successfully' });
        } else {
            await push(dbRef(database, 'staff'), staffData);
            toast({ title: 'Staff member added successfully' });
        }
        handleDialogChange(false);
    } catch (error) {
        console.error("Error saving staff member:", error);
        toast({ variant: 'destructive', title: 'Error saving staff member' });
    } finally {
        setLoading(false);
    }
  };
  
  const handleDialogChange = (isOpen: boolean) => {
      setIsDialogOpen(isOpen);
      if (!isOpen) {
          setCurrentStaff({});
          setImageFile(null);
      }
  }

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Manage Staff Images</h1>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Staff Image
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSave}>
                    <DialogHeader>
                        <DialogTitle>{currentStaff.id ? 'Edit' : 'Add'} Staff Image</DialogTitle>
                        <DialogDescription>
                            {currentStaff.id ? 'Update the details of this image.' : 'Add a new image to your staff gallery.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name/Title</Label>
                            <Input id="name" value={currentStaff?.name || ''} onChange={(e) => setCurrentStaff({...currentStaff, name: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">Image</Label>
                            <Input id="image" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="col-span-3" accept="image/*" />
                        </div>
                         {currentStaff.id && currentStaff.imageUrl && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <div className="col-start-2 col-span-3 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Image src={currentStaff.imageUrl} alt="Current" width={40} height={40} className="rounded-md object-cover" />
                                    <span>{imageFile ? "Replacing current image" : "Current image"}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => handleDialogChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      {loading && staff.length === 0 ? <p>Loading...</p> : <DataTable columns={columns} data={staff} />}
    </div>
  );
}
