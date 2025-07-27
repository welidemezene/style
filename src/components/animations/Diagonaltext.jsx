import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getPlatformInfo, getSafeViewportHeight, getSafeViewportWidth, createResizeHandler } from '../../utils/platformUtils';

// Responsive helper: get device type and rotate angle/font si
//this is the apge to change an angle of a text

const getResponsiveProps = (width) => {
    if (width <= 600) {
        // Mobile
        return {
            rotate: -41,
            fontSize: '0.85rem',
        };
    } else if (width <= 1024) {
        // Tablet
        return {
            rotate: -40,
            fontSize: '1rem',
        };
    } else {
        // Desktop
        return {
            rotate: -40.3,
            fontSize: '1.15rem',
        };
    }
};

const sentences = [
    "company that genuinely and sincerely supports all those with whom we have a connection,",
    "A soft breeze carries the scent of blooming flowers.",
    // "Children's laughter echoes through the quiet park.",
    "Coffee shops buzz with the morning crowd.",
    "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    "established rules, or standard procedures.",
    // "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    // "Clouds drift lazily across the blue sky.",
    // "Artists sketch dreams on blank canvases.",
    // "Footsteps tap on rain-washed sidewalks.",
    "In order to remain a company that genuinely and sincerely supports all those with whom we have a connection,",
    "Stars twinkle above, promising tomorrow.",
];

// Responsive diagonal positions for each sentence
const diagonalPositionsDesktop = [
    { top: '50%', left: '5%', bottom: '10%' },
    { top: '0', left: '39%' },
    { top: '50%', left: '13%', bottom: '0%' },
    { top: '30%', left: '37%' },
    { top: '70%', left: '76%' },
    { top: '30%', left: '49%' },
    { top: '78%', left: '4%', bottom: '-10%' },
    { top: '30%', left: '52%' },//none
];
const diagonalPositionsTablet = [
    { top: '8%', left: '7%' },//company
    { top: '2%', left: '20%' },//top
    { top: '48%', left: '15%' },//coffee
    { top: '28%', left: '33%' },//in order
    { top: '68%', left: '64%' },//established
    { top: '28%', left: '50%' },//in order
    { top: '75%', left: '0%' },
    { top: '28%', left: '50%' },
];
const diagonalPositionsMobile = [
    { top: '6%', left: '6%' },
    { top: '1%', left: '13%' },
    { top: '60%', left: '11%' },
    { top: '22%', left: '16%' },
    { top: '62%', left: '35%' },
    { top: '22%', left: '32%' },
    { top: '70%', left: '0%' },
    { top: '22%', left: '38%' },
];

const getPositions = (width) => {
    if (width <= 600) return diagonalPositionsMobile;
    if (width <= 1024) return diagonalPositionsTablet;
    return diagonalPositionsDesktop;
};

const DiagonalText = () => {
    const refs = useRef([]);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );
    const [responsive, setResponsive] = useState(getResponsiveProps(windowWidth));
    const [positions, setPositions] = useState(getPositions(windowWidth));

    useEffect(() => {
        const handleResize = createResizeHandler(() => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setResponsive(getResponsiveProps(width));
            setPositions(getPositions(width));
        }, 150); // Debounce resize for better performance

        window.addEventListener('resize', handleResize);
        // Initial set
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const platformInfo = getPlatformInfo();

        refs.current.forEach((el, i) => {
            if (el) {
                // Set initial hardware acceleration for WebKit
                gsap.set(el, {
                    force3D: true,
                    ...(platformInfo.isWebKit && {
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translateZ(0)',
                    }),
                });

                gsap.fromTo(
                    el,
                    {
                        opacity: 0,
                        y: platformInfo.isMac ? 35 : 40,
                        x: platformInfo.isMac ? -35 : -40
                    },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration: platformInfo.isWebKit ? 0.9 : 1,
                        delay: i * (platformInfo.isMac ? 0.22 : 0.25),
                        ease: platformInfo.isWebKit ? "power2.out" : "power2.out",
                    }
                );
            }
        });
    }, [responsive, positions]);

    return (
        <div
            style={{
                position: 'relative',
                top: 0,
                left: 0,
                width: getSafeViewportWidth(),
                height: getSafeViewportHeight(),
                overflow: 'hidden',
                zIndex: 1100,
                pointerEvents: 'none',
            }}
        >
            {sentences.map((sentence, i) => (
                <div
                    key={i}
                    ref={el => (refs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        ...(positions[i] || {}),
                        transform: `rotate(${responsive.rotate}deg)`,
                        fontSize: responsive.fontSize,
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
