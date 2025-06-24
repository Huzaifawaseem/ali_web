'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import { Skeleton } from '../ui/skeleton';

export function Hero() {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const heroImageUrlRef = ref(database, 'contactInfo/heroImageUrl');
    const unsubscribe = onValue(heroImageUrlRef, (snapshot) => {
      const url = snapshot.val();
      setHeroImageUrl(url);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const imageUrl = heroImageUrl || "https://placehold.co/1920x1080.png";

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-white">
      {loading ? (
        <Skeleton className="absolute inset-0" />
      ) : (
        <Image
          src={imageUrl}
          alt="Luxurious massage room at Royal Massage Spa center"
          fill
          className="object-cover"
          priority
          data-ai-hint="spa massage"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center p-4">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 ease-out">
          Relax Your Body, Refresh Your Mind
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-200 ease-out fill-mode-forwards">
          Discover a world of tranquility with our customized massage packages, designed to relax your body and refresh your mind.
        </p>
        <Button asChild size="lg" className="mt-8 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-400 ease-out fill-mode-forwards">
          <Link href="#packages">Book Now</Link>
        </Button>
      </div>
    </section>
  );
}
