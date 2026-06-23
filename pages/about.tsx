import Head from 'next/head';
import dynamic from 'next/dynamic';
import StatsAbout from '@/sections/StatsAbout';
import Footer from '@/sections/Footer';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function About() {
    return (
        <>
            <Head>
                <title>About Studio | Designs by Shouray</title>
            </Head>
            <CustomCursor />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <StatsAbout />
                <Footer />
            </main>
        </>
    );
}
