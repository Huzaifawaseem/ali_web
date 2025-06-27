'use client';
import { Wind } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { ContactInfo } from '@/lib/types';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

export function Logo({ className }: { className?: string }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>('Royal Massage Spa');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contactInfoRef = ref(database, 'contactInfo');
    const unsubscribe = onValue(contactInfoRef, (snapshot) => {
      const data: ContactInfo | null = snapshot.val();
      if (data) {
        setLogoUrl(data.logoUrl || null);
        setSiteName(data.siteName || 'Royal Massage Spa');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-36" />
        </div>
    )
  }

  return (
    <Link href="/" className={cn("flex items-center gap-2 min-w-0", className)}>
      {logoUrl ? (
        <Image src={logoUrl} alt={siteName} width={40} height={40} className="rounded-md object-contain h-10 flex-shrink-0" />
      ) : (
        <div className="bg-primary p-2 rounded-md flex-shrink-0">
          <Wind className="h-6 w-6 text-primary-foreground" />
        </div>
      )}
      <span className="font-headline text-xl font-bold text-foreground truncate">
        {siteName}
      </span>
    </Link>
  );
}
