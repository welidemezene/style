import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const sentences = [
    "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    "A soft breeze carries the scent of blooming flowers.",
    // "Children's laughter echoes through the quiet park.",
    "Coffee shops buzz with the morning crowd.",
    "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    "established rules, or standard procedures.",
    "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    // "Clouds drift lazily across the blue sky.",
    // "Artists sketch dreams on blank canvases.",
    // "Footsteps tap on rain-washed sidewalks.",
    "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    // "Stars twinkle above, promising tomorrow.",
];

// Predefine diagonal positions for each sentence
const diagonalPositions = [
    { top: '10%', left: '4.7%', bottom: '10%' },
    { top: '0', left: '33.7%' },
    // { top: '0%', left: '24.5%' },
    { top: '50%', left: '10.3%', bottom: '0%' },
    { top: '30%', left: '34%' },
    { top: '70%', left: '69%' },
    { top: '30%', left: '48%' },
    // { top: '66%', left: '55%' },
    // { top: '74%', left: '45%' },
    // { top: '85%', left: '24%' },
    { top: '78%', left: '0%', bottom: '-10%' },
    { top: '30%', left: '60%' },
];

const DiagonalText = () => {
    const refs = useRef([]);

    useEffect(() => {
        refs.current.forEach((el, i) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 40, x: -40 },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration: 1,
                        delay: i * 0.25,
                        ease: "power2.out",
                    }
                );
            }
        });
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 1100, // High z-index to display on top of other page content
                pointerEvents: 'none', // Prevent interaction
            }}
        >
            {sentences.map((sentence, i) => (
                <div
                    key={i}
                    ref={el => (refs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        ...diagonalPositions[i],
                        transform: 'rotate(-35.3deg)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#222',
                        opacity: 0,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        textShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        letterSpacing: '0.01em',
                    }}
                >
                    {sentence}
                </div>
            ))}
        </div>
    );
};

export default DiagonalText;
