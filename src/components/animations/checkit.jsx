import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const DiagonalProgressLines = () => {
    const linesRef = useRef([]);
    const containerRef = useRef(null);

    // Configuration
    const lineCount = 20;
    const angle = -42;
    const lineWidth = 3;
    const spacing = 15;

    // Initialize lines data
    const initializeLines = () => {
        const lines = [];
        const containerWidth = 800;
        const containerHeight = 600;

        for (let i = 0; i < lineCount; i++) {
            const offset = i * spacing;
            const length = Math.sqrt(containerWidth * containerWidth + containerHeight * containerHeight);

            // Calculate start and end points for -42 degree angle
            const startX = offset;
            const startY = containerHeight - offset;
            const endX = startX + length * Math.cos(angle * Math.PI / 180);
            const endY = startY + length * Math.sin(angle * Math.PI / 180);

            lines.push({
                id: `line-${i}`,
                startX,
                startY,
                endX,
                endY,
                gradientId: `gradient-${i}`,
                color1: `hsl(${(i * 15) % 360}, 80%, 60%)`,
                color2: `hsl(${(i * 15 + 120) % 360}, 80%, 60%)`
            });
        }

        return lines;
    };

    const lines = initializeLines();

    // Animate lines
    useEffect(() => {
        linesRef.current.forEach((line, index) => {
            const length = line.getTotalLength();

            gsap.fromTo(line,
                { strokeDashoffset: length },
                {
                    strokeDashoffset: 0,
                    duration: 2,
                    delay: index * 0.1,
                    ease: "power2.out"
                }
            );
        });
    }, []);

    return (
        <div className="progress-container" ref={containerRef}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {lines.map((line) => (
                        <linearGradient
                            key={line.gradientId}
                            id={line.gradientId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor={line.color1} />
                            <stop offset="100%" stopColor={line.color2} />
                        </linearGradient>
                    ))}
                </defs>

                {lines.map((line, index) => (
                    <path
                        key={line.id}
                        ref={el => linesRef.current[index] = el}
                        d={`M${line.startX},${line.startY} L${line.endX},${line.endY}`}
                        stroke={`url(#${line.gradientId})`}
                        strokeWidth={lineWidth}
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        style={{ opacity: 0.8 }}
                    />
                ))}
            </svg>
        </div>
    );
};

// CSS styles (add to your stylesheet or as JS object)
const styles = `
  .progress-container {
    width: 100%;
    height: 100vh;
    background: #121212;
    overflow: hidden;
    position: relative;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

// Add styles to document head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default DiagonalProgressLines;