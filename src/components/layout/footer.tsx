'use client';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '../logo';
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { ContactInfo } from '@/lib/types';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});

  useEffect(() => {
    const contactInfoRef = ref(database, 'contactInfo');
    const unsubscribe = onValue(contactInfoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContactInfo(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const whatsappLink = contactInfo.whatsapp ? `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}` : "#";

  return (
    <footer id="contact" className="bg-secondary">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
                <Logo />
                <p className="text-muted-foreground">Experience tranquility and rejuvenation.</p>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                {contactInfo.whatsapp && <p className="text-muted-foreground">Phone: {contactInfo.whatsapp}</p>}
                {contactInfo.email && <p className="text-muted-foreground">Email: {contactInfo.email}</p>}
                {contactInfo.address && <p className="text-muted-foreground">Address: {contactInfo.address}</p>}
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Follow Us</h3>
                <div className="flex space-x-4">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                        <WhatsAppIcon className="h-6 w-6 fill-current"/>
                    </Link>
                    {contactInfo.facebook && (
                        <Link href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Facebook className="h-6 w-6" />
                        </Link>
                    )}
                    {contactInfo.instagram && (
                         <Link href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Instagram className="h-6 w-6" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zenith Serenity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
