import React, { useRef, useEffect, useState } from 'react'
import englishTextImg from '../../images/second.png'

/**
 * Responsive fade-in image for right text:
 * - Uses an image for the English text (src/images/second.png).
 * - Fades in as a whole.
 * - No SVG text, just the image.
 * - Responsive: image size and position adjust for mobile/tablet/desktop.
 * - The SVG background remains visible if needed.
 * - The component has a top margin (smaller on mobile) and is left-aligned.
 * 
 * Responsive breakpoints:
 *   - Mobile: <= 600px
 *   - Tablet: 601px - 1024px
 *   - Desktop: > 1024px
 */

const BREAKPOINTS = {
    mobile: 600,
    tablet: 1024,
}

const getImageProps = (width) => {
    if (width <= BREAKPOINTS.mobile) {
        // Mobile
        return {
            width: 220,
            height: 36,
            x: 60,
            y: 22,
            svgWidth: 340,
            svgHeight: 80,
            marginTop: 86,
        }
    } else if (width <= BREAKPOINTS.tablet) {
        // Tablet
        return {
            width: 350,
            height: 56,
            x: 90,
            y: 32,
            svgWidth: 700,
            svgHeight: 120,
            marginTop: 120,
        }
    } else {
        // Desktop
        return {
            width: 520,
            height: 80,
            x: 100,
            y: 50,
            svgWidth: 914,
            svgHeight: 164,
            marginTop: 200,
        }
    }
}

const RightTextReveal = () => {
    const imgGroupRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    )

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (imgGroupRef.current) {
            imgGroupRef.current.style.opacity = 0
            setTimeout(() => {
                imgGroupRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
                imgGroupRef.current.style.opacity = 1
            }, 50)
        }
    }, [windowWidth])

    const { width, height, x, y, svgWidth, svgHeight, marginTop } = getImageProps(windowWidth)

    return (
        <div
            style={{
                marginTop: `${marginTop}px`,
                width: 'fit-content',
                marginLeft: 0,
                transition: 'margin-top 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        >
            <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block', width: svgWidth, height: svgHeight }}
            >
                {/* Optional: SVG background pattern/rect can be added here if needed */}
                {/* <rect
                    y="0.615234"
                    width={svgWidth - 100}
                    height={svgHeight - 1}
                    fill="#F0F0F0"
                /> */}
                <g ref={imgGroupRef} style={{ opacity: 0 }}>
                    <image
                        href={englishTextImg}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        style={{
                            display: 'block',
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}
                        alt="English Text"
                        aria-label="English Text"
                        draggable="false"
                    />
                </g>
            </svg>
        </div>
    )
}

export default RightTextReveal
