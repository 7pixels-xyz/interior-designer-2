import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
    'Residential Design',
    'Commercial Spaces',
    'Bespoke Furniture',
    'Lighting Curation',
    'Art & Decor',
];

const services = [
    {
        num: '01',
        title: 'Residential Living Space',
        description: 'Thoughtfully designed residential spaces that blend comfort, functionality, and modern aesthetics to enhance everyday lifestyle experiences.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    },
    {
        num: '02',
        title: 'High-Performance Collaboration',
        description: 'Innovative commercial environments engineered for productivity, creativity, and seamless team collaboration.',
        image: null,
    },
    {
        num: '03',
        title: 'Curated Private Art Collections',
        description: 'Bespoke art curation services that transform your space into a personal gallery with works aligned to your aesthetic vision.',
        image: null,
    },
    {
        num: '04',
        title: 'Heritage Material Sourcing',
        description: 'Rare and handpicked materials sourced globally to bring authenticity and timeless character to every project.',
        image: null,
    },
    {
        num: '04',
        title: 'Minimalist Spatial Restoration',
        description: 'Breathing new life into existing spaces through refined minimalist principles focused on light, proportion, and calm.',
        image: null,
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const reveals = sectionRef.current?.querySelectorAll('.srv-reveal');
                if (reveals) {
                    gsap.fromTo(reveals,
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
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
            id="services"
            className="section-pad"
            style={{
                background: 'var(--bg-primary)',
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr',
                gap: '6rem',
                alignItems: 'start',
            }}
        >
            {/* Left */}
            <div>
                <p className="label-small srv-reveal" style={{ marginBottom: '1rem' }}>Our Services</p>
                <h2 className="section-title srv-reveal" style={{ marginBottom: '3rem' }}>
                    Curate, Design &amp; Elevate<br />with Designs by Shouray
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="srv-reveal"
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.6rem 0',
                                textAlign: 'left',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '1.05rem',
                                fontWeight: i === activeIndex ? 500 : 300,
                                color: i === activeIndex ? 'var(--text-main)' : 'var(--text-muted)',
                                cursor: 'none',
                                borderBottom: '1px solid transparent',
                                transition: 'color 0.25s ease, font-weight 0.25s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>

                <Link href="/projects" className="btn-solid srv-reveal" style={{ display: 'inline-flex', marginTop: '3rem' }}>
                    See All Projects <ArrowRight size={14} />
                </Link>
            </div>

            {/* Right: Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {services.map((srv, i) => (
                    <div
                        key={i}
                        className="srv-reveal"
                        style={{
                            borderTop: `1px solid ${i === 0 ? 'var(--text-main)' : 'rgba(244, 242, 236, 0.08)'}`,
                            paddingTop: '1.25rem',
                            paddingBottom: i === activeIndex ? '1.5rem' : '1.25rem',
                            cursor: 'none',
                            transition: 'padding 0.3s ease',
                        }}
                        onClick={() => setActiveIndex(i === activeIndex ? -1 : i)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                color: 'var(--text-muted)',
                                letterSpacing: '0.08em',
                                minWidth: '24px',
                            }}>{srv.num}</span>
                            <h3 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                                fontWeight: 400,
                                color: 'var(--text-main)',
                                flex: 1,
                            }}>{srv.title}</h3>
                        </div>

                        {i === activeIndex && (
                            <div style={{ paddingLeft: 'calc(24px + 1.25rem)', marginTop: '1rem' }}>
                                {srv.image && (
                                    <div className="img-reveal-wrap" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        height: '220px',
                                        marginBottom: '1rem',
                                        position: 'relative',
                                    }}>
                                        <Image
                                            src={srv.image}
                                            alt={srv.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="40vw"
                                        />
                                    </div>
                                )}
                                <p className="body-copy" style={{ fontSize: '0.88rem' }}>{srv.description}</p>
                            </div>
                        )}
                    </div>
                ))}
                {/* Bottom border */}
                <div style={{ borderTop: '1px solid rgba(244, 242, 236, 0.08)' }} />
            </div>

            <style jsx>{`
        @media (max-width: 900px) {
          section { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
        </section>
    );
}
