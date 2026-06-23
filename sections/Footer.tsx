import { useEffect, useRef } from 'react';
// import { Instagram, Linkedin } from 'lucide-react'; // Brand icons are removed in lucide v0.3

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const links = {
    quick: [
        { label: 'Projects', href: '/projects' },
        { label: 'About Studio', href: '/about' },
        { label: 'Design Services', href: '/services' },
        { label: 'Contact', href: '/contact' }
    ],
    property: [
        { label: 'Luxury Bedrooms', href: '/projects' },
        { label: 'Modular Kitchens', href: '/projects' },
        { label: 'Office Interiors', href: '/projects' },
        { label: 'Outdoor Spaces', href: '/projects' }
    ],
    socials: [
        { label: 'Instagram', icon: InstagramIcon, href: '#' },
        { label: 'LinkedIn', icon: LinkedinIcon, href: '#' },
    ],
};

export default function Footer() {
    const textRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Massive text reveal
                if (textRef.current) {
                    gsap.fromTo(textRef.current,
                        { yPercent: 20, opacity: 0 },
                        {
                            yPercent: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
                            scrollTrigger: { trigger: textRef.current, start: 'top 90%' }
                        }
                    );
                }
                // Column reveal
                const cols = sectionRef.current?.querySelectorAll('.footer-col');
                if (cols) {
                    gsap.fromTo(cols,
                        { y: 30, opacity: 0 },
                        {
                            y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                        }
                    );
                }
            }, sectionRef);
        };
        init();
        return () => ctx?.revert();
    }, []);

    return (
        <footer
            ref={sectionRef}
            id="contact"
            className="section-pad-sm"
            style={{
                background: 'var(--footer-bg)',
                paddingTop: '6rem',
                overflow: 'hidden',
            }}
        >
            {/* Top row: columns */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '3rem',
                paddingBottom: '4rem',
                borderBottom: '1px solid rgba(249,248,246,0.1)',
            }}
                className="footer-cols"
            >
                {/* Brand */}
                <div className="footer-col">
                    <p style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '1.1rem',
                        color: '#F9F8F6',
                        marginBottom: '1rem',
                    }}>Designs by Shouray</p>
                    <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.82rem',
                        fontWeight: 300,
                        color: 'rgba(249,248,246,0.5)',
                        lineHeight: 1.7,
                        maxWidth: '200px',
                    }}>
                        Where beauty meets purpose. Creating luxury interiors since 2016.
                    </p>
                    <div style={{ marginTop: '1.5rem' }}>
                        <p className="label-small" style={{ color: 'rgba(249,248,246,0.35)', marginBottom: '0.3rem' }}>Contact</p>
                        <a href="mailto:hello@designsbyshouray.com" style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '0.82rem',
                            fontWeight: 300,
                            color: 'rgba(249,248,246,0.6)',
                            textDecoration: 'none',
                            cursor: 'none',
                        }}>hello@designsbyshouray.com</a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                    <p className="label-small" style={{ color: 'rgba(249,248,246,0.4)', marginBottom: '1.5rem' }}>Quick Links</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {links.quick.map(l => (
                            <li key={l.label}>
                                <a href={l.href} style={{
                                    fontFamily: 'var(--font-inter)',
                                    fontSize: '0.9rem',
                                    fontWeight: 300,
                                    color: 'rgba(249,248,246,0.7)',
                                    textDecoration: 'none',
                                    cursor: 'none',
                                    transition: 'color 0.2s ease',
                                }}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Property Types */}
                <div className="footer-col">
                    <p className="label-small" style={{ color: 'rgba(249,248,246,0.4)', marginBottom: '1.5rem' }}>Property Types</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {links.property.map(l => (
                            <li key={l.label}>
                                <a href={l.href} style={{
                                    fontFamily: 'var(--font-inter)',
                                    fontSize: '0.9rem',
                                    fontWeight: 300,
                                    color: 'rgba(249,248,246,0.7)',
                                    textDecoration: 'none',
                                    cursor: 'none',
                                }}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location + Socials */}
                <div className="footer-col">
                    <div style={{ marginBottom: '2rem' }}>
                        <p className="label-small" style={{ color: 'rgba(249,248,246,0.4)', marginBottom: '1rem' }}>Location</p>
                        <p style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '0.85rem',
                            fontWeight: 300,
                            color: 'rgba(249,248,246,0.6)',
                            lineHeight: 1.7,
                        }}>
                            Studio 14, Design District<br />
                            Chandigarh, Punjab<br />
                            India — 160019
                        </p>
                    </div>
                    <div>
                        <p className="label-small" style={{ color: 'rgba(249,248,246,0.4)', marginBottom: '1rem' }}>Socials</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {links.socials.map(({ label, icon: Icon, href }) => (
                                <a key={label} href={href} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontFamily: 'var(--font-inter)',
                                    fontSize: '0.85rem',
                                    fontWeight: 300,
                                    color: 'rgba(249,248,246,0.7)',
                                    textDecoration: 'none',
                                    cursor: 'none',
                                }}>
                                    <Icon size={15} />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Massive SHOURAY text */}
            <div
                ref={textRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingTop: '1.5rem',
                    overflow: 'hidden',
                    lineHeight: 0.85,
                }}
            >
                <span style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(4rem, 14vw, 16rem)',
                    fontWeight: 400,
                    color: 'rgba(249,248,246,0.06)',
                    letterSpacing: '-0.02em',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                }}>
                    SHOURAY
                </span>
            </div>

            {/* Bottom bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 0',
                borderTop: '1px solid rgba(249,248,246,0.06)',
                marginTop: '0',
            }}>
                <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.72rem',
                    fontWeight: 300,
                    color: 'rgba(249,248,246,0.3)',
                }}>© 2026 Designs by Shouray. All rights reserved.</p>
                <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.72rem',
                    fontWeight: 300,
                    color: 'rgba(249,248,246,0.3)',
                }}>Crafted with precision & passion</p>
            </div>

            <style jsx>{`
        .footer-cols {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
}
