import { useEffect, useRef } from 'react';

const MANIFESTO_TEXT = "Space is not an empty void to be filled. Space is a narrative medium. We believe true luxury lies in restraint, allowing natural light, heritage materials, and emotional resonance to define the geography of the home.";

export default function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        let ctx: any;
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const words = textRef.current?.querySelectorAll('.ms-word');
                if (words && words.length > 0) {
                    gsap.fromTo(words,
                        { opacity: 0.15 },
                        {
                            opacity: 1,
                            stagger: 0.05,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 60%',
                                end: 'bottom 80%',
                                scrub: true,
                            }
                        }
                    );
                }
            }, sectionRef);
        };
        init();
        return () => ctx?.revert();
    }, []);

    const words = MANIFESTO_TEXT.split(' ');

    return (
        <section
            ref={sectionRef}
            className="section-pad"
            style={{
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
            }}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <p className="label-small" style={{ marginBottom: '3rem' }}>The Manifesto</p>
                <p
                    ref={textRef}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                        lineHeight: 1.2,
                        color: 'var(--text-main)',
                    }}
                >
                    {words.map((word, i) => (
                        <span key={i} className="ms-word" style={{ display: 'inline-block', marginRight: '0.25em' }}>
                            {word}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
