import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Intro text reveal
                if (textRef.current) {
                    const headers = textRef.current.querySelectorAll('.hero-title');
                    gsap.fromTo(headers,
                        { y: 80, opacity: 0, rotateZ: 2 },
                        { y: 0, opacity: 1, rotateZ: 0, duration: 1.8, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
                    );

                    const subtext = textRef.current.querySelectorAll('.hero-sub');
                    gsap.fromTo(subtext,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power3.out', delay: 1.2 }
                    );
                }

                // Image Parallax
                if (img1Ref.current) {
                    gsap.fromTo(img1Ref.current,
                        { yPercent: 15 },
                        {
                            yPercent: -15, ease: 'none',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
                        }
                    );
                }
                if (img2Ref.current) {
                    gsap.fromTo(img2Ref.current,
                        { yPercent: 25 },
                        {
                            yPercent: -25, ease: 'none',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
                        }
                    );
                }
            }, sectionRef);
        };
        init();
        return () => ctx?.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20vh 5vw 10vh',
                overflow: 'hidden',
                zIndex: 1,
            }}
        >
            <div ref={textRef} style={{ zIndex: 10, maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative' }}>
                <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }} className="hero-sub">
                    <p className="label-small" style={{ color: 'var(--text-muted)' }}>
                        Est. 2016 &nbsp; — &nbsp; Global presence
                    </p>
                </div>

                <div style={{ overflow: 'hidden' }}>
                    <h1 className="display-heading hero-title" style={{ fontSize: 'clamp(4.5rem, 10vw, 9.5rem)', color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
                        Shaping Light,
                    </h1>
                </div>
                <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
                    <h1 className="display-heading hero-title" style={{ fontSize: 'clamp(4.5rem, 10vw, 9.5rem)', color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 0.9, paddingLeft: '8vw' }}>
                        Form & Space.
                    </h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', paddingLeft: '8vw' }}>
                    <p className="body-copy hero-sub" style={{ maxWidth: '400px', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                        We approach interior architecture as a narrative medium—crafting luminous, deeply physical spaces that transform how life feels.
                    </p>
                    <div className="hero-sub">
                        <Link href="/projects" className="btn-solid">
                            Selected Works
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Editorial Images */}
            <div
                ref={img1Ref}
                style={{
                    position: 'absolute',
                    top: '15vh',
                    right: '10vw',
                    width: '28vw',
                    maxWidth: '380px',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    zIndex: 2,
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1617104678098-de229db51175?w=600&q=85"
                    alt="Editorial interior detail"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div
                ref={img2Ref}
                style={{
                    position: 'absolute',
                    bottom: '-5vh',
                    right: '35vw',
                    width: '20vw',
                    maxWidth: '260px',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    zIndex: 2,
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=85"
                    alt="Architectural texture"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <style jsx>{`
        @media (max-width: 900px) {
          h1 { padding-left: 0 !important; }
          .hero-sub { padding-left: 0 !important; }
        }
        @media (max-width: 768px) {
            div[style*="top: 15vh"] { display: none; }
            div[style*="bottom: -5vh"] { display: none; }
        }
      `}</style>
        </section>
    );
}
