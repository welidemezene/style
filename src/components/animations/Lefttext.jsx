import React, { useRef, useEffect, useState } from 'react'
import newAidImg from '../../images/new_aid.png'

/**
 * Responsive LeftTextReveal:
 * - Uses an image for the "New AiD" text.
 * - Fades in as a whole.
 * - Responsive: adjusts SVG and image size/position for mobile/tablet/desktop.
 * - No SVG text or dot, just the image.
 * - SVG background remains visible if needed.
 */

// Responsive breakpoints and image/SVG sizes
const getResponsiveProps = (width) => {
    if (width <= 600) {
        // Mobile
        return {
            svgWidth: 340,
            svgHeight: 80,
            imageWidth: 180,
            imageHeight: 44,
            imageX: 0,
            imageY: 18,
            marginTop: 10,
        }
    } else if (width <= 1024) {
        // Tablet
        return {
            svgWidth: 600,
            svgHeight: 120,
            imageWidth: 280,
            imageHeight: 70,
            imageX: 80,
            imageY: 28,
            marginTop: 0,
        }
    } else {
        // Desktop
        return {
            svgWidth: 914,
            svgHeight: 164,
            imageWidth: 420,
            imageHeight: 120,
            imageX: 220,
            imageY: 32,
            marginTop: 0,
        }
    }
}

const LeftTextReveal = () => {
    const imgGroupRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
    const [responsive, setResponsive] = useState(getResponsiveProps(window.innerWidth || 1200))

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            setWindowWidth(width)
            setResponsive(getResponsiveProps(width))
        }
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
    }, [responsive])

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop: responsive.marginTop,
                // Prevent horizontal scroll on mobile
                overflowX: 'hidden',
            }}
        >
            <svg
                width="100%"
                height={responsive.svgHeight}
                viewBox={`0 0 ${responsive.svgWidth} ${responsive.svgHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    display: 'block',
                    maxWidth: responsive.svgWidth,
                    height: responsive.svgHeight,
                    width: '100%',
                }}
                preserveAspectRatio="xMinYMin meet"
            >
                {/* Optional: SVG background pattern/rect can be added here if needed */}
                {/* <rect
                    y="0"
                    width={responsive.svgWidth}
                    height={responsive.svgHeight}
                    fill="#F0F0F0"
                /> */}
                <g ref={imgGroupRef} style={{ opacity: 0 }}>
                    <image
                        href={newAidImg}
                        x={responsive.imageX}
                        y={responsive.imageY}
                        width={responsive.imageWidth}
                        height={responsive.imageHeight}
                        style={{
                            display: 'block',
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}
                        alt="New AiD"
                        aria-label="New AiD"
                        draggable="false"
                    />
                </g>
            </svg>
        </div>
    )
}

export default LeftTextReveal
