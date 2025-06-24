'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue, set, push, remove } from 'firebase/database';
import type { Package } from '@/lib/types';
import { getColumns } from '@/components/admin/packages/columns';
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
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Partial<Package> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const packagesRef = ref(database, 'packages');
    const unsubscribe = onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedPackages = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setPackages(loadedPackages);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = (pkg: Package) => {
    setCurrentPackage(pkg);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await remove(ref(database, `packages/${id}`));
        toast({ title: 'Package deleted successfully' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error deleting package' });
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPackage || !currentPackage.name || !currentPackage.price || !currentPackage.description) {
        toast({ variant: 'destructive', title: 'Please fill all fields.' });
        return
    };

    const packageData = {
        name: currentPackage.name,
        description: currentPackage.description,
        price: currentPackage.price,
    };
    
    try {
        if (currentPackage.id) {
            await set(ref(database, `packages/${currentPackage.id}`), packageData);
            toast({ title: 'Package updated successfully' });
        } else {
            await push(ref(database, 'packages'), packageData);
            toast({ title: 'Package added successfully' });
        }
        setIsDialogOpen(false);
        setCurrentPackage(null);
    } catch(error) {
        toast({ variant: 'destructive', title: 'Error saving package' });
    }
  };
  
  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Manage Packages</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => { setCurrentPackage({}); setIsDialogOpen(true)}}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Package
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSave}>
                    <DialogHeader>
                        <DialogTitle>{currentPackage?.id ? 'Edit' : 'Add'} Package</DialogTitle>
                        <DialogDescription>
                            {currentPackage?.id ? 'Edit the details of the package.' : 'Add a new package to your services.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={currentPackage?.name || ''} onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price</Label>
                            <Input id="price" value={currentPackage?.price || ''} onChange={(e) => setCurrentPackage({...currentPackage, price: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" value={currentPackage?.description || ''} onChange={(e) => setCurrentPackage({...currentPackage, description: e.target.value})} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>
      {loading ? <p>Loading...</p> : <DataTable columns={columns} data={packages} />}
    </div>
  );
}
