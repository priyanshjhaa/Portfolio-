import Navigation from '@/components/site/Navigation';
import Footer from '@/components/site/Footer';
import RevealObserver from '@/components/site/RevealObserver';
import CursorFollower from '@/components/fun/CursorFollower';
import PacketBurst from '@/components/fun/PacketBurst';
import Companion from '@/components/fun/Companion';
import AmbientField from '@/components/motion/AmbientField';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import SelectedWork from '@/components/home/SelectedWork';
import Approach from '@/components/home/Approach';
import BuildLog from '@/components/home/BuildLog';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <>
      <AmbientField />
      <Navigation home />
      <main id="main">
        <Hero />
        <About />
        <SelectedWork />
        <Approach />
        <BuildLog />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
      <CursorFollower />
      <PacketBurst />
      <Companion />
    </>
  );
}
