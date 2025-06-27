import { CoreValues } from '@/components/sections/core-values';
import { Cta } from '@/components/sections/cta';
import { Hero } from '@/components/sections/hero';
import { MoreInfo } from '@/components/sections/more-info';
import { Packages } from '@/components/sections/packages';
import { Rooms } from '@/components/sections/rooms';
import { Stats } from '@/components/sections/stats';
import { Therapists } from '@/components/sections/therapists';
import { VisitUs } from '@/components/sections/visit-us';
import { WhyChooseUs } from '@/components/sections/why-choose-us';

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <Therapists />
      <WhyChooseUs />
      <Stats />
      <Rooms />
      <MoreInfo />
      <CoreValues />
      <Cta />
      <VisitUs />
    </>
  );
}
