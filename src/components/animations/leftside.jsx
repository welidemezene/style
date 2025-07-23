import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Responsive LeftSideSVG:
 * - SVG illustration for the LEFT side, animates in from the left.
 * - Responsive: SVG width, height, and vertical offset adjust for mobile/tablet/desktop.
 * - Uses 100% width, max-width, and viewBox scaling for crispness.
 * - Animation: fade in and slide in from the left.
 */
const getResponsiveProps = (width) => {
    if (width <= 600) {
        // Mobile
        return {
            svgWidth: 340,
            svgHeight: 44,
            viewBox: '0 0 340 24',
            translateY: 12,
        }
    } else if (width <= 1024) {
        // Tablet
        return {
            svgWidth: 700,
            svgHeight: 60,
            viewBox: '0 0 700 48',
            translateY: 7,
        }
    } else {
        // Desktop
        return {
            svgWidth: 921,
            svgHeight: 130,
            viewBox: '0 0 921 130',
            translateY: 11,
        }
    }
}

const LeftSideSVG = () => {
    const svgRef = useRef(null)
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
        if (svgRef.current) {
            gsap.fromTo(
                svgRef.current,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }
            )
        }
    }, [responsive])

    // The path coordinates are scaled for desktop, so for mobile/tablet, we scale the SVG down using viewBox and width/height.
    // For best crispness, keep the original path data and just scale the SVG.

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: responsive.translateY,
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height={responsive.svgHeight}
                viewBox="0 0 921 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    maxWidth: responsive.svgWidth,
                    height: responsive.svgHeight,
                    display: 'block',
                }}
                preserveAspectRatio="none"
            >
                <path d="M0 0H909V8V16H0V0Z" fill="white" />
                <path d="M0 17H829V20V23H0V17Z" fill="white" />
                <path d="M0 24H896V28.5V33H0V24Z" fill="white" />
                <path d="M0 34H872V40V46H0V34Z" fill="white" />
                <path d="M0 47H805V49V51H0V47Z" fill="white" />
                <path d="M0 52H888V60V68H0V52Z" fill="white" />
                <path d="M0 69H872V75V81H0V69Z" fill="white" />
                <path d="M0 82H921V90V98H0V82Z" fill="white" />
                <path d="M0 99H885V101V103H0V99Z" fill="white" />
                <path d="M0 104H843V112V120H0V104Z" fill="white" />
                <path d="M0 121H896V125.5V130H0V121Z" fill="white" />
            </svg>
        </div>
    )
}

export default LeftSideSVG
