import { useEffect, useRef } from 'react';
import Image from 'next/image';

const projects = [
    {
        title: 'Shaazz Interior Studio',
        subtitle: 'Elegant Coastal Living Concept',
        description: 'Minimalist luxury interiors with premium materials, open spaces, and calming ocean-inspired elegance.',
        price: '$79,500',
        location: 'Mumbai, IN',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85',
        nextImg: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
        nextTitle: 'Infinity View Concept',
    },
    {
        title: 'Infinity View Concept',
        subtitle: 'Sky-High Urban Sanctuary',
        description: 'A breathtaking penthouse design merging contemporary forms with panoramic urban vistas.',
        price: '$112,000',
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85',
    },
    {
        title: 'The Private Sanctuary',
        subtitle: 'Timeless Warmth & Luxury',
        description: 'An intimate retreat crafted with heritage materials and bespoke furniture for refined private living.',
        price: '$28,900',
        location: 'Coral Gables, FL',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85',
    },
];

export default function HorizontalWork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const mm = { isDesktop: false };

        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const isMobile = window.innerWidth <= 768;
            mm.isDesktop = !isMobile;

            if (isMobile || !containerRef.current || !sliderRef.current) return;

            ctx = gsap.context(() => {
                const totalWidth = sliderRef.current!.scrollWidth;
                const viewportWidth = window.innerWidth;
                const scrollDistance = totalWidth - viewportWidth;

                gsap.to(sliderRef.current, {
                    x: -scrollDistance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: () => `+=${scrollDistance + viewportWidth * 0.5}`,
                        pin: true,
                        anticipatePin: 1,
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                });

                // Header reveal
                gsap.fromTo('#hw-header',
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1.6, ease: 'power4.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                    }
                );
            });
        };

        init();
        return () => ctx?.revert();
    }, []);

    return (
        <div ref={sectionRef} id="work">
            {/* Section header */}
            <div
                id="hw-header"
                style={{
                    padding: '5rem 5vw 3rem',
                    background: 'var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <p className="label-small" style={{ marginBottom: '0.75rem' }}>Selected Work</p>
                    <h2 className="section-title">Our Signature Projects</h2>
                </div>
                <p className="body-copy" style={{ maxWidth: '340px', textAlign: 'right', fontSize: '0.9rem' }}>
                    Drag or scroll to explore our curated showcase of refined interiors.
                </p>
            </div>

            {/* Horizontal scroll container */}
            <div
                ref={containerRef}
                style={{
                    overflow: 'hidden',
                    background: 'var(--bg-primary)',
                }}
            >
                <div
                    ref={sliderRef}
                    className="horizontal-section"
                    style={{
                        display: 'flex',
                        gap: '4rem',
                        padding: '0 5vw 6rem',
                        willChange: 'transform',
                        width: 'max-content',
                    }}
                    data-cursor="drag"
                >
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            data-cursor="view"
                            style={{
                                position: 'relative',
                                width: '78vw',
                                maxWidth: '1100px',
                                height: '72vh',
                                minHeight: '500px',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                cursor: 'none',
                            }}
                        >
                            {/* Background image */}
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                                sizes="80vw"
                                loading={i === 0 ? 'eager' : 'lazy'}
                            />

                            {/* Dark subtle overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(10,8,6,0.75) 0%, transparent 55%)',
                            }} />

                            {/* Project counter */}
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                left: '1.5rem',
                                fontFamily: 'var(--font-playfair)',
                                fontSize: '1.1rem',
                                color: 'rgba(244, 242, 236,0.5)',
                            }}>
                                0{i + 1}
                            </div>

                            {/* Next project thumbnail (first card only) */}
                            {project.nextImg && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    width: '140px',
                                    height: '100px',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                }}>
                                    <Image
                                        src={project.nextImg}
                                        alt={project.nextTitle || ''}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="140px"
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        padding: '0.5rem',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                                    }}>
                                        <p style={{
                                            fontFamily: 'var(--font-inter)',
                                            fontSize: '0.55rem',
                                            fontWeight: 500,
                                            color: 'white',
                                            letterSpacing: '0.03em',
                                        }}>{project.nextTitle}</p>
                                    </div>
                                </div>
                            )}

                            {/* Frosted glass info box */}
                            <div style={{
                                position: 'absolute',
                                bottom: '2rem',
                                left: '2rem',
                                background: 'rgba(20, 19, 17, 0.85)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '12px',
                                border: '1px solid rgba(244, 242, 236, 0.08)',
                                padding: '1.25rem 1.5rem',
                                maxWidth: '340px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--accent)',
                                        display: 'inline-block',
                                    }} />
                                    <p style={{
                                        fontFamily: 'var(--font-inter)',
                                        fontSize: '0.7rem',
                                        fontWeight: 500,
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.05em',
                                    }}>{project.subtitle}</p>
                                </div>

                                <h3 style={{
                                    fontFamily: 'var(--font-playfair)',
                                    fontSize: '1.2rem',
                                    fontWeight: 400,
                                    color: 'var(--text-main)',
                                    marginBottom: '0.6rem',
                                }}>{project.title}</h3>

                                <p style={{
                                    fontFamily: 'var(--font-inter)',
                                    fontSize: '0.78rem',
                                    fontWeight: 300,
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.6,
                                    marginBottom: '1rem',
                                }}>{project.description}</p>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: '28px', height: '28px',
                                            borderRadius: '50%',
                                            background: 'var(--text-main)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <span style={{ color: 'white', fontSize: '0.7rem' }}>◂</span>
                                        </div>
                                        <div style={{
                                            width: '28px', height: '28px',
                                            borderRadius: '50%',
                                            border: '1.5px solid var(--text-main)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <span style={{ color: 'var(--text-main)', fontSize: '0.7rem' }}>▸</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '3px', marginLeft: '4px' }}>
                                            {[0, 1, 2, 3].map(d => (
                                                <div key={d} style={{
                                                    width: '4px', height: '4px', borderRadius: '50%',
                                                    background: d === 0 ? 'var(--text-main)' : 'var(--bg-secondary)',
                                                }} />
                                            ))}
                                        </div>
                                    </div>
                                    <span style={{
                                        fontFamily: 'var(--font-playfair)',
                                        fontSize: '1.1rem',
                                        fontWeight: 400,
                                        color: 'var(--text-main)',
                                    }}>{project.price}</span>
                                </div>
                            </div>

                            {/* Location tag */}
                            <div style={{
                                position: 'absolute',
                                bottom: '1.5rem',
                                right: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                            }}>
                                <span style={{ color: 'rgba(244, 242, 236,0.7)', fontSize: '0.75rem', fontFamily: 'var(--font-inter)' }}>
                                    📍 {project.location}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile fallback */}
            <style jsx>{`
        @media (max-width: 768px) {
          .horizontal-section {
            flex-direction: column !important;
            width: 100% !important;
          }
          .horizontal-section > div {
            width: 100% !important;
            max-width: none !important;
          }
        }
      `}</style>
        </div>
    );
}
