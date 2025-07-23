import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const ProgressBar = () => {
    const barRef = useRef(null)
    const percentTextRef = useRef(null)
    const containerRef = useRef(null)
    const [percent, setPercent] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    // Responsive check
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        // Fixed gap between bar end and text (in pixels)
        const fixedGap = 30 // Always 10px as per instruction
        // Gap to the right of the progress bar (in pixels)
        const rightGap = isMobile ? 24 : 40

        const percentObj = { value: 0 }
        const textWidth = percentTextRef.current ? percentTextRef.current.offsetWidth : 60
        const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0

        // The width available for the bar (container minus right gap and percent text)
        const barMaxWidth = containerWidth - rightGap - textWidth

        // Start the bar offscreen to the left
        if (barRef.current) {
            gsap.set(barRef.current, { x: '-100%' })
        }
        if (percentTextRef.current) {
            gsap.set(percentTextRef.current, { opacity: 0 })
        }

        const tl = gsap.timeline()

        // Slide the bar in from the left, then animate width and percent
        tl.to(barRef.current, {
            x: '0%',
            duration: 0.3,
            ease: 'power2.out',
        })

        // Animate bar width and percent value together (duration: 3s)
        tl.to(barRef.current, {
            width: barMaxWidth > 0 ? barMaxWidth : 0,
            duration: 3.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (barRef.current && percentTextRef.current) {
                    const barWidth = barRef.current.offsetWidth
                    // Calculate text position based on bar width + fixed gap
                    // But don't let it go past the right gap
                    const maxTextLeft = containerWidth - rightGap - textWidth
                    const textPosition = Math.min(barWidth + fixedGap, maxTextLeft)
                    gsap.set(percentTextRef.current, { left: textPosition })
                }
            }
        }, ">") // Start after previous

        tl.to(percentObj, {
            value: 100,
            duration: 3,
            ease: 'power2.inOut',
            onUpdate: () => setPercent(Math.round(percentObj.value))
        }, "-=3") // Sync with bar width animation

        // Fade in the percent text as the bar starts animating
        tl.to(percentTextRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, 0.5)

        return () => {
            tl.kill()
        }
    }, [isMobile])

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-white"
            style={{
                margin: 0,
                padding: 0,
                overflowX: 'hidden',
            }}
        >
            <div
                ref={containerRef}
                className="w-screen flex items-center"
                style={{
                    position: 'relative',
                    margin: 0,
                    padding: 0, // Set padding to zero
                    width: '100vw',
                    maxWidth: '100vw',
                    boxSizing: 'border-box'
                }}
            >
                {/* Progress Bar Container */}
                <div
                    className="bg-white overflow-hidden"
                    style={{
                        width: '100vw',
                        height: isMobile ? '4px' : '6px',
                        marginRight: '80px',
                        padding: 0,
                        position: 'relative',
                        backgroundColor: 'white'
                    }}
                >
                    <div
                        ref={barRef}
                        className=""
                        style={{
                            height: '100%',
                            width: '0%',
                            background: 'linear-gradient(270deg, #F5DB47 0.01%, #EA5F6B 46%, #1274BC 99.99%)',
                            margin: 0,
                            padding: 0,
                            // No need to set transform here, gsap will handle it
                            position: 'absolute',
                            left: 0,
                            top: 0,
                        }}
                    ></div>
                </div>
                {/* Percentage Counter */}
                <span
                    ref={percentTextRef}
                    className="text-lg font-semibold ml-4 flex items-center"
                    style={{
                        color: '#000',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto 0',
                        height: 'fit-content',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: isMobile ? '1rem' : '1.125rem',
                        opacity: 0, // Start hidden, gsap will fade in
                    }}
                >
                    {percent}%
                </span>
            </div>
        </div>
    )
}

export default ProgressBar