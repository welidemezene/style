import React, {
    useRef,
    useEffect,
    useState
} from 'react'
import {
    gsap
} from 'gsap'

/**
 * Responsive RightSideSVG:
 * - SVG illustration for the RIGHT side, animates in from the right.
 * - Responsive: SVG width, height, and vertical offset adjust for mobile/tablet/desktop.
 * - Uses 100% width, max-width, and viewBox scaling for crispness.
 * - Animation: fade in and slide in from the right.
 * - SVG height has been increased for all breakpoints (as a whole, not per line).
 */
const getResponsiveProps = (width) => {
    if (width <= 600) {
        // Mobile (increased height)
        return {
            svgWidth: 340,
            svgHeight: 130, // was 54
            viewBox: '0 0 955 120', // height doubled from 66 to 120
            translateY: 50,
        }
    } else if (width <= 1024) {
        // Tablet (increased height)
        return {
            svgWidth: 700,
            svgHeight: 160, // was 65
            viewBox: '0 0 955 180', // height increased
            translateY: 130,
        }
    } else {
        // Desktop (increased height)
        return {
            svgWidth: 1055,
            svgHeight: 300, // was 80
            viewBox: '0 0 955 260', // height increased
            translateY: 170,
        }
    }
}

const RightSideSVG = () => {
    const svgRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined'
            ? window.innerWidth
            : 1200
    )
    const [responsive, setResponsive] = useState(
        getResponsiveProps(
            window.innerWidth || 1200
        )
    )

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            setWindowWidth(width)
            setResponsive(
                getResponsiveProps(width)
            )
        }
        handleResize()
        window.addEventListener(
            'resize',
            handleResize
        )
        return () =>
            window.removeEventListener(
                'resize',
                handleResize
            )
    }, [])

    useEffect(() => {
        if (svgRef.current) {
            gsap.fromTo(
                svgRef.current,
                {
                    opacity: 0,
                    x: 100
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: 'power2.out'
                }
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
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <svg
                ref={svgRef}
                width={responsive.svgWidth}
                height={responsive.svgHeight}
                viewBox={responsive.viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    maxWidth: '100vw',
                    height: 'auto',
                    display: 'block',
                    transform: `translateY(${responsive.translateY
                        }px)`,
                }}
                preserveAspectRatio="none"
            >
                <path
                    d="M22 0H955V4.5V9H22V0Z"
                    fill="white"
                />
                <path
                    d="M30 10H955V12V14H30V10Z"
                    fill="white"
                />
                <path
                    d="M46 15H955V23V31H46V15Z"
                    fill="white"
                />
                <path
                    d="M0 32H955V35V38H0V32Z"
                    fill="white"
                />
                <path
                    d="M59 39H955V43.5V48H59V39Z"
                    fill="white"
                />
                <path
                    d="M24 49H955V51V53H24V49Z"
                    fill="white"
                />
                <path
                    d="M39 54H955V60V66H39V54Z"
                    fill="white"
                />
            </svg>
        </div>
    )
}

export default RightSideSVG