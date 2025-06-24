'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { Room } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomsRef = ref(database, 'rooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const roomList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setRooms(roomList);
      } else {
        setRooms([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="rooms" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Our Serene Massage Rooms
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explore our tranquil massage rooms, designed for your ultimate relaxation and rejuvenation at our spa.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4" />
                </CardContent>
              </Card>
            ))
          ) : rooms.length > 0 ? (
            rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden group animate-in fade-in-50 duration-700">
                <div className="relative h-64 w-full">
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4 bg-secondary">
                  <h3 className="text-lg font-semibold font-headline">{room.name}</h3>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">No room images available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
