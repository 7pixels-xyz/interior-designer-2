import { useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenis: any;
    let gsapModule: any;

    const init = async () => {
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);
      gsapModule = gsap;

      lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ticker
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Sync ScrollTrigger with Lenis
      lenis.on('scroll', ScrollTrigger.update);
    };

    init();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      if (gsapModule) {
        gsapModule.ticker.remove(() => { });
      }
    };
  }, []);

  return (
    <>
      <div className="film-grain" />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
