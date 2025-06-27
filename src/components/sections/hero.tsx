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
    <section className="relative h-[80vh] md:h-[60vh] min-h-[600px] md:min-h-[500px] w-full flex items-center justify-center text-white p-4">
      {loading ? (
        <Skeleton className="absolute inset-0" />
      ) : (
        <Image
          src={imageUrl}
          alt="Luxurious massage room at Royal Massage and Spa Karachi"
          fill
          className="object-cover"
          priority
          data-ai-hint="spa massage karachi"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center mt-16 md:mt-0">
        <h1 className="font-headline text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 ease-out">
          Welcome to Royal Massage and Spa Karachi
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-xl text-white/90 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-200 ease-out fill-mode-forwards">
          Royal Massage and Spa Karachi is fully dedicated to consistently providing high-value customer satisfaction by rendering excellent services of massage in Karachi. We focus on quality products and furnishing a luxurious atmosphere at an affordable price/value relationship in our massage center in Karachi. We will also maintain a friendly, hospitable, and professional work environment. So explore new varieties of massage at Royal Massage and Spa Karachi.
        </p>
        <Button asChild size="lg" className="mt-8 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-400 ease-out fill-mode-forwards">
          <Link href="#packages">Book Now</Link>
        </Button>
      </div>
    </section>
  );
}
