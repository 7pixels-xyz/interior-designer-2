import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 3vw',
                    transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
                    background: scrolled ? 'rgba(249,248,246,0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
                }}
            >
                {/* Left: Menu */}
                <button
                    onClick={() => setMenuOpen(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'none',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        color: scrolled ? 'var(--text-main)' : 'rgba(249,248,246,0.9)',
                        transition: 'color 0.4s ease',
                    }}
                >
                    <Menu size={16} />
                    Menu
                </button>

                {/* Center: Logo */}
                <Link
                    href="/"
                    style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '1.05rem',
                        fontWeight: 400,
                        letterSpacing: '0.04em',
                        color: scrolled ? 'var(--text-main)' : 'rgba(249,248,246,0.95)',
                        textDecoration: 'none',
                        transition: 'color 0.4s ease',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Designs by Shouray
                </Link>

                {/* Right: Contact */}
                <Link
                    href="/contact"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 1.1rem',
                        border: `1.5px solid ${scrolled ? 'var(--text-main)' : 'rgba(249,248,246,0.5)'}`,
                        borderRadius: '100px',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: scrolled ? 'var(--text-main)' : 'rgba(249,248,246,0.9)',
                        textDecoration: 'none',
                        letterSpacing: '0.03em',
                        transition: 'all 0.4s ease',
                        cursor: 'none',
                    }}
                >
                    Contact Us
                    <ArrowRight size={13} />
                </Link>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg-primary)',
                transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
                opacity: menuOpen ? 1 : 0, transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.6s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '3vw', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
                    <X size={32} />
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'About Studio', href: '/about' },
                        { label: 'Selected Works', href: '/projects' },
                        { label: 'Services', href: '/services' },
                        { label: 'Contact', href: '/contact' }
                    ].map(l => (
                        <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 5vw, 4rem)', textDecoration: 'none', color: 'var(--text-main)', transition: 'color 0.3s ease' }}>
                            {l.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
