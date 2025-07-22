import React, { useRef, useEffect } from 'react'

/**
 * Improved understanding for moving text left without clipping:
 * - The text "for Creators" should slide in from the left, but should never be clipped or covered by the SVG edge.
 * - Instead of moving the text's x position left (which can cause it to be outside the SVG viewBox and thus clipped), keep the text within the visible SVG area.
 * - To create a "move left" effect, increase the SVG's width and viewBox, and position the text further right inside the SVG, so that when you animate the group, it slides in but is always visible.
 * - The component should have a top margin of 200px and be left-aligned in its parent.
 */

const ENGLISH_TEXT = ' 新たな常識、ここから始まる。'

const RightTextReveal = () => {
    const groupRef = useRef(null)
    // Increase SVG width to allow for leftward movement without clipping
    const SVG_WIDTH = 914 // 614 + 200 extra px for slide-in room
    const SVG_HEIGHT = 164

    // Font and layout
    const fontSize = 56
    const textX = 100 // Start text further right, so it can slide in from left
    const textY = 110

    useEffect(() => {
        if (groupRef.current) {
            // Start the group off-screen to the left (by 200px)
            groupRef.current.style.transform = `translateX(-200px)`
            groupRef.current.style.opacity = 1
            setTimeout(() => {
                groupRef.current.style.transition = 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
                groupRef.current.style.transform = 'translateX(0)'
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
                {/* Text as a group, sliding in from the left */}
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
