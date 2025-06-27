'use client';
import { CircularProgress } from '@/components/ui/circular-progress';

const statsData = [
  { label: 'Client Satisfaction', value: 100 },
  { label: 'Environment', value: 100 },
  { label: 'Staff Cleaning', value: 100 },
  { label: 'Location', value: 100 },
];

export function Stats() {
  return (
    <section id="stats" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-4 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
              <CircularProgress progress={stat.value} />
              <h3 className="text-xl font-semibold text-foreground">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
