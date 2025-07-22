import React, { useRef, useEffect, useState } from 'react'

/**
 * Understanding of the design:
 * - The user wants the text "New AiD." to appear as a whole, with no animation on the text itself.
 * - The text should start off-screen (to the left) and slide in as a single object/component, with no per-letter or mask animation.
 * - The dot (".") at the end should be a circle, not a text character, and positioned as if it were a dot.
 * - The SVG background should remain visible behind the text.
 * - No GSAP or animation on the text itself, just a slide-in of the whole text group.
 * - The dot should be visually close to the end of the text, as a period would be.
 * 
 * Modification for this version:
 * - The text and dot are moved 100px to the right (textX + 100).
 * - The dot is placed immediately after the text, as close as a period would be.
 */

const ENGLISH_TEXT = 'New AiD' // No dot

const LeftTextReveal = () => {
    const groupRef = useRef(null)
    const SVG_WIDTH = 914
    const SVG_HEIGHT = 164

    // Font and layout
    const fontSize = 100 // Slightly smaller to fit in 164px height
    const textX = 80 + 300 // Move text 100px to the right
    const textY = 110 // Visually centered for 80px font

    // To get the dot close to the text, we use <text> element's getBBox after mount
    const textRef = useRef(null)
    const [dotPos, setDotPos] = useState({ cx: textX + 350, cy: textY - fontSize * 0.13 })

    useEffect(() => {
        if (groupRef.current) {
            // Slide the whole group in from off-screen left
            groupRef.current.style.transform = `translateX(-${SVG_WIDTH}px)`
            groupRef.current.style.opacity = 1
            setTimeout(() => {
                groupRef.current.style.transition = 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
                groupRef.current.style.transform = 'translateX(0)'
            }, 50)
        }
    }, [])

    // After mount, measure the text width and set the dot position
    useEffect(() => {
        if (textRef.current) {
            const bbox = textRef.current.getBBox()
            const circleRadius = fontSize * 0.11
            // Place the dot immediately after the text, as close as a period would be
            setDotPos({
                cx: bbox.x + bbox.width + circleRadius * 0.3, // smaller gap for "right after"
                cy: bbox.y + bbox.height * 0.82 // visually aligns with baseline
            })
        }
    }, [fontSize, textX, textY])

    const circleRadius = fontSize * 0.11

    return (
        <svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <defs>
                {/* Replace this pattern/gradient with your actual pattern or gradient definition */}
                <pattern
                    id="pattern0_3026_52315"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <rect x="0" y="0" width="1" height="1" fill="#F0F0F0" />
                </pattern>
            </defs>
            {/* Background rectangle with pattern */}
            {/* <rect
                y="0.615234"
                width="613.647"
                height="163"
                fill="url(#pattern0_3026_52315)"
            /> */}
            {/* Text and dot as a group, sliding in from the left */}
            <g ref={groupRef} style={{ opacity: 0 }}>
                <text
                    ref={textRef}
                    x={textX}
                    y={textY}
                    fontSize={fontSize}
                    fill="black"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                >
                    {ENGLISH_TEXT}
                </text>
                <circle
                    cx={dotPos.cx}
                    cy={dotPos.cy}
                    r={circleRadius}
                    fill="black"
                />
            </g>
        </svg>
    )
}

export default LeftTextReveal
