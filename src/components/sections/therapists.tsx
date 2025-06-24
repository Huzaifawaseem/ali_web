'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { Therapist } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function Therapists() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const therapistsRef = ref(database, 'therapists');
    const unsubscribe = onValue(therapistsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const therapistList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setTherapists(therapistList);
      } else {
        setTherapists([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="therapists" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Meet Our Professional Massage Therapists
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our team of certified and experienced professionals at our massage center are dedicated to your complete wellness.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
               <Card key={i} className="text-center border-0 shadow-none bg-transparent">
                  <CardHeader className="p-0">
                    <Skeleton className="rounded-full aspect-square object-cover mx-auto w-40 h-40" />
                  </CardHeader>
                  <CardContent className="mt-4 space-y-2">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                    <Skeleton className="h-4 w-1/3 mx-auto" />
                  </CardContent>
                </Card>
            ))
          ) : therapists.length > 0 ? (
            therapists.map((therapist) => (
              <Dialog key={therapist.id}>
                <DialogTrigger asChild>
                  <Card className="text-center border-0 shadow-none bg-transparent animate-in fade-in-50 duration-700 transition-transform ease-in-out hover:scale-110 cursor-pointer">
                    <CardHeader className="p-0">
                      <Image
                        src={therapist.imageUrl}
                        alt={therapist.name}
                        width={400}
                        height={400}
                        className="rounded-full aspect-square object-cover mx-auto w-40 h-40"
                      />
                    </CardHeader>
                    <CardContent className="mt-4">
                      <h3 className="text-xl font-semibold">{therapist.name}</h3>
                      <p className="text-primary-foreground font-medium">{therapist.specialization}</p>
                      <p className="text-muted-foreground">{therapist.experience}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 bg-transparent border-0">
                   <Image
                    src={therapist.imageUrl}
                    alt={therapist.name}
                    width={800}
                    height={800}
                    className="rounded-lg object-contain w-full h-auto max-h-[90vh]"
                  />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">No therapists available at the moment. Please check back later.</p>
          )}
        </div>
      </div>
    </section>
  );
}
