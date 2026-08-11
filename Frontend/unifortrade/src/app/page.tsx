import Hero from "@/components/sections/hero/Hero";
import Stats from "@/components/sections/stats/Stats";
import HowItWorks from "@/components/sections/how-it-works/HowItWorks";
import Categories from "@/components/sections/categories/Categories";
import Showcase from "@/components/sections/showcase/Showcase";
import CtaBanner from "@/components/sections/cta-banner/CtaBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <HowItWorks />
      <Categories />
      <Showcase />
      <CtaBanner />
    </main>
  );
}
