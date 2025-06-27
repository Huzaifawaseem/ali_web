'use client';
import { Smile, Scale, Sparkles, Home } from 'lucide-react';

const values = [
  {
    icon: Smile,
    title: 'Relax',
    description: 'Let go of stress and find your inner peace in our tranquil environment.',
  },
  {
    icon: Scale,
    title: 'Rebalance',
    description: 'Restore harmony to your body and mind with our expert therapeutic services.',
  },
  {
    icon: Sparkles,
    title: 'Rejuvenate',
    description: 'Revitalize your energy and spirit, leaving you feeling refreshed and new.',
  },
  {
    icon: Home,
    title: 'Retreat',
    description: 'Escape the everyday and find a personal sanctuary dedicated to your well-being.',
  },
];

export function CoreValues() {
  return (
    <section id="core-values" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Your Path to Wellness
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            We believe in a simple philosophy for complete well-being.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-4 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
              <div className="bg-primary/10 p-5 rounded-full ring-8 ring-primary/5">
                <value.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-foreground">{value.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
