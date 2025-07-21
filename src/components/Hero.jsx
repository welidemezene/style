import React, { useState, useRef, useEffect } from 'react'
import ProgressBar from './animations/ProgressBar'
import WhiteBackgroundPage from './animations/whitebj'
import LogoAnimation from './animations/logo'
import MultipleColorLines from './animations/multiplecolor'
// import LeftSideSVG from './animations/leftside'
import { gsap } from 'gsap'
// import RightSideSVG from './animations/rightside'

/**
 * This component orchestrates a sequence of animations:
 * 1. ProgressBar (3.5s)
 * 2. WhiteBackgroundPage (0.5s)
 * 3. LogoAnimation (3.5s)
 * 4. MultipleColorLines (3.5s) with LeftSideSVG and RightSideSVG animating on top of it
 */

const Hero = () => {
    const [showFirst, setShowFirst] = useState(true)
    const [showSecond, setShowSecond] = useState(false)
    const [showThird, setShowThird] = useState(false)
    const [showFourth, setShowFourth] = useState(false)
    // const [showLeftSide, setShowLeftSide] = useState(false)
    // const [showRightSide, setShowRightSide] = useState(false)
    // const leftSideRef = useRef(null)
    // const rightSideRef = useRef(null)

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
                // setShowLeftSide(true)
                // setShowRightSide(true)
            }
        })
        return () => {
            tl.kill()
        }
    }, [])

    // Animate LeftSideSVG sliding in from left to right, like a progress bar, when showLeftSide is true
    /*
    useEffect(() => {
        if (showLeftSide && leftSideRef.current) {
            // Start with width 0, animate to 100% over 3.5s
            gsap.fromTo(
                leftSideRef.current,
                { width: 0, opacity: 1, overflow: 'hidden' },
                { width: '100%', duration: 3.5, ease: 'power2.inOut' }
            )
        }
    }, [showLeftSide])
    */

    // Animate RightSideSVG sliding in from right to left, like a progress bar, when showRightSide is true
    /*
    useEffect(() => {
        if (showRightSide && rightSideRef.current) {
            // Start with width 0, animate to 100% over 3.5s
            gsap.fromTo(
                rightSideRef.current,
                { width: 0, opacity: 1, overflow: 'hidden' },
                { width: '100%', duration: 3.5, ease: 'power2.inOut' }
            )
        }
    }, [showRightSide])
    */

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
                <div style={{ position: 'relative', width: '100%' }}>
                    <MultipleColorLines />
                    {/* 
                    {showLeftSide && (
                        <div
                            ref={leftSideRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: 0,
                                height: '100%',
                                overflow: 'hidden',
                                pointerEvents: 'none', // Let clicks pass through to MultipleColorLines
                                zIndex: 2,
                                transition: 'width 0.3s',
                            }}
                        >
                            <LeftSideSVG />
                        </div>
                    )}
                    {showRightSide && (
                        <div
                            ref={rightSideRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 0,
                                height: '100%',
                                overflow: 'hidden',
                                pointerEvents: 'none', // Let clicks pass through to MultipleColorLines
                                zIndex: 2,
                                transition: 'width 0.3s',
                            }}
                        >
                            <RightSideSVG />
                        </div>
                    )}
                    */}
                </div>
            )}
        </div>
    )
}

export default Hero