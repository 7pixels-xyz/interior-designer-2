import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SplitText = ({ children, delayClass }: { children: string, delayClass?: string }) => {
    return (
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {children.split('').map((char, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                    <span className={`char ${delayClass || ''}`} style={{ display: 'inline-block', transform: 'translateY(120%) rotateZ(5deg)' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const tl = gsap.timeline();

                // Advanced Letter Reveal
                tl.to('.char', {
                    y: '0%',
                    rotateZ: 0,
                    duration: 1.8,
                    stagger: 0.03,
                    ease: 'power4.out',
                    delay: 0.2
                }, 0);

                // Subtext Reveal
                tl.fromTo('.hero-sub',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power3.out' },
                    1.2
                );

                // Image Mask Reveal
                tl.fromTo(img1Ref.current,
                    { clipPath: 'inset(100% 0 0 0)', scale: 1.2 },
                    { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 2, ease: 'expo.out' },
                    0.8
                );

                tl.fromTo(img2Ref.current,
                    { clipPath: 'inset(100% 0 0 0)', scale: 1.2 },
                    { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 2, ease: 'expo.out' },
                    1.1
                );

                // Abstract line drawing
                if (lineRef.current) {
                    tl.fromTo(lineRef.current,
                        { height: 0 },
                        { height: '100%', duration: 2, ease: 'power3.inOut' },
                        1.0
                    );
                }

                // Scroll Parallax Events
                if (img1Ref.current) {
                    gsap.to(img1Ref.current, {
                        yPercent: -20, ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
                    });
                }
                if (img2Ref.current) {
                    gsap.to(img2Ref.current, {
                        yPercent: -35, ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
                    });
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
            <div style={{ zIndex: 10, maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative' }}>
                <div style={{ overflow: 'hidden', marginBottom: '2rem' }} className="hero-sub">
                    <p className="label-small" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>Est. 2016</span>
                        <span ref={lineRef} style={{ width: '1px', background: 'var(--text-muted)', display: 'inline-block' }}></span>
                        <span>Global presence</span>
                    </p>
                </div>

                <div style={{ marginBottom: '-1rem' }}>
                    <h1 className="display-heading" style={{ fontSize: 'clamp(4.5rem, 11vw, 11rem)', color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 0.9 }}>
                        <SplitText>Shaping</SplitText> <SplitText>Light,</SplitText>
                    </h1>
                </div>
                <div style={{ marginBottom: '4rem' }}>
                    <h1 className="display-heading" style={{ fontSize: 'clamp(4.5rem, 11vw, 11rem)', color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 0.9, paddingLeft: '12vw' }}>
                        <SplitText>Form</SplitText> <SplitText>&</SplitText> <SplitText>Space.</SplitText>
                    </h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', paddingLeft: '12vw' }}>
                    <p className="body-copy hero-sub" style={{ maxWidth: '450px', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        We approach interior architecture as a narrative medium—crafting luminous, deeply physical spaces that transform how life feels.
                    </p>
                    <div className="hero-sub" style={{ marginTop: '1rem' }}>
                        <Link href="/projects" className="btn-solid" style={{ transform: 'scale(1.1)', transformOrigin: 'left center' }}>
                            Selected Works
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Editorial Images with Mask Reveal */}
            <div
                ref={img1Ref}
                style={{
                    position: 'absolute',
                    top: '12vh',
                    right: '8vw',
                    width: '30vw',
                    maxWidth: '420px',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    zIndex: 2,
                    clipPath: 'inset(100% 0 0 0)', // initial state fallback
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=85"
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
                    bottom: '5vh',
                    right: '38vw',
                    width: '22vw',
                    maxWidth: '300px',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    zIndex: 1,
                    clipPath: 'inset(100% 0 0 0)',
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=85"
                    alt="Architectural texture"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Ambient Background Blur Circle */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(235, 230, 220, 0.4) 0%, rgba(250, 250, 248, 0) 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
                pointerEvents: 'none',
            }}></div>

            <style jsx>{`
        @media (max-width: 900px) {
          h1 { padding-left: 0 !important; }
          div[style*="paddingLeft: '12vw'"] { padding-left: 0 !important; }
        }
        @media (max-width: 768px) {
            div[style*="top: 12vh"] { display: none; }
            div[style*="bottom: 5vh"] { display: none; }
        }
      `}</style>
        </section>
    );
}
