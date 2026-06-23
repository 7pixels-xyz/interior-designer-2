import Head from 'next/head';
import dynamic from 'next/dynamic';
import ServicesSection from '@/sections/Services';
import Footer from '@/sections/Footer';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Services() {
    return (
        <>
            <Head>
                <title>Design Services | Designs by Shouray</title>
            </Head>
            <CustomCursor />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <ServicesSection />
                <Footer />
            </main>
        </>
    );
}
