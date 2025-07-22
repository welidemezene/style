import React, { useRef, useEffect } from 'react'

/**
 * Updated understanding for fade-in:
 * - The text "新たな常識、ここから始まる。" should fade in as a whole, not slide in.
 * - No per-letter or mask animation, just a fade-in of the entire text group.
 * - The SVG background remains visible.
 * - The component should have a top margin of 200px and be left-aligned in its parent.
 */

const ENGLISH_TEXT = ' 新たな常識、ここから始まる。'

const RightTextReveal = () => {
    const groupRef = useRef(null)
    const SVG_WIDTH = 914
    const SVG_HEIGHT = 164

    // Font and layout
    const fontSize = 56
    const textX = 100
    const textY = 110

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

    return (
        <div style={{ marginTop: '200px', width: 'fit-content', marginLeft: 0 }}>
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
                    width="813.647"
                    height="163"
                    fill="url(#pattern0_3026_52315)"
                /> */}
                {/* Text as a group, fading in */}
                <g ref={groupRef} style={{ opacity: 0 }}>
                    <text
                        x={textX}
                        y={textY}
                        fontSize={fontSize}
                        fill="black"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                    >
                        {ENGLISH_TEXT}
                    </text>
                </g>
            </svg>
        </div>
    )
}

export default RightTextReveal
