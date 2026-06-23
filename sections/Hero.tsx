import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    const imgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Parallax image
                if (imgRef.current) {
                    gsap.to(imgRef.current, {
                        yPercent: 20,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#hero',
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }

                // Text reveal
                if (textRef.current) {
                    const els = textRef.current.querySelectorAll('.hero-reveal');
                    gsap.fromTo(els,
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
                    );
                }
            });
        };
        init();
        return () => ctx?.revert();
    }, []);

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                background: '#1A1A1A',
            }}
        >
            {/* Background Image with parallax */}
            <div
                ref={imgRef}
                style={{
                    position: 'absolute',
                    inset: '-10% 0',
                    willChange: 'transform',
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1800&q=85"
                    alt="Luxury living room interior"
                    fill
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="100vw"
                />
            </div>

            {/* Dark gradient overlays */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,12,10,0.85) 0%, rgba(15,12,10,0.25) 55%, rgba(15,12,10,0.4) 100%)',
                zIndex: 2,
            }} />

            {/* Content */}
            <div
                ref={textRef}
                style={{
                    position: 'absolute',
                    bottom: '8vh',
                    left: '5vw',
                    right: '5vw',
                    zIndex: 3,
                }}
            >
                <p className="label-small hero-reveal" style={{ color: 'rgba(249,248,246,0.7)', marginBottom: '1.25rem' }}>
                    ✦ &nbsp; Interior Design Studio
                </p>

                <h1
                    className="display-heading hero-reveal"
                    style={{
                        color: '#F9F8F6',
                        maxWidth: '750px',
                        marginBottom: '1.25rem',
                        textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                    }}
                >
                    Designing Spaces<br />That Define Luxury
                </h1>

                <p
                    className="body-copy hero-reveal"
                    style={{
                        color: 'rgba(249,248,246,0.7)',
                        maxWidth: '420px',
                        marginBottom: '2.5rem',
                        fontSize: '0.95rem',
                    }}
                >
                    Explore exclusive properties designed for comfort elegance and modern living in prime locations worldwide.
                </p>

                <div className="hero-reveal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/projects" className="btn-solid" style={{ color: '#F9F8F6', background: 'rgba(26,26,26,0.85)', backdropFilter: 'blur(8px)' }}>
                        Explore Designs
                        <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact" className="btn-outline">
                        Book a Private Tour
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '6vh',
                right: '5vw',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
            }}>
                <div style={{
                    width: '1px',
                    height: '60px',
                    background: 'rgba(249,248,246,0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-100%',
                        width: '100%',
                        height: '50%',
                        background: 'rgba(249,248,246,0.8)',
                        animation: 'scrollLine 1.8s ease-in-out infinite',
                    }} />
                </div>
                <span className="label-small" style={{ color: 'rgba(249,248,246,0.5)', writingMode: 'vertical-rl' }}>Scroll</span>
            </div>

            <style jsx>{`
        @keyframes scrollLine {
          0% { top: -100%; }
          100% { top: 200%; }
        }
      `}</style>
        </section>
    );
}
