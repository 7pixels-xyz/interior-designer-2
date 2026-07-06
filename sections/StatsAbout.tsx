import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SplitText = ({ children }: { children: string }) => {
    return (
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {children.split('').map((char, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                    <span className="sa-char" style={{ display: 'inline-block', transform: 'translateY(120%) rotateZ(5deg)' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

const stats = [
    { value: '9+', unit: 'Years', label: 'Years of Interior Experience' },
    { value: '78%', unit: '', label: 'Satisfied Valued Clients' },
    { value: '20+', unit: '', label: 'Active Interior Projects' },
    { value: '18K+', unit: '', label: 'Happy Clients' },
];

export default function StatsAbout() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imgLeftRef = useRef<HTMLDivElement>(null);
    const imgRightRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    }
                });

                // Image Mask Reveals
                tl.fromTo(imgRightRef.current,
                    { clipPath: 'inset(100% 0 0 0)' },
                    { clipPath: 'inset(0% 0 0 0)', duration: 1.8, ease: 'expo.out' },
                    0
                );
                tl.fromTo(imgLeftRef.current,
                    { clipPath: 'inset(100% 0 0 0)' },
                    { clipPath: 'inset(0% 0 0 0)', duration: 1.8, ease: 'expo.out' },
                    0.2
                );

                // Image Scale-down
                const rightImg = imgRightRef.current?.querySelector('img');
                const leftImg = imgLeftRef.current?.querySelector('img');
                if (rightImg) tl.fromTo(rightImg, { scale: 1.2 }, { scale: 1, duration: 2, ease: 'power3.out' }, 0);
                if (leftImg) tl.fromTo(leftImg, { scale: 1.2 }, { scale: 1, duration: 2, ease: 'power3.out' }, 0.2);

                // Text Split Reveal
                const chars = textRef.current?.querySelectorAll('.sa-char');
                if (chars && chars.length > 0) {
                    tl.to(chars, {
                        y: '0%',
                        rotateZ: 0,
                        duration: 1.2,
                        stagger: 0.02,
                        ease: 'power4.out',
                    }, 0.3);
                }

                // Subtext fade in
                const fadeEls = sectionRef.current?.querySelectorAll('.sa-fade-up');
                if (fadeEls) {
                    tl.fromTo(fadeEls,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
                        0.6
                    );
                }

                // Scroll Parallax Events
                if (imgLeftRef.current) {
                    gsap.fromTo(imgLeftRef.current,
                        { yPercent: 20 },
                        {
                            yPercent: -15, ease: 'none',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
                        }
                    );
                }

                if (bgTextRef.current) {
                    gsap.to(bgTextRef.current, {
                        xPercent: -20,
                        ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    });
                }

                // Stats Stagger Reveal
                const statsCols = sectionRef.current?.querySelectorAll('.stat-col');
                if (statsCols) {
                    gsap.fromTo(statsCols,
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
                            scrollTrigger: { trigger: '.stats-wrapper', start: 'top 85%' }
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
            ref={sectionRef}
            id="about"
            style={{
                position: 'relative',
                background: 'var(--bg-primary)',
                paddingTop: '10rem',
                paddingBottom: '8rem',
                overflow: 'hidden',
                zIndex: 1,
            }}
        >
            {/* Giant watermark scrolling text */}
            <div
                ref={bgTextRef}
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '5%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '35vw',
                    fontWeight: 800,
                    color: 'rgba(17, 17, 17, 0.02)',
                    lineHeight: 0.8,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: 0,
                    userSelect: 'none',
                }}
            >
                STUDIO
            </div>

            <div style={{ padding: '0 5vw', position: 'relative', zIndex: 2 }}>

                {/* Upper editorial block */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1fr', gap: '3rem', alignItems: 'center', marginBottom: '8rem' }} className="sa-grid">

                    {/* Left Typography Block */}
                    <div ref={textRef} style={{ paddingTop: '5rem' }}>
                        <p className="label-small sa-fade-up" style={{ marginBottom: '2rem' }}>About The Studio</p>

                        <h2 className="display-heading" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--text-main)', lineHeight: 1.05, marginBottom: '2rem' }}>
                            <SplitText>Timeless</SplitText> <SplitText>Interiors,</SplitText><br />
                            <SplitText>Elevated</SplitText> <SplitText>Living</SplitText>
                        </h2>

                        <p className="body-copy sa-fade-up" style={{
                            maxWidth: '460px',
                            marginBottom: '3rem',
                            color: 'var(--text-muted)'
                        }}>
                            Specializing in high-end residential conceptualization. We approach architecture not as an assembly of materials, but as an experience—merging emotional resonance, meticulous sourcing, and absolute restraint to craft physical environments that endure.
                        </p>

                        <div className="sa-fade-up">
                            <Link href="/about" className="btn-solid" style={{ background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--brand-border)' }}>
                                Discover Our Vision
                            </Link>
                        </div>
                    </div>

                    {/* Right Images (Overlapping Parallax) */}
                    <div style={{ position: 'relative', width: '100%', height: '800px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className="sa-images">

                        {/* Main Tall Image */}
                        <div
                            ref={imgRightRef}
                            style={{
                                position: 'relative',
                                width: '70%',
                                height: '90%',
                                overflow: 'hidden',
                                zIndex: 1,
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
                                clipPath: 'inset(100% 0 0 0)'
                            }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1600210491369-0ebfa52e4686?w=900&q=85"
                                alt="Luxury interior detail"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Overlapping Parallax Small Image */}
                        <div
                            ref={imgLeftRef}
                            style={{
                                position: 'absolute',
                                left: '-10%',
                                top: '25%',
                                width: '45%',
                                height: '40%',
                                overflow: 'hidden',
                                zIndex: 2,
                                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.1))',
                                clipPath: 'inset(100% 0 0 0)'
                            }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                                alt="Minimalist warm living space"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                    </div>
                </div>

                {/* Staggered Stats Grid */}
                <div className="stats-wrapper" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2.5rem',
                }}>
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="stat-col hairline-t"
                            style={{
                                paddingTop: '2.5rem',
                                marginTop: `${i * 2}rem`,
                            }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                                fontWeight: 400,
                                color: 'var(--text-main)',
                                lineHeight: 1,
                                marginBottom: '0.5rem',
                            }}>
                                {stat.value}
                                {stat.unit && (
                                    <span style={{ fontSize: '1rem', marginLeft: '6px', fontFamily: 'var(--font-sans)', verticalAlign: 'baseline', opacity: 0.6 }}>{stat.unit}</span>
                                )}
                            </div>
                            <p className="label-small" style={{ opacity: 0.8 }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 1024px) {
          .sa-grid { grid-template-columns: 1fr !important; gap: 5rem !important; }
          .sa-images { height: 60vh !important; justify-content: center !important; }
          div[style*="left: '-10%'"] { left: 0 !important; top: auto !important; bottom: -10% !important; height: 50% !important; }
        }
        @media (max-width: 768px) {
          .stats-wrapper { grid-template-columns: repeat(2, 1fr) !important; gap: 3rem !important; }
          .stat-col { margin-top: 0 !important; }
        }
      `}</style>
        </section>
    );
}
