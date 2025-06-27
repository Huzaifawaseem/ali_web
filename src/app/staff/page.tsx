'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { database } from '@/lib/firebase/clientApp';
import { ref, onValue } from 'firebase/database';
import type { Staff, ContactInfo } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staffRef = ref(database, 'staff');
    const contactInfoRef = ref(database, 'contactInfo');

    const unsubscribeStaff = onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      const loadedStaff = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setStaff(loadedStaff);
      setLoading(false);
    });

    const unsubscribeContact = onValue(contactInfoRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setContactInfo(data);
        }
    });

    return () => {
        unsubscribeStaff();
        unsubscribeContact();
    };
  }, []);

  const handleBookNow = () => {
    if (!contactInfo.whatsapp) {
        alert("WhatsApp number is not configured yet. Please contact us directly.");
        return;
    }
    const message = encodeURIComponent(`Hello! I would like to book a service.`);
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-background">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-3xl md:text-4xl font-bold">
                    Our Staff
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Get a glimpse of our professional team and the environment we cultivate.
                </p>
            </div>
            <div className="mt-12">
                {loading ? (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                             <Skeleton key={i} className={`h-64 w-full rounded-lg ${i % 3 === 0 ? 'h-80' : ''}`} />
                        ))}
                    </div>
                ) : staff.length > 0 ? (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {staff.map((member) => (
                             <Dialog key={member.id}>
                                <DialogTrigger asChild>
                                    <div className="break-inside-avoid">
                                        <Card className="overflow-hidden cursor-pointer group transition-all hover:shadow-xl hover:scale-105">
                                             <div className="relative aspect-[3/4] w-full">
                                                <Image
                                                    src={member.imageUrl}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                             <CardContent className="p-4 bg-secondary">
                                                <h3 className="font-semibold font-headline truncate">{member.name}</h3>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                                    <div className="relative aspect-video w-full">
                                        <Image
                                            src={member.imageUrl}
                                            alt={member.name}
                                            fill
                                            className="rounded-lg object-contain w-full h-auto max-h-[90vh]"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                ) : (
                    <p className="col-span-full text-center text-muted-foreground">No staff images available at the moment.</p>
                )}
            </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-border">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <div className="space-y-6 text-center">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                        ROYAL MASSAGE & SPA KARACHI
                    </h2>
                    <p className="text-muted-foreground italic text-lg">
                        “Relinquish stress and embrace serenity at Karachi Massage Center – where every touch is a journey to inner peace.”
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        At Royal Massage Spa Karachi, we believe that self-care is not a luxury; it’s a necessity. Our dedicated team of skilled therapists is here to transport you to a realm of tranquility and rejuvenation. Discover the myriad of services we offer, all designed to restore your body, mind, and spirit.
                    </p>
                    <div className="space-y-4">
                        <p className="text-muted-foreground italic">“Indulge in tranquility at Karachi Massage Center, where relaxation meets rejuvenation.”</p>
                        <p className="text-muted-foreground italic">“Revitalize your senses with our rejuvenating massage and spa Karachi treatments.”</p>
                        <p className="text-muted-foreground italic">“Escape the ordinary and embrace tranquility at our luxurious massage and spa retreat.”</p>
                    </div>
                </div>

                <div className="space-y-8 pt-12 border-t border-border">
                     <div className="text-center space-y-4">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Facials & Skin At Royal Massage Spa Karachi</h2>
                        <p className="text-muted-foreground italic">“Indulge in a world of relaxation with our expertly crafted massage and spa Karachi experiences.”</p>
                        <p className="text-muted-foreground italic">“Karachi Massage Center: Your sanctuary for wellness, where tranquility and luxury converge.”</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Facials & Skin Care at Royal Massage Spa Karachi: Nurturing Radiance and Wellness from Within</h3>
                        <p className="text-muted-foreground leading-relaxed">Our skin, the body’s largest organ, is a canvas that reflects our inner well-being and outer beauty. In the quest for healthy and radiant skin, facials and comprehensive skin care play an instrumental role. This detailed exploration delves into the world of facials, offering insights into their benefits, the science behind them, and the essential components of an effective skincare regimen. Welcome to Royal Massage Spa Karachi.</p>
                    </div>

                    <div className="space-y-4 text-center">
                        <p className="text-muted-foreground italic">“Pamper yourself with the finest massage and spa Karachi services, tailored for ultimate bliss.”</p>
                        <p className="text-muted-foreground italic">“Escape the hustle and bustle as Karachi Massage Center pampers your senses with a touch of serenity.”</p>
                        <p className="text-muted-foreground italic">“Embark on a voyage of self-discovery at Karachi Massage Center, where the healing power of touch meets the art of relaxation.”</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Unveiling the Beauty Beneath at Royal Massage Spa Karachi: The Significance of Facials</h3>
                        <p className="text-muted-foreground leading-relaxed">Facials are more than just indulgent spa treatments; they are a holistic approach to skin health. At their core, facials involve the cleansing, exfoliation, and nourishment of the skin, promoting its vitality and glow. These treatments cater to various skin types and concerns, offering customized solutions for everything from hydration and anti-aging to acne and hyperpigmentation.</p>
                        <p className="text-muted-foreground italic text-center">“Embark on a journey of bliss at Karachi Massage Center, where stress melts away with every soothing stroke.”</p>
                        <p className="text-muted-foreground italic text-center">“Discover the art of well-being through our signature massage and spa Karachi therapies.”</p>
                    </div>
                    
                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Science Meets Serenity at Royal Massage Spa Karachi: The Mechanics of a Facial</h3>
                        <p className="text-muted-foreground leading-relaxed">Facials are grounded in science, combining expertise with luxurious relaxation. A typical facial involves a multi-step process:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><span className="font-semibold text-foreground">Cleansing and Analysis:</span> The skin is cleansed to remove impurities and makeup. A professional analysis is conducted to determine the skin’s specific needs.</li>
                            <li><span className="font-semibold text-foreground">Exfoliation:</span> Dead skin cells are gently removed through exfoliation techniques, revealing fresh, radiant skin beneath.</li>
                            <li><span className="font-semibold text-foreground">Extraction:</span> If necessary, clogged pores are cleared of debris and excess oil through gentle extraction.</li>
                            <li><span className="font-semibold text-foreground">Massage:</span> A soothing massage follows, enhancing blood circulation, relaxing facial muscles, and promoting a sense of well-being.</li>
                            <li><span className="font-semibold text-foreground">Masking:</span> A carefully selected mask is applied to address specific skin concerns, such as hydration, firming, or clarifying.</li>
                            <li><span className="font-semibold text-foreground">Serums and Moisturizers:</span> High-quality serums and moisturizers are applied to nourish and protect the skin, locking in the benefits of the treatment.</li>
                        </ul>
                        <p className="text-muted-foreground italic text-center">“Discover the art of relaxation at Karachi Massage Center, where every treatment is a pathway to inner calm.”</p>
                        <p className="text-muted-foreground italic text-center">“Indulge in the ultimate escape at Karachi Massage Center, where the city’s hustle fades into the background of your serene retreat.”</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">The Benefits Beyond Beauty at Royal Massage Spa Karachi: Health and Wellness Advantages</h3>
                        <p className="text-muted-foreground leading-relaxed">Facials extend beyond skin aesthetics at Royal Massage Spa Karachi, offering a range of health and wellness advantages:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><span className="font-semibold text-foreground">Stress Reduction:</span> The massage and soothing environment of a facial contribute to stress reduction, benefiting both the skin and the mind.</li>
                            <li><span className="font-semibold text-foreground">Detoxification:</span> Facial treatments encourage detoxification by promoting lymphatic drainage and improving circulation.</li>
                            <li><span className="font-semibold text-foreground">Anti-Aging:</span> Targeted facials can stimulate collagen production, reducing the appearance of fine lines and wrinkles.</li>
                            <li><span className="font-semibold text-foreground">Acne Management:</span> Facials can effectively address acne by unclogging pores, reducing inflammation, and promoting healing.</li>
                            <li><span className="font-semibold text-foreground">Customized Solutions:</span> Professionals tailor facials to individual skin needs, ensuring personalized care and optimal results.</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Beyond Facials at Royal Massage Spa Karachi: Crafting a Comprehensive Skin Care Regimen</h3>
                        <p className="text-muted-foreground leading-relaxed">While facials provide periodic boosts to skin health, a consistent skincare regimen is essential for long-term maintenance:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><span className="font-semibold text-foreground">Cleansing:</span> Use a gentle cleanser to remove dirt and impurities, preventing breakouts and maintaining a clear complexion.</li>
                            <li><span className="font-semibold text-foreground">Exfoliation:</span> Regular exfoliation removes dead skin cells, promoting cell turnover and allowing skincare products to penetrate effectively.</li>
                            <li><span className="font-semibold text-foreground">Hydration:</span> Moisturizers and serums hydrate the skin, maintaining its elasticity and preventing dryness.</li>
                            <li><span className="font-semibold text-foreground">Sun Protection:</span> Daily sunscreen application shields the skin from harmful UV rays, preventing premature aging and skin damage.</li>
                            <li><span className="font-semibold text-foreground">Nutrition and Hydration:</span> A balanced diet and proper hydration provide essential nutrients that support skin health from within.</li>
                        </ul>
                    </div>

                    <div className="text-center pt-8">
                        <h3 className="font-headline text-2xl font-bold text-primary">Contact Us For Booking</h3>
                    </div>
                </div>

                <div className="space-y-8 pt-12 border-t border-border">
                    <div className="text-center space-y-4">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Massage Therapy at Royal Massage Spa Karachi</h2>
                        <p className="text-muted-foreground italic">“Elevate your senses at Karachi Massage Center, where skilled hands and serene ambiance create a harmonious retreat.”</p>
                        <p className="text-muted-foreground italic">“At Karachi Massage Center, we invite you to unwind, rejuvenate, and restore balance – a haven for your body and soul.”</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Massage Therapy at Royal Massage Spa Karachi: Unveiling the Healing Touch for Body and Mind</h3>
                        <p className="text-muted-foreground leading-relaxed">In a world where stress and tension have become unwelcome companions, the ancient art of massage therapy emerges as a beacon of relief and relaxation. Beyond the luxurious indulgence, massage therapy is a holistic approach that nurtures both the body and the mind at Royal Massage Spa Karachi. This comprehensive exploration delves into the world of massage therapy, shedding light on its myriad benefits, the science behind its effectiveness, and the diverse techniques that make it a cornerstone of wellness.</p>
                        <p className="text-muted-foreground italic text-center">“Experience the epitome of luxury at Karachi Massage Center, where tranquility is a promise and pampering is an art.”</p>
                    </div>
                    
                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">The Essence of Touch at Royal Massage Spa Karachi: The Significance of Massage Therapy</h3>
                        <p className="text-muted-foreground leading-relaxed">Massage therapy is an age-old practice that transcends cultural boundaries. Rooted in the power of human touch, it encompasses a range of techniques designed to alleviate physical discomfort, reduce stress, and promote a sense of overall well-being. From traditional Swedish massages to specialized deep tissue treatments, massage therapy is a versatile tool that caters to various needs.</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Healing Through Connection at Royal Massage Spa Karachi: The Science Behind Massage Therapy</h3>
                        <p className="text-muted-foreground leading-relaxed">The science underlying massage therapy is as fascinating as it is profound. Through expert manipulation of soft tissues, such as muscles, tendons, and ligaments, massage therapy triggers a cascade of physiological responses:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><span className="font-semibold text-foreground">Stress Reduction:</span> Massage therapy induces the release of endorphins, often referred to as “feel-good” hormones. These endorphins alleviate stress, reduce anxiety, and create a sense of relaxation.</li>
                            <li><span className="font-semibold text-foreground">Pain Alleviation:</span> By targeting tense muscles and knots, massage therapy helps improve blood circulation and oxygen delivery, easing pain and promoting healing.</li>
                            <li><span className="font-semibold text-foreground">Improved Circulation:</span> The kneading and stroking motions of massage therapy stimulate blood flow, enhancing the delivery of nutrients and oxygen to cells while expelling waste products.</li>
                            <li><span className="font-semibold text-foreground">Enhanced Flexibility:</span> Manipulating soft tissues increases joint mobility and flexibility, reducing the risk of injuries and improving range of motion.</li>
                            <li><span className="font-semibold text-foreground">Release of Toxins:</span> Massage therapy encourages lymphatic drainage, facilitating the removal of toxins and metabolic waste from the body.</li>
                        </ul>
                    </div>

                     <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Variety of Techniques at Royal Massage Spa Karachi: Tailoring Massage to Individual Needs</h3>
                        <p className="text-muted-foreground italic text-center">“Experience the epitome of bliss at Karachi Massage Center, where personalized care is the foundation of your rejuvenating journey.”</p>
                        <p className="text-muted-foreground leading-relaxed">Massage therapy encompasses an array of techniques, each offering distinct benefits at Royal Massage Spa Karachi:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                             <li><span className="font-semibold text-foreground">Swedish Massage:</span> This classic technique combines long gliding strokes, kneading, tapping, and gentle stretching. It’s ideal for relaxation and stress reduction.</li>
                            <li><span className="font-semibold text-foreground">Deep Tissue Massage:</span> Targeting deeper layers of muscles and connective tissues, this technique is effective for chronic pain and muscle tension.</li>
                            <li><span className="font-semibold text-foreground">Sports Massage:</span> Geared towards athletes, sports massage focuses on preventing and treating injuries, enhancing performance, and aiding in recovery.</li>
                            <li><span className="font-semibold text-foreground">Hot Stone Massage:</span> Smooth, heated stones are placed on specific points of the body, relaxing muscles and promoting a sense of tranquility.</li>
                            <li><span className="font-semibold text-foreground">Aromatherapy Massage:</span> Combining massage with essential oils, this technique addresses both physical and emotional concerns, enhancing relaxation and mood.</li>
                        </ul>
                    </div>
                     <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Beyond the Physical: Nurturing Mental and Emotional Wellness</h3>
                        <p className="text-muted-foreground leading-relaxed">Massage therapy transcends the physical realm, nurturing mental and emotional well-being as well:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><span className="font-semibold text-foreground">Mindfulness and Relaxation:</span> The calming environment and rhythmic motions of massage encourage mindfulness and relaxation, reducing mental stress.</li>
                            <li><span className="font-semibold text-foreground">Emotional Release:</span> As tension is released from the body, emotional stress and trauma may also be released, contributing to emotional healing.</li>
                            <li><span className="font-semibold text-foreground">Improved Sleep:</span> Massage therapy’s relaxation-inducing effects often lead to improved sleep quality and duration.</li>
                        </ul>
                    </div>
                     <div className="space-y-6">
                        <h3 className="font-headline text-2xl font-bold text-foreground">Conclusion: The Art of Holistic Healing</h3>
                        <p className="text-muted-foreground leading-relaxed">Massage therapy is more than the sum of its techniques; it’s a holistic journey towards well-being. Whether seeking relief from physical discomfort, a reprieve from stress, or an avenue to reconnect with the body, massage therapy offers a multifaceted approach to wellness. As skilled hands work their magic, the body and mind synchronize in harmony, embracing the rejuvenating touch that has been cherished through generations. So, close your eyes, take a deep breath, and allow the healing power of massage therapy to unfold—an experience that transcends time and space, fostering a healthier, happier you. At Royal Massage Spa Karachi.</p>
                    </div>
                </div>

                <div className="text-center pt-8">
                     <Button size="lg" onClick={handleBookNow}>
                        Book Our Services
                    </Button>
                </div>
            </div>
        </section>
    </div>
  );
}
