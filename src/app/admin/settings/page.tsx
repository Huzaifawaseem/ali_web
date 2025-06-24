'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue, set } from 'firebase/database';
import type { ContactInfo } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

async function uploadFile(file: File, oldPublicId?: string): Promise<{ secure_url: string; public_id: string }> {
    if (oldPublicId) {
        try {
            await fetch('/api/delete-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_id: oldPublicId }),
            });
        } catch (e) {
            console.warn("Could not delete old file", e);
        }
    }

    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload image');
    }

    return response.json();
}

export default function SettingsAdminPage() {
  const [contactInfo, setContactInfo] = useState<Partial<ContactInfo>>({});
  const [loading, setLoading] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const contactInfoRef = ref(database, 'contactInfo');
    const unsubscribe = onValue(contactInfoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContactInfo(data);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let updatedInfo = { ...contactInfo };

    try {
      if (logoFile) {
        const { secure_url, public_id } = await uploadFile(logoFile, contactInfo.logoPublicId);
        updatedInfo.logoUrl = secure_url;
        updatedInfo.logoPublicId = public_id;
      }
      if (heroImageFile) {
        const { secure_url, public_id } = await uploadFile(heroImageFile, contactInfo.heroImagePublicId);
        updatedInfo.heroImageUrl = secure_url;
        updatedInfo.heroImagePublicId = public_id;
      }

      await set(ref(database, 'contactInfo'), updatedInfo);
      toast({ title: 'Settings updated successfully' });
      setLogoFile(null);
      setHeroImageFile(null);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error saving settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContactInfo(prev => ({ ...prev, [id]: value }));
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold font-headline mb-2">Manage Settings</h1>
        <p className="text-muted-foreground mb-6">Update your business branding, contact, and location details.</p>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
             <Button disabled>
              <Skeleton className="h-5 w-20" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold font-headline mb-2">Manage Settings</h1>
      <p className="text-muted-foreground mb-6">Update your business branding, contact, and location details.</p>
      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Update your site name, logo and hero banner.</CardDescription>
          </CardHeader>
           <CardContent className="space-y-6">
             <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" value={contactInfo.siteName || ''} onChange={handleChange} placeholder="e.g., Zenith Serenity" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input id="logo" type="file" onChange={handleFileChange(setLogoFile)} accept="image/*" />
                {(logoFile || contactInfo.logoUrl) && (
                  <div className="mt-2 p-2 border rounded-md inline-block bg-muted">
                    <Image src={logoFile ? URL.createObjectURL(logoFile) : contactInfo.logoUrl!} alt="Logo preview" width={100} height={40} className="object-contain" />
                  </div>
                )}
            </div>
             <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Banner Image</Label>
                <Input id="heroImage" type="file" onChange={handleFileChange(setHeroImageFile)} accept="image/*" />
                 {(heroImageFile || contactInfo.heroImageUrl) && (
                  <div className="mt-2 p-2 border rounded-md inline-block bg-muted">
                    <Image src={heroImageFile ? URL.createObjectURL(heroImageFile) : contactInfo.heroImageUrl!} alt="Hero image preview" width={200} height={100} className="object-cover rounded-md" />
                  </div>
                )}
            </div>
          </CardContent>

          <div className="border-t">
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>This information will be displayed on your website's footer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" value={contactInfo.whatsapp || ''} onChange={handleChange} placeholder="e.g., 923001234567" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={contactInfo.email || ''} onChange={handleChange} placeholder="contact@example.com" />
                </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Physical Address</Label>
                    <Input id="address" value={contactInfo.address || ''} onChange={handleChange} placeholder="123 Serenity St, Lahore, Pakistan" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input id="facebook" value={contactInfo.facebook || ''} onChange={handleChange} placeholder="https://facebook.com/yourpage" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input id="instagram" value={contactInfo.instagram || ''} onChange={handleChange} placeholder="https://instagram.com/yourpage" />
                    </div>
                </div>
            </CardContent>
          </div>

          <div className="border-t">
            <CardHeader>
                <CardTitle>Map Location</CardTitle>
                 <CardDescription>Coordinates for the map on your homepage.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="mapLat">Map Latitude</Label>
                        <Input id="mapLat" value={contactInfo.mapLat || ''} onChange={handleChange} placeholder="e.g., 31.512088" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mapLng">Map Longitude</Label>
                        <Input id="mapLng" value={contactInfo.mapLng || ''} onChange={handleChange} placeholder="e.g., 74.358744" />
                    </div>
                </div>
            </CardContent>
           </div>
           
            <CardFooter>
                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save All Settings'}</Button>
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
