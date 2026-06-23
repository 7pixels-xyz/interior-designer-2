'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>();
    const [expanded, setExpanded] = useState(false);
    const [label, setLabel] = useState('VIEW');

    useEffect(() => {
        const el = cursorRef.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            if (el.style.opacity === '0') el.style.opacity = '1';
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.12);
            currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.12);

            if (el) {
                el.style.transform = `translate(${currentRef.current.x - (expanded ? 40 : 4)}px, ${currentRef.current.y - (expanded ? 40 : 4)}px)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        window.addEventListener('mousemove', onMove);

        const onEnterView = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            const cursorType = target.dataset.cursor || 'view';
            setLabel(cursorType === 'drag' ? 'DRAG' : 'VIEW');
            setExpanded(true);
        };
        const onLeaveView = () => setExpanded(false);

        const viewEls = document.querySelectorAll('[data-cursor]');
        viewEls.forEach(el => {
            el.addEventListener('mouseenter', onEnterView);
            el.addEventListener('mouseleave', onLeaveView);
        });

        return () => {
            window.removeEventListener('mousemove', onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            viewEls.forEach(el => {
                el.removeEventListener('mouseenter', onEnterView);
                el.removeEventListener('mouseleave', onLeaveView);
            });
        };
    }, [expanded]);

    // Re-bind after DOM changes
    useEffect(() => {
        const rebind = () => {
            const onEnterView = (e: Event) => {
                const target = e.currentTarget as HTMLElement;
                const cursorType = target.dataset.cursor || 'view';
                setLabel(cursorType === 'drag' ? 'DRAG' : 'VIEW');
                setExpanded(true);
            };
            const onLeaveView = () => setExpanded(false);

            const viewEls = document.querySelectorAll('[data-cursor]');
            viewEls.forEach(el => {
                el.addEventListener('mouseenter', onEnterView);
                el.addEventListener('mouseleave', onLeaveView);
            });
        };
        setTimeout(rebind, 500);
    }, []);

    return (
        <div
            id="custom-cursor"
            ref={cursorRef}
            className={expanded ? 'expanded' : ''}
            style={{ transform: 'translate(-50px, -50px)', opacity: 0 }}
        >
            <span className="cursor-label">{label}</span>
        </div>
    );
}
