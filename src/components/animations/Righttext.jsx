import React, { useRef, useEffect, useState } from 'react'
import englishTextImg from '../../images/second.png'
import Doubletext from '../../images/doublejapan.png'

/**
 * Responsive fade-in image for right text:
 * - Uses an image for the English text (src/images/second.png) on tablet/desktop.
 * - Uses double japantext image (src/images/doublejapan.png) for mobile.
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

// Enlarged text/image sizes for all breakpoints
const getImageProps = (width) => {
    if (width <= BREAKPOINTS.mobile) {
        // Mobile - ENLARGED
        return {
            width: 440,      // fit svg width
            height: 60,     // fit svg height
            x: 60,            // start at left
            y: 69,            // start at top
            svgWidth: 430,
            svgHeight: 150,
            marginTop: 0,
            img: Doubletext, // Use double japantext for mobile
            alt: "Double Japan Text",
            ariaLabel: "Double Japan Text"
        }
    } else if (width <= BREAKPOINTS.tablet) {
        // Tablet - ENLARGED
        return {
            width: 500,
            height: 160,
            x: 110,
            y: 120,
            svgWidth: 700,
            svgHeight: 250,
            marginTop: 0,
            img: englishTextImg,
            alt: "English Text",
            ariaLabel: "English Text"
        }
    } else {
        // Desktop - ENLARGED
        return {
            width: 900,
            height: 180,
            x: 250,
            y: 0,
            svgWidth: 1200,
            svgHeight: 220,
            marginTop: 150,
            img: englishTextImg,
            alt: "English Text",
            ariaLabel: "English Text"
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

    const { width, height, x, y, svgWidth, svgHeight, marginTop, img, alt, ariaLabel } = getImageProps(windowWidth)

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
                <g ref={imgGroupRef} style={{ opacity: 0 }}>
                    <image
                        href={img}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        style={{
                            display: 'block',
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}
                        alt={alt}
                        aria-label={ariaLabel}
                        draggable="false"
                        preserveAspectRatio="xMidYMid meet"
                    />
                </g>
            </svg>
        </div>
    )
}

export default RightTextReveal
