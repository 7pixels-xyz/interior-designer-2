import Head from 'next/head';
import dynamic from 'next/dynamic';
import Footer from '@/sections/Footer';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Contact() {
    return (
        <>
            <Head>
                <title>Contact Us | Designs by Shouray</title>
            </Head>
            <CustomCursor />
            <main style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <div className="section-pad">
                    <p className="label-small" style={{ marginBottom: '1rem' }}>Get in Touch</p>
                    <h1 className="section-title" style={{ maxWidth: '700px', marginBottom: '2rem' }}>
                        Ready to elevate your living space? Let's discuss your vision.
                    </h1>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        marginTop: '4rem'
                    }}>
                        <div style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '12px' }}>
                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem' }}>Studio HQ</h3>
                            <p className="body-copy">Studio 14, Design District<br />Chandigarh, Punjab<br />India — 160019</p>
                            <p className="body-copy" style={{ marginTop: '2rem' }}>
                                <a href="mailto:hello@designsbyshouray.com" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>hello@designsbyshouray.com</a>
                            </p>
                        </div>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <input type="text" placeholder="Your Name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem 0', fontFamily: 'var(--font-inter)', fontSize: '1rem', outline: 'none' }} />
                            <input type="email" placeholder="Your Email" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem 0', fontFamily: 'var(--font-inter)', fontSize: '1rem', outline: 'none' }} />
                            <textarea placeholder="Project Details" rows={4} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem 0', fontFamily: 'var(--font-inter)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
                            <button type="button" className="btn-solid" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Send Message</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
}
