import { Hero } from '@/components/sections/hero';
import { Packages } from '@/components/sections/packages';
import { Rooms } from '@/components/sections/rooms';
import { Therapists } from '@/components/sections/therapists';
import { VisitUs } from '@/components/sections/visit-us';

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <Therapists />
      <Rooms />
      <VisitUs />
    </>
  );
}
