'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { Package, ContactInfo } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const packagesRef = ref(database, 'packages');
    const contactInfoRef = ref(database, 'contactInfo');

    const unsubscribePackages = onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const packageList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setPackages(packageList);
      } else {
        setPackages([]);
      }
      setLoading(false);
    });
    
    const unsubscribeContact = onValue(contactInfoRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setContactInfo(data);
        }
    });

    return () => {
        unsubscribePackages();
        unsubscribeContact();
    };
  }, []);

  const handleBookNow = (pkg: Package) => {
    if (!contactInfo.whatsapp) {
        alert("WhatsApp number is not configured yet. Please contact us directly.");
        return;
    }
    const message = encodeURIComponent(`Hello! I would like to book the "${pkg.name}" package for ${pkg.price}.`);
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="packages" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Massage Packages
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Find the perfect massage treatment to suit your needs and restore your well-being at our spa.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-1" />
                </CardHeader>
                <CardContent className="flex-grow">
                   <Skeleton className="h-8 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : packages.length > 0 ? (
            packages.map((pkg) => (
              <Card key={pkg.id} className="flex flex-col animate-in fade-in-50 duration-500 transition-all hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-2xl font-bold text-foreground">{pkg.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleBookNow(pkg)}>Book Now</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
             <p className="col-span-full text-center text-muted-foreground">No packages available at the moment. Please check back later.</p>
          )}
        </div>
      </div>
    </section>
  );
}
