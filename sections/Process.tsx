import { useEffect, useRef } from 'react';
import Image from 'next/image';

const pillars = [
    {
        num: '01',
        title: 'Choreographing Light',
        desc: 'We treat natural and architectural light as our primary material, using shadow to carve depth and shape the emotional tone of every room.',
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        offset: '0',
    },
    {
        num: '02',
        title: 'Tactile Heritage',
        desc: 'Sourcing organic, unpolished, and rare materials that patina over time, bringing an honest, earthly weight to contemporary spaces.',
        img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
        offset: '10vw',
    },
    {
        num: '03',
        title: 'Proportion & Scale',
        desc: 'Mastering the negative space. The silence between objects is meticulously calculated to evoke calm and monumental simplicity.',
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
        offset: '5vw',
    }
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const rows = sectionRef.current?.querySelectorAll('.process-row');
                rows?.forEach((row, _i) => {
                    gsap.fromTo(row,
                        { y: 60, opacity: 0 },
                        {
                            y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
                            scrollTrigger: {
                                trigger: row,
                                start: 'top 85%',
                            }
                        }
                    );
                });
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
                background: 'var(--bg-secondary)',
            }}
        >
            <div style={{ marginBottom: '6rem' }}>
                <p className="label-small" style={{ marginBottom: '1rem' }}>The Anatomy of Space</p>
                <h2 className="section-title">Our Philosophy</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                {pillars.map((p, i) => (
                    <div key={i} className="process-row" style={{ display: 'flex', alignItems: 'center', gap: '5vw', marginLeft: p.offset, flexWrap: 'wrap' }}>

                        <div style={{ position: 'relative', width: '280px', flexShrink: 0, aspectRatio: '4/5', overflow: 'hidden' }}>
                            <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="300px" />
                            <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', fontFamily: 'var(--font-playfair)', fontSize: '6rem', color: 'var(--bg-secondary)', textShadow: '1px 1px 0 rgba(17,17,17,0.1)' }}>
                                {p.num}
                            </div>
                        </div>

                        <div style={{ maxWidth: '400px' }}>
                            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{p.num} &nbsp; — &nbsp; Pillar</div>
                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: 1.1 }}>
                                {p.title}
                            </h3>
                            <p className="body-copy" style={{ color: 'var(--text-muted)' }}>
                                {p.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .process-row { margin-left: 0 !important; gap: 3rem !important; flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
        </section>
    );
}
