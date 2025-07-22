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
 * This component orchestrates a sequence of animations:
 * 1. ProgressBar (3.5s)
 * 2. WhiteBackgroundPage (0.5s)
 * 3. LogoAnimation (3.5s)
 * 4. MultipleColorLines (7.5s) with LeftSideSVG and RightSideSVG animating on top of it
 * 5. After LeftSideSVG and RightSideSVG appear, show LeftTextReveal and RightTextReveal on top of them
 *
 * Fix: Ensure LeftSideSVG and RightSideSVG display and animate correctly on top of MultipleColorLines,
 *      and LeftTextReveal/RightTextReveal animate on top of the side SVGs after they appear.
 * Approach:
 * - Use a full-viewport, fixed container for the MultipleColorLines and the side SVGs.
 * - Animate the width of the side SVG wrappers from 0 to 100vw.
 * - After the side SVGs are fully shown, show the text reveal components on top.
 * - Ensure z-index stacking and pointer events allow interaction with MultipleColorLines if needed.
 */

const Hero = () => {
    const [showFirst, setShowFirst] = useState(true)
    const [showSecond, setShowSecond] = useState(false)
    const [showThird, setShowThird] = useState(false)
    const [showFourth, setShowFourth] = useState(false)
    const [showLeftSide, setShowLeftSide] = useState(false)
    const [showRightSide, setShowRightSide] = useState(false)
    const [showTextReveal, setShowTextReveal] = useState(false)
    const leftSideRef = useRef(null)
    const rightSideRef = useRef(null)

    useEffect(() => {
        // Sequence: ProgressBar -> WhiteBackgroundPage -> LogoAnimation -> MultipleColorLines (+ LeftSideSVG & RightSideSVG on top)
        const tl = gsap.timeline()
        tl.to({}, {
            duration: 3.5, onComplete: () => {
                setShowFirst(false)
                setShowSecond(true)
            }
        })
        tl.to({}, {
            duration: 0.5, onComplete: () => {
                setShowSecond(false)
                setShowThird(true)
            }
        })
        tl.to({}, {
            duration: 7.5, onComplete: () => {
                setShowThird(false)
                setShowFourth(true)
                // Start LeftSideSVG and RightSideSVG animation together with MultipleColorLines
                setShowLeftSide(true)
                setShowRightSide(true)
                // After the side SVGs are fully shown, show the text reveal
                setTimeout(() => {
                    setShowTextReveal(true)
                }, 800) // slight delay after SVGs appear, adjust as needed
            }
        })
        return () => {
            tl.kill()
        }
    }, [])

    // Animate LeftSideSVG sliding in from left to right, like a progress bar, when showLeftSide is true
    useEffect(() => {
        if (showLeftSide && leftSideRef.current) {
            gsap.fromTo(
                leftSideRef.current,
                { width: 0, opacity: 1 },
                { width: '100vw', duration: 7.5, ease: 'power2.inOut' }
            )
        }
    }, [showLeftSide])

    // Animate RightSideSVG sliding in from right to left, like a progress bar, when showRightSide is true
    useEffect(() => {
        if (showRightSide && rightSideRef.current) {
            gsap.fromTo(
                rightSideRef.current,
                { width: 0, opacity: 1 },
                { width: '100vw', duration: 7.5, ease: 'power2.inOut' }
            )
        }
    }, [showRightSide])

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
            {showFourth && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1000,
                        pointerEvents: 'none', // Let clicks pass through unless you want to block
                    }}
                >
                    {/* MultipleColorLines is the animated background */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 1,
                            pointerEvents: 'auto', // Allow interaction if needed
                        }}
                    >
                        <MultipleColorLines />
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
                                pointerEvents: 'none', // Let clicks pass through
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
                                pointerEvents: 'none', // Let clicks pass through
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
                    )}
                </div>
            )}
        </div>
    )
}

export default Hero