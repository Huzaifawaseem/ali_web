'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { database } from '@/lib/firebase/clientApp';
import { ref as dbRef, onValue, set, push, remove } from 'firebase/database';
import type { Therapist } from '@/lib/types';
import { getColumns } from '@/components/admin/therapists/columns';
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

export default function TherapistsAdminPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTherapist, setCurrentTherapist] = useState<Partial<Therapist>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const therapistsRef = dbRef(database, 'therapists');
    const unsubscribe = onValue(therapistsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTherapists = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setTherapists(loadedTherapists);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleEdit = (therapist: Therapist) => {
    setCurrentTherapist(therapist);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (therapist: Therapist) => {
    if (window.confirm('Are you sure you want to delete this therapist?')) {
      try {
        if (therapist.imagePublicId) {
            await deleteImage(therapist.imagePublicId);
        }
        await remove(dbRef(database, `therapists/${therapist.id}`));
        toast({ title: 'Therapist deleted successfully' });
      } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error deleting therapist' });
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTherapist.name || !currentTherapist.specialization || !currentTherapist.experience) {
        toast({ variant: 'destructive', title: 'Please fill all fields.' });
        return;
    }

    if (!currentTherapist.id && !imageFile) {
      toast({ variant: 'destructive', title: 'Please select an image for the new therapist.' });
      return;
    }

    setLoading(true);
    
    let imageUrl = currentTherapist.imageUrl || '';
    let imagePublicId = currentTherapist.imagePublicId || '';

    try {
        if (imageFile) {
            // Delete old image from Cloudinary if it exists
            if (currentTherapist.imagePublicId) {
                await deleteImage(currentTherapist.imagePublicId);
            }

            // Upload new image to Cloudinary
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

        const therapistData = {
            name: currentTherapist.name,
            specialization: currentTherapist.specialization,
            experience: currentTherapist.experience,
            imageUrl,
            imagePublicId,
        };

        if (currentTherapist.id) {
            await set(dbRef(database, `therapists/${currentTherapist.id}`), therapistData);
            toast({ title: 'Therapist updated successfully' });
        } else {
            await push(dbRef(database, 'therapists'), therapistData);
            toast({ title: 'Therapist added successfully' });
        }
        handleDialogChange(false);
    } catch (error) {
        console.error("Error saving therapist:", error);
        toast({ variant: 'destructive', title: 'Error saving therapist' });
    } finally {
        setLoading(false);
    }
  };
  
  const handleDialogChange = (isOpen: boolean) => {
      setIsDialogOpen(isOpen);
      if (!isOpen) {
          setCurrentTherapist({});
          setImageFile(null);
      }
  }

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Manage Therapists</h1>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Therapist
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSave}>
                    <DialogHeader>
                        <DialogTitle>{currentTherapist.id ? 'Edit' : 'Add'} Therapist</DialogTitle>
                        <DialogDescription>
                            {currentTherapist.id ? 'Update the details of this professional.' : 'Add a new professional to your team.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={currentTherapist?.name || ''} onChange={(e) => setCurrentTherapist({...currentTherapist, name: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="specialization" className="text-right">Specialization</Label>
                            <Input id="specialization" value={currentTherapist?.specialization || ''} onChange={(e) => setCurrentTherapist({...currentTherapist, specialization: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="experience" className="text-right">Experience</Label>
                             <Input id="experience" value={currentTherapist?.experience || ''} onChange={(e) => setCurrentTherapist({...currentTherapist, experience: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">Image</Label>
                            <Input id="image" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="col-span-3" accept="image/*" />
                        </div>
                         {currentTherapist.id && currentTherapist.imageUrl && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <div className="col-start-2 col-span-3 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Image src={currentTherapist.imageUrl} alt="Current" width={40} height={40} className="rounded-md" />
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
      {loading && therapists.length === 0 ? <p>Loading...</p> : <DataTable columns={columns} data={therapists} />}
    </div>
  );
}
