import { useEffect, useRef } from 'react';
import Image from 'next/image';

const galleryItems = [
    {
        title: 'Elegant Modern Dining Haven',
        category: 'Residential',
        size: 'tall',
        image: 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=900&q=85',
    },
    {
        title: 'Minimalist Luxury Lounge',
        category: 'Living Space',
        size: 'wide',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85',
    },
    {
        title: 'Bright Contemporary Serenity Space',
        category: 'Office Interior',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    },
    {
        title: 'Warm Modern Comfort Living',
        category: 'Residential',
        size: 'small',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    },
    {
        title: 'Cozy Elegant Haven',
        category: 'Bedroom Design',
        size: 'wide',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85',
    },
];

export default function GalleryGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const items = sectionRef.current?.querySelectorAll('.gallery-item');
                items?.forEach((item, i) => {
                    gsap.fromTo(item,
                        { y: 80, opacity: 0 },
                        {
                            y: 0, opacity: 1, duration: 1.5, ease: 'power4.out',
                            delay: (i % 3) * 0.15,
                            scrollTrigger: {
                                trigger: item,
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
            id="gallery"
            className="section-pad"
            style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '3.5rem' }}>
                <p className="label-small" style={{ marginBottom: '1rem' }}>Gallery</p>
                <h2 className="section-title" style={{ maxWidth: '620px' }}>
                    Discover Newly Curated Luxury Interiors for Modern Elegant Living Spaces
                </h2>
            </div>

            {/* Masonry grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto',
                    gap: '2.5rem',
                }}
            >
                {/* Item 0: Tall — spans 2 rows, col 1 */}
                <GalleryCard item={galleryItems[0]} style={{ gridRow: 'span 2' }} />

                {/* Item 1: Wide — col 2-3 */}
                <GalleryCard item={galleryItems[1]} style={{ gridColumn: 'span 2', aspectRatio: '16/9' }} />

                {/* Item 2, 3 side by side in row 2 */}
                <GalleryCard item={galleryItems[2]} style={{}} />
                <GalleryCard item={galleryItems[3]} style={{}} />

                {/* Item 4: Full width bottom */}
                <GalleryCard item={galleryItems[4]} style={{ gridColumn: 'span 3', aspectRatio: '21/6' }} />
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}

function GalleryCard({ item, style }: { item: typeof galleryItems[0]; style: React.CSSProperties }) {
    return (
        <div
            className="gallery-item"
            data-cursor="view"
            style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: style.aspectRatio ? undefined : '3/4',
                background: 'var(--footer-bg)',
                cursor: 'none',
                ...style,
            }}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="gallery-img"
            />

            {/* Hover overlay */}
            <div className="gallery-overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(26,26,26,0)',
                transition: 'background 0.4s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem',
            }}>
                <div style={{
                    transform: 'translateY(8px)',
                    opacity: 0,
                    transition: 'all 0.4s ease',
                }} className="gallery-text">
                    <p className="label-small" style={{ color: 'rgba(244, 242, 236,0.6)', marginBottom: '0.3rem' }}>
                        {item.category}
                    </p>
                    <h3 style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '1.2rem',
                        fontWeight: 400,
                        color: 'var(--text-main)',
                    }}>{item.title}</h3>
                </div>
            </div>

            <style jsx>{`
        .gallery-item:hover .gallery-overlay {
          background: rgba(26, 26, 26, 0.55) !important;
        }
        .gallery-item:hover .gallery-text {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
        .gallery-item:hover :global(.gallery-img) {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
}
