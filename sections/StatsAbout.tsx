import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
    { value: '9+', unit: 'Years', label: 'Years of Interior Experience' },
    { value: '78%', unit: '', label: 'Satisfied Valued Clients' },
    { value: '20+', unit: '', label: 'Active Interior Projects' },
    { value: '18K+', unit: '', label: 'Happy Clients' },
];

export default function StatsAbout() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const animEls = sectionRef.current?.querySelectorAll('.sa-reveal');
                if (animEls) {
                    gsap.fromTo(animEls,
                        { y: 45, opacity: 0 },
                        {
                            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 75%',
                            }
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
            className="section-pad"
            style={{
                background: 'var(--bg-primary)',
            }}
        >
            <p className="label-small sa-reveal" style={{ marginBottom: '3rem' }}>About Us</p>

            {/* Two column top */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'start',
                marginBottom: '5rem',
            }}
                className="about-grid"
            >
                {/* Left: small image + heading */}
                <div>
                    {/* Small accent image */}
                    <div className="sa-reveal img-reveal-wrap" style={{
                        width: '160px',
                        height: '140px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '2.5rem',
                    }}>
                        <Image
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
                            alt="Dining interior"
                            width={160}
                            height={140}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>

                    <h2 className="section-title sa-reveal">
                        Timeless Interiors<br />Elevated Living
                    </h2>

                    <p className="body-copy sa-reveal" style={{
                        maxWidth: '460px',
                        marginTop: '1.5rem',
                        marginBottom: '2.5rem',
                    }}>
                        Specializing in luxury interiors, we transform spaces into refined living experiences. Every project is thoughtfully designed, ensuring comfort, elegance, and a seamless journey from concept to completion.
                    </p>

                    <Link href="/about" className="btn-solid sa-reveal" style={{ display: 'inline-flex' }}>
                        More About Us
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Right: large image */}
                <div className="sa-reveal img-reveal-wrap" style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    position: 'relative',
                }}>
                    <Image
                        src="https://images.unsplash.com/photo-1556909190-4c2c82b9f5ed?w=900&q=85"
                        alt="Modern kitchen interior"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="50vw"
                    />
                </div>
            </div>

            {/* Stats grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
            }}
                className="stats-grid"
            >
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="sa-reveal hairline-t"
                        style={{
                            background: 'transparent',
                            padding: '2rem 1rem 0 0',
                            marginTop: `${i * 1.5}rem`, // Staggered layout feeling
                        }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)',
                            fontWeight: 400,
                            color: 'var(--text-main)',
                            lineHeight: 1,
                            marginBottom: '0.5rem',
                        }}>
                            {stat.value}
                            {stat.unit && (
                                <span style={{ fontSize: '0.8em', marginLeft: '2px' }}>{stat.unit}</span>
                            )}
                        </div>
                        <p className="label-small" style={{ marginBottom: '0.4rem' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
