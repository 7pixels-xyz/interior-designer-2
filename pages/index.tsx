import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Hero from '@/sections/Hero';
import Manifesto from '@/sections/Manifesto';
import StatsAbout from '@/sections/StatsAbout';
import Process from '@/sections/Process';
import Services from '@/sections/Services';
import GalleryGrid from '@/sections/GalleryGrid';
import Footer from '@/sections/Footer';

// Dynamically import heavy scroll sections to avoid SSR issues
const HorizontalWork = dynamic(() => import('@/sections/HorizontalWork'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Designs by Shouray — Luxury Interior Design Studio</title>
        <meta name="description" content="Designs by Shouray creates timeless, refined interiors that blend comfort, elegance, and modern living. Crafted by founder Shouray Deol." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomCursor />

      <main>
        <Hero />
        <Manifesto />
        <StatsAbout />
        <Process />
        <HorizontalWork />
        <Services />
        <GalleryGrid />
        <Footer />
      </main>
    </>
  );
};

export default Home;
