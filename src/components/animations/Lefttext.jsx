import React, { useRef, useEffect, useState } from 'react'

/**
 * Updated understanding for fade-in:
 * - The text "New AiD." (with the dot as a circle) should fade in as a whole, not slide in.
 * - No per-letter or mask animation, just a fade-in of the entire text+dot group.
 * - The dot is a circle, positioned as a period would be.
 * - The SVG background remains visible.
 */

const ENGLISH_TEXT = 'New AiD' // No dot

const LeftTextReveal = () => {
    const groupRef = useRef(null)
    const SVG_WIDTH = 914
    const SVG_HEIGHT = 164

    // Font and layout
    const fontSize = 100
    const textX = 80 + 300
    const textY = 110

    // To get the dot close to the text, we use <text> element's getBBox after mount
    const textRef = useRef(null)
    const [dotPos, setDotPos] = useState({ cx: textX + 350, cy: textY - fontSize * 0.13 })

    useEffect(() => {
        if (groupRef.current) {
            // Start fully transparent
            groupRef.current.style.opacity = 0
            // Fade in after a short delay
            setTimeout(() => {
                groupRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
                groupRef.current.style.opacity = 1
            }, 50)
        }
    }, [])

    // After mount, measure the text width and set the dot position
    useEffect(() => {
        if (textRef.current) {
            const bbox = textRef.current.getBBox()
            const circleRadius = fontSize * 0.11
            setDotPos({
                cx: bbox.x + bbox.width + circleRadius * 0.3,
                cy: bbox.y + bbox.height * 0.82
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
            {/* Text and dot as a group, fading in */}
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
