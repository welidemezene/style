import React, { useState, useRef, useEffect } from 'react'
import ProgressBar from './animations/ProgressBar'
import WhiteBackgroundPage from './animations/whitebj'
import LogoAnimation from './animations/logo'
import MultipleColorLines from './animations/multiplecolor'
import LeftSideSVG from './animations/leftside'
import { gsap } from 'gsap'
import RightSideSVG from './animations/rightside'
import RightTextReveal from './animations/Righttext'
import LeftTextReveal from './animations/Lefttext'

/**
 * Animation sequence (updated for staggered left/right sides and text):
 * 1. ProgressBar (3.5s)
 * 2. WhiteBackgroundPage (0.5s)
 * 3. LogoAnimation (7.5s)
 * 4. MultipleColorLines (12s) - divided:
 *    - MultipleColorLines progress: 7s
 *    - LeftSideSVG slides in (1.5s)
 *    - RightSideSVG slides in (1.5s, after left finishes)
 *    - LeftTextReveal fades in (0.8s, after right side finishes)
 *    - RightTextReveal fades in (0.8s, after left text finishes)
 * 
 * Z-index stacking:
 * - MultipleColorLines (background)
 * - LeftSideSVG and RightSideSVG (on top of MultipleColorLines)
 * - LeftTextReveal and RightTextReveal (on top of their respective SVGs)
 */

const Hero = () => {
    // Step states
    const [showFirst, setShowFirst] = useState(true) // ProgressBar
    const [showSecond, setShowSecond] = useState(false) // WhiteBackgroundPage
    const [showThird, setShowThird] = useState(false) // LogoAnimation
    const [showMultiColor, setShowMultiColor] = useState(false) // MultipleColorLines
    const [showSides, setShowSides] = useState(false) // Left/Right Side SVGs

    // For controlling the progress of MultipleColorLines, Sides, and Text
    const [multiColorPhase, setMultiColorPhase] = useState('none') // 'progress', 'sides', 'text'

    // For staggered SVG and text reveals
    const [showLeftSide, setShowLeftSide] = useState(false)
    const [showRightSide, setShowRightSide] = useState(false)
    const [showLeftText, setShowLeftText] = useState(false)
    const [showRightText, setShowRightText] = useState(false)

    const leftSideRef = useRef(null)
    const rightSideRef = useRef(null)
    const leftTextRef = useRef(null)
    const rightTextRef = useRef(null)

    // Animation sequence
    useEffect(() => {
        const tl = gsap.timeline()
        // 1. ProgressBar (3.5s)
        tl.to({}, {
            duration: 3.7, onComplete: () => {
                setShowFirst(false)
                setShowSecond(true)
            }
        })
        // 2. WhiteBackgroundPage (0.5s)
        tl.to({}, {
            duration: 0.5, onComplete: () => {
                setShowSecond(false)
                setShowThird(true)
            }
        })
        // 3. LogoAnimation (4s)
        tl.to({}, {
            duration: 4, onComplete: () => {
                setShowThird(false)
                setShowMultiColor(true)
                setMultiColorPhase('progress')
            }
        })
        // 4a. MultipleColorLines progress (5.5s)
        tl.to({}, {
            duration: 3.7, onComplete: () => {
                setMultiColorPhase('sides')
                setShowSides(true)
            }
        })
        // 4b. Sides and text staggered sequence
        // LeftSideSVG slides in
        tl.to({}, {
            duration: 0.01, onComplete: () => setShowLeftSide(true)
        })
        tl.to({}, {
            duration: 0.8, onComplete: () => setShowRightSide(true)
        })
        // RightSideSVG slides in after left
        tl.to({}, {
            duration: 0.8, onComplete: () => setShowLeftText(true)
        })
        // LeftTextReveal fades in after right side
        tl.to({}, {
            duration: 0.4, onComplete: () => setShowRightText(true)
        })
        // RightTextReveal fades in after left text
        tl.to({}, {
            duration: 0.4, onComplete: () => {
                setMultiColorPhase('text')
                // Optionally, you could hide everything or trigger next step
            }
        })
        return () => {
            tl.kill()
        }
    }, [])

    // Animate LeftSideSVG sliding in from left to right, when showLeftSide is true
    useEffect(() => {
        if (showLeftSide && leftSideRef.current) {
            gsap.fromTo(
                leftSideRef.current,
                { width: 0, opacity: 1 },
                { width: '100vw', duration: 0.8, ease: 'power2.inOut' }
            )
        }
    }, [showLeftSide])

    // Animate RightSideSVG sliding in from right to left, when showRightSide is true
    useEffect(() => {
        if (showRightSide && rightSideRef.current) {
            gsap.fromTo(
                rightSideRef.current,
                { width: 0, opacity: 1 },
                { width: '100vw', duration: 0.8, ease: 'power2.inOut' }
            )
        }
    }, [showRightSide])

    // Fade in LeftTextReveal
    useEffect(() => {
        if (showLeftText && leftTextRef.current) {
            gsap.fromTo(
                leftTextRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.inOut' }
            )
        }
    }, [showLeftText])

    // Fade in RightTextReveal
    useEffect(() => {
        if (showRightText && rightTextRef.current) {
            gsap.fromTo(
                rightTextRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.inOut' }
            )
        }
    }, [showRightText])

    return (
        <div>
            {showFirst && (
                <div>
                    <ProgressBar />
                </div>
            )}
            {showSecond && (
                <div>
                    <WhiteBackgroundPage />
                </div>
            )}
            {showThird && (
                <div>
                    <LogoAnimation />
                </div>
            )}
            {/* MultipleColorLines full page */}
            {showMultiColor && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1000,
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 1,
                            pointerEvents: 'auto',
                        }}
                    >
                        <MultipleColorLines phase={multiColorPhase} />
                    </div>
                </div>
            )}
            {/* Sides and Text Reveals */}
            {showSides && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1100,
                        pointerEvents: 'none',
                    }}
                >
                    {/* MultipleColorLines as background for sides */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 1,
                            pointerEvents: 'auto',
                        }}
                    >
                        <MultipleColorLines phase={multiColorPhase} />
                    </div>
                    {/* Left Side SVG */}
                    {showLeftSide && (
                        <div
                            ref={leftSideRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: 0,
                                height: '100vh',
                                overflow: 'hidden',
                                zIndex: 2,
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <LeftSideSVG />
                            {/* LeftTextReveal on top of LeftSideSVG */}
                            {showLeftText && (
                                <div
                                    ref={leftTextRef}
                                    style={{
                                        position: 'absolute',
                                        left: 40,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 3,
                                        pointerEvents: 'none',
                                        opacity: 0, // Start faded out, gsap will fade in
                                    }}
                                >
                                    <LeftTextReveal />
                                </div>
                            )}
                        </div>
                    )}
                    {/* Right Side SVG */}
                    {showRightSide && (
                        <div
                            ref={rightSideRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 0,
                                height: '100vh',
                                overflow: 'hidden',
                                zIndex: 2,
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <RightSideSVG />
                            {/* RightTextReveal on top of RightSideSVG */}
                            {showRightText && (
                                <div
                                    ref={rightTextRef}
                                    style={{
                                        position: 'absolute',
                                        right: 40,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 3,
                                        pointerEvents: 'none',
                                        opacity: 0, // Start faded out, gsap will fade in
                                    }}
                                >
                                    <RightTextReveal />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Hero