'use client';

import { Button } from '@/components/ui/button';
import { database } from '@/lib/firebase/clientApp';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import type { ContactInfo } from '@/lib/types';

export function Cta() {
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

    const handleContactClick = () => {
        if (!contactInfo.whatsapp) {
            alert("Contact information is not available yet.");
            return;
        }
        const message = encodeURIComponent(`Hello! I'm interested in becoming a member.`);
        const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };
    
    return (
        <section id="cta" className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                    Luxury, Quality & Comfort at Royal Massage Spa Karachi
                </h2>
                <p className="mt-2 text-xl md:text-2xl font-semibold text-foreground">Become a Member</p>
                <div className="mt-6 max-w-3xl mx-auto text-muted-foreground space-y-4 leading-relaxed">
                    <p>
                        Have you been feeling stressed, tense, or anxious lately?
                    </p>
                    <p>
                        At Royal Massage Spa Karachi, we know what might help — a hot stone massage! It involves the use of smooth, heated stones that warm and relax your muscles, melting away stress and tension.
                    </p>
                    <p>
                        Come and visit Royal Massage Spa Karachi for an unforgettable, rejuvenating experience.
                    </p>
                </div>
                <Button size="lg" className="mt-8" onClick={handleContactClick}>
                    Contact Us
                </Button>
            </div>
        </section>
    );
}
