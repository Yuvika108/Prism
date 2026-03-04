import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const VIBGYOR_CSS = '#8B00FF, #4B0082, #0000FF, #00FF00, #FFFF00, #FF7F00, #FF0000, #8B00FF';

export default function CursorGlow() {
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    const rawX = useMotionValue(-400);
    const rawY = useMotionValue(-400);

    // Crystal — tight spring so it snaps precisely to the pointer
    const cursorX = useSpring(rawX, { stiffness: 600, damping: 38, mass: 0.25 });
    const cursorY = useSpring(rawY, { stiffness: 600, damping: 38, mass: 0.25 });

    // Glow orb — drifts lazily
    const glowX = useSpring(rawX, { stiffness: 80, damping: 22, mass: 0.7 });
    const glowY = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.7 });

    useEffect(() => {
        const move = (e) => { rawX.set(e.clientX); rawY.set(e.clientY); setVisible(true); };
        const leave = () => setVisible(false);
        const enter = () => setVisible(true);
        const down = () => setClicking(true);
        const up = () => setClicking(false);
        const over = (e) => {
            const t = e.target;
            setHovering(
                t.tagName === 'A' ||
                t.tagName === 'BUTTON' ||
                !!t.closest('a') ||
                !!t.closest('button') ||
                window.getComputedStyle(t).cursor === 'pointer'
            );
        };

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseleave', leave);
        document.addEventListener('mouseenter', enter);
        document.addEventListener('mousedown', down);
        document.addEventListener('mouseup', up);
        document.addEventListener('mouseover', over);
        return () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseleave', leave);
            document.removeEventListener('mouseenter', enter);
            document.removeEventListener('mousedown', down);
            document.removeEventListener('mouseup', up);
            document.removeEventListener('mouseover', over);
        };
    }, [rawX, rawY]);

    const orbSize = hovering ? 300 : clicking ? 200 : 250;

    return (
        <>
            {/* ── VIBGYOR ambient blur orb — drifts behind ── */}
            <motion.div
                className="pointer-events-none fixed z-[9996]"
                style={{
                    left: glowX,
                    top: glowY,
                    x: '-50%',
                    y: '-50%',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 300ms ease',
                }}
            >
                <motion.div
                    animate={{ width: orbSize, height: orbSize, rotate: [0, 360] }}
                    transition={{
                        width: { duration: 0.5, ease: 'easeOut' },
                        height: { duration: 0.5, ease: 'easeOut' },
                        rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
                    }}
                    style={{
                        borderRadius: '50%',
                        background: `conic-gradient(from 0deg, ${VIBGYOR_CSS})`,
                        filter: 'blur(52px)',
                        opacity: hovering ? 0.28 : 0.15,
                        mixBlendMode: 'screen',
                        transition: 'opacity 300ms ease',
                    }}
                />
            </motion.div>

            {/* ── PRISM crystal — IS the cursor ── */}
            <motion.div
                className="pointer-events-none fixed z-[9999]"
                style={{
                    left: cursorX,
                    top: cursorY,
                    // x/y offset so the TIP of the crystal (top-center) aligns with the click point
                    x: '-50%',
                    y: '-8px',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 150ms ease',
                }}
            >
                <motion.img
                    src="/prism-crystal.png"
                    alt=""
                    draggable={false}
                    animate={{
                        width: hovering ? 40 : clicking ? 24 : 32,
                        height: hovering ? 40 : clicking ? 24 : 32,
                        scale: clicking ? 0.8 : 1,
                        rotate: clicking ? [-6, 6, -3, 0] : 0,
                        filter: hovering
                            ? 'drop-shadow(0 0 10px rgba(62,255,160,0.95)) drop-shadow(0 0 20px rgba(139,0,255,0.6))'
                            : clicking
                                ? 'drop-shadow(0 0 12px rgba(255,165,0,0.9)) drop-shadow(0 0 24px rgba(255,0,0,0.5))'
                                : 'drop-shadow(0 0 5px rgba(62,255,160,0.55))',
                    }}
                    transition={{
                        width: { duration: 0.18, ease: 'easeOut' },
                        height: { duration: 0.18, ease: 'easeOut' },
                        scale: { duration: 0.12 },
                        rotate: { duration: 0.3, ease: 'easeOut' },
                        filter: { duration: 0.2 },
                    }}
                    style={{ display: 'block', objectFit: 'contain', userSelect: 'none' }}
                />
            </motion.div>
        </>
    );
}
