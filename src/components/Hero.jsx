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
 * Animation sequence (updated as per new requirements):
 * 1. ProgressBar (3.5s)
 * 2. WhiteBackgroundPage (0.5s)
 * 3. LogoAnimation (7.5s)
 * 4. MultipleColorLines (12s) - divided:
 *    - MultipleColorLines progress: 7s
 *    - Left/Right Side SVGs: 3s
 *    - Text reveal: 2s
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
    const [showTextReveal, setShowTextReveal] = useState(false) // Text Reveal

    // For controlling the progress of MultipleColorLines, Sides, and Text
    const [multiColorPhase, setMultiColorPhase] = useState('none') // 'progress', 'sides', 'text'

    const leftSideRef = useRef(null)
    const rightSideRef = useRef(null)

    // Animation sequence
    useEffect(() => {
        const tl = gsap.timeline()
        // 1. ProgressBar (3.5s)
        tl.to({}, {
            duration: 3.5, onComplete: () => {
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
        // 3. LogoAnimation (7.5s)
        tl.to({}, {
            duration: 7.3, onComplete: () => {
                setShowThird(false)
                setShowMultiColor(true)
                setMultiColorPhase('progress')
            }
        })
        // 4a. MultipleColorLines progress (7s)
        tl.to({}, {
            duration: 5.5, onComplete: () => {
                setMultiColorPhase('sides')
                setShowSides(true)
            }
        })
        // 4b. Left/Right Side SVGs (3s)
        tl.to({}, {
            duration: 2.8, onComplete: () => {
                setMultiColorPhase('text')
                setShowTextReveal(true)
            }
        })
        // 4c. Text reveal (2s)
        tl.to({}, {
            duration: 2, onComplete: () => {
                // Optionally, you could hide everything or trigger next step
            }
        })
        return () => {
            tl.kill()
        }
    }, [])

    // Animate LeftSideSVG sliding in from left to right, when showSides is true
    useEffect(() => {
        if (multiColorPhase === 'sides' && leftSideRef.current) {
            gsap.fromTo(
                leftSideRef.current,
                { width: 0, opacity: 1 },
                { width: '100vw', duration: 3, ease: 'power2.inOut' }
            )
        }
    }, [multiColorPhase])

    // Animate RightSideSVG sliding in from right to left, when showSides is true
    useEffect(() => {
        if (multiColorPhase === 'sides' && rightSideRef.current) {
            gsap.fromTo(
                rightSideRef.current,
                { width: 0, opacity: 1 },
                { width: '100vw', duration: 3, ease: 'power2.inOut' }
            )
        }
    }, [multiColorPhase])

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
                        {showTextReveal && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 40,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 3,
                                    pointerEvents: 'none',
                                }}
                            >
                                <LeftTextReveal />
                            </div>
                        )}
                    </div>
                    {/* Right Side SVG */}
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
                        {showTextReveal && (
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 40,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 3,
                                    pointerEvents: 'none',
                                }}
                            >
                                <RightTextReveal />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hero