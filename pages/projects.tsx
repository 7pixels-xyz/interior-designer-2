import Head from 'next/head';
import dynamic from 'next/dynamic';
import GalleryGrid from '@/sections/GalleryGrid';
import Footer from '@/sections/Footer';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const HorizontalWork = dynamic(() => import('@/sections/HorizontalWork'), { ssr: false });

export default function Projects() {
    return (
        <>
            <Head>
                <title>Projects | Designs by Shouray</title>
            </Head>
            <CustomCursor />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <HorizontalWork />
                <GalleryGrid />
                <Footer />
            </main>
        </>
    );
}
