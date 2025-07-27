import React, {
    useRef,
    useEffect,
    useState
} from 'react'
import { gsap } from 'gsap'
import {
    getPlatformInfo,
    createResizeHandler
} from '../../utils/platformUtils'

/**
 * Responsive LeftSideSVG:
 * - SVG illustration for the LEFT side, animates in from the left.
 * - Responsive: SVG width, height, and vertical offset adjust for mobile/tablet/desktop.
 * - Uses 100% width, max-width, and viewBox scaling for crispness.
 * - Animation: fade in and slide in from the left.
 * - SVG height has been increased for all breakpoints (as a whole, not per line).
 */
const getResponsiveProps = (width) => {
    if (width <= 600) {
        // Mobile (increased height)
        return {
            svgWidth: 400,
            svgHeight: 90, // was 64
            viewBox: '0 0 921 120', // height increased from 24/48/130 to 120
            translateY: -125,
        }
    }
    else if (width <= 1024) {
        // Tablet (increased height)
        return {
            svgWidth: 700,
            svgHeight: 180, // was 90
            viewBox: '0 0 921 180', // height increased
            translateY: 0,
        }
    }
    else {
        // Desktop (increased height)
        return {
            svgWidth: 1021,
            svgHeight: 260, // was 130
            viewBox: '0 0 921 260', // height increased
            translateY: 0,
        }
    }
}

const LeftSideSVG = () => {
    const svgRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined'
            ? window.innerWidth
            : 1200
    )
    const [responsive, setResponsive] = useState(
        getResponsiveProps(window.innerWidth || 1200)
    )

    useEffect(() => {
        const handleResize = createResizeHandler(
            () => {
                const width = window.innerWidth
                setWindowWidth(width)
                setResponsive(getResponsiveProps(width))
            },
            100
        ) // Debounced for better performance

        handleResize()
        window.addEventListener('resize', handleResize)
        return () =>
            window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (svgRef.current) {
            const platformInfo = getPlatformInfo()

            // Set hardware acceleration for WebKit
            gsap.set(
                svgRef.current,
                {
                    force3D: true,
                    ...(platformInfo.isWebKit && {
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translateZ(0)',
                    }),
                }
            )

            gsap.fromTo(
                svgRef.current,
                {
                    opacity: 0,
                    x: platformInfo.isMac
                        ? -90
                        : -100
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: platformInfo.isWebKit
                        ? 1.3
                        : 1.5,
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
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: responsive.translateY,
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height={responsive.svgHeight}
                viewBox={responsive.viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    maxWidth: responsive.svgWidth,
                    height: responsive.svgHeight,
                    display: 'block',
                }}
                preserveAspectRatio="none"
            >
                <path
                    d="M0 0H909V8V16H0V0Z"
                    fill="white"
                />
                <path
                    d="M0 17H829V20V23H0V17Z"
                    fill="white"
                />
                <path
                    d="M0 24H896V28.5V33H0V24Z"
                    fill="white"
                />
                <path
                    d="M0 34H872V40V46H0V34Z"
                    fill="white"
                />
                <path
                    d="M0 47H805V49V51H0V47Z"
                    fill="white"
                />
                <path
                    d="M0 52H888V60V68H0V52Z"
                    fill="white"
                />
                <path
                    d="M0 69H872V75V81H0V69Z"
                    fill="white"
                />
                <path
                    d="M0 82H921V90V98H0V82Z"
                    fill="white"
                />
                <path
                    d="M0 99H885V101V103H0V99Z"
                    fill="white"
                />
                <path
                    d="M0 104H843V112V120H0V104Z"
                    fill="white"
                />
                <path
                    d="M0 121H896V125.5V130H0V121Z"
                    fill="white"
                />
            </svg>
        </div>
    )
}

export default LeftSideSVG
