
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * This component renders an SVG illustration for the LEFT side and animates it using GSAP.
 * The SVG is NOT flipped (faces left).
 * The animation: fade in and slide in from the left.
 */
const LeftSideSVG = () => {
    const svgRef = useRef(null)

    useEffect(() => {
        if (svgRef.current) {
            gsap.fromTo(
                svgRef.current,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }
            )
        }
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <svg
                ref={svgRef}
                width="921"
                height="130"
                viewBox="0 0 921 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
