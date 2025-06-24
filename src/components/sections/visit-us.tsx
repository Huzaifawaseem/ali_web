'use client';

import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { ContactInfo } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function VisitUs() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [loading, setLoading] = useState(true);

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

  const mapSrc = contactInfo.mapLat && contactInfo.mapLng 
    ? `https://maps.google.com/maps?q=${contactInfo.mapLat},${contactInfo.mapLng}&z=15&output=embed`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.534255113881!2d74.35874481515053!3d31.51208888137305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045501416747%3A0x86d691e8138765e!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1626352936319!5m2!1sen!2sus`;

  return (
    <section id="visit-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Visit Our Massage Spa
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Step into our massage spa, a sanctuary of peace, and leave your worries behind.
          </p>
        </div>
        <div className="mt-12 rounded-lg overflow-hidden">
          {loading ? (
             <Skeleton className="w-full h-[450px]" />
          ) : (
            <iframe
              src={mapSrc}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}
