import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * This component renders an SVG illustration for the RIGHT side and animates it using GSAP.
 * The SVG is NOT flipped (faces right).
 * The animation: fade in and slide in from the right.
 * The SVG is positioned 80px lower using a CSS transform.
 */
const RightSideSVG = () => {
    const svgRef = useRef(null)

    useEffect(() => {
        if (svgRef.current) {
            gsap.fromTo(
                svgRef.current,
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }
            )
        }
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <svg
                ref={svgRef}
                width="955"
                height="66"
                viewBox="0 0 955 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'translateY(110px)' }}
            >
                <path d="M22 0H955V4.5V9H22V0Z" fill="white" />
                <path d="M30 10H955V12V14H30V10Z" fill="white" />
                <path d="M46 15H955V23V31H46V15Z" fill="white" />
                <path d="M0 32H955V35V38H0V32Z" fill="white" />
                <path d="M59 39H955V43.5V48H59V39Z" fill="white" />
                <path d="M24 49H955V51V53H24V49Z" fill="white" />
                <path d="M39 54H955V60V66H39V54Z" fill="white" />
            </svg>
        </div>
    )
}

export default RightSideSVG