import React, { useState, useRef, useEffect, useMemo } from 'react'
import ProgressBar from './animations/ProgressBar'
import WhiteBackgroundPage from './animations/whitebj'
import LogoAnimation from './animations/logo'
import Multiplecolorlines from './animations/MultipleColorDiagonal'
import LeftSideSVG from './animations/leftside'
import { gsap } from 'gsap'
import RightSideSVG from './animations/rightside'
import RightTextReveal from './animations/Righttext'
import LeftTextReveal from './animations/Lefttext'
import DiagonalText from './animations/Diagonaltext'
import Model01 from './animations/Model01'
import Model02 from './animations/Model02'
import Model03 from './animations/Model03'
import Model04 from './animations/Model04'
import Model05 from './animations/Model05'
import Model06 from './animations/Model06'
import Model07 from './animations/Model07'
import Model08 from './animations/Model08'
import { getPlatformInfo, getSafeViewportHeight, getSafeViewportWidth } from '../utils/platformUtils'
import { initGSAPConfig, cleanupMobileAnimations } from '../utils/gsapConfig'

const Hero = () => {
    // Initialize GSAP for mobile optimization
    useEffect(() => {
        initGSAPConfig();
        return () => {
            cleanupMobileAnimations();
        };
    }, []);
    
    // Detect mobile for reduced animations
    const isMobile = useMemo(() => {
        return typeof window !== 'undefined' && window.innerWidth <= 768;
    }, []);
    
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

    // Show models after both text reveals
    const [showModels, setShowModels] = useState(false)

    // Individual model display states
    const [showModel08, setShowModel08] = useState(false)
    const [showModel01, setShowModel01] = useState(false)
    const [showModel05, setShowModel05] = useState(false)
    const [showModel04, setShowModel04] = useState(false)
    const [showModel03, setShowModel03] = useState(false)
    const [showModel02, setShowModel02] = useState(false)
    const [showModel06, setShowModel06] = useState(false)
    const [showModel07, setShowModel07] = useState(false)

    const leftSideRef = useRef(null)
    const rightSideRef = useRef(null)
    const leftTextRef = useRef(null)
    const rightTextRef = useRef(null)

    // Animation sequence - optimized for mobile
    useEffect(() => {
        const platformInfo = getPlatformInfo()
        const tl = gsap.timeline()
        
        // Mobile timing optimizations
        const timingMultiplier = isMobile ? 0.7 : (platformInfo.isMac ? 0.95 : 1)
        
        // 1. ProgressBar - reduced duration on mobile
        tl.to({}, {
            duration: (isMobile ? 2.5 : 3.7) * timingMultiplier, onComplete: () => {
                setShowFirst(false)
                setShowSecond(true)
            }
        })
        // 2. WhiteBackgroundPage
        tl.to({}, {
            duration: isMobile ? 0.3 : 0.5, onComplete: () => {
                setShowSecond(false)
                setShowThird(true)
            }
        })
        // 3. LogoAnimation - reduced duration on mobile
        tl.to({}, {
            duration: isMobile ? 2.5 : 4, onComplete: () => {
                setShowThird(false)
                setShowMultiColor(true)
                setMultiColorPhase('progress')
            }
        })
        // 4a. MultipleColorLines progress - faster on mobile
        tl.to({}, {
            duration: isMobile ? 1.2 : 2.0, onComplete: () => {
                setMultiColorPhase('sides')
                setShowSides(true)
            }
        })
        
        // Skip some animations on mobile for performance
        if (!isMobile) {
            // 4b. LeftSideSVG appears
            tl.to({}, {
                duration: 2, onComplete: () => {
                    setShowLeftSide(true)
                }
            })
            // LeftSideSVG slides in
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
                    setShowModels(true)
                }
            })
        } else {
            // Simplified mobile sequence
            tl.to({}, {
                duration: 1, onComplete: () => {
                    setShowLeftSide(true)
                    setShowRightSide(true)
                    setShowLeftText(true)
                    setShowRightText(true)
                    setMultiColorPhase('text')
                    setShowModels(true)
                }
            })
        }
        
        return () => {
            tl.kill()
        }
    }, [isMobile])

    // Animate LeftSideSVG sliding in from left to right, when showLeftSide is true
    useEffect(() => {
        if (showLeftSide && leftSideRef.current) {
            gsap.fromTo(
                leftSideRef.current,
                { width: 0, opacity: 1 },
                { width: getSafeViewportWidth(), duration: 0.8, ease: 'power2.inOut' }
            )
        }
    }, [showLeftSide])

    // Animate RightSideSVG sliding in from right to left, when showRightSide is true
    useEffect(() => {
        if (showRightSide && rightSideRef.current) {
            gsap.fromTo(
                rightSideRef.current,
                { width: 0, opacity: 1 },
                { width: getSafeViewportWidth(), duration: 0.8, ease: 'power2.inOut' }
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

    // Show models - optimized for mobile
    useEffect(() => {
        let timers = []
        if (showModels) {
            // Mobile: show fewer models simultaneously, longer delays
            const delay = isMobile ? 100 : 40;
            const modelOrder = isMobile 
                ? [setShowModel08, setShowModel01, setShowModel05, setShowModel04] // Only show 4 models on mobile
                : [setShowModel08, setShowModel01, setShowModel05, setShowModel04, setShowModel03, setShowModel02, setShowModel06, setShowModel07];
            
            modelOrder.forEach((setModel, index) => {
                timers.push(setTimeout(() => setModel(true), index * delay));
            });
        } else {
            setShowModel08(false)
            setShowModel01(false)
            setShowModel05(false)
            setShowModel04(false)
            setShowModel03(false)
            setShowModel02(false)
            setShowModel06(false)
            setShowModel07(false)
        }
        return () => {
            timers.forEach(clearTimeout)
        }
    }, [showModels, isMobile])

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
            {/* MultipleColorLines and DiagonalText full page */}
            {showMultiColor && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: getSafeViewportWidth(),
                        height: getSafeViewportHeight(),
                        zIndex: 1000,
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: getSafeViewportWidth(),
                            height: getSafeViewportHeight(),
                            zIndex: 1,
                            pointerEvents: 'auto',
                        }}
                    >
                        <Multiplecolorlines phase={multiColorPhase} />
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
                        width: getSafeViewportWidth(),
                        height: getSafeViewportHeight(),
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
                            width: getSafeViewportWidth(),
                            height: getSafeViewportHeight(),
                            zIndex: 1,
                            pointerEvents: 'auto',
                        }}
                    >
                        <Multiplecolorlines phase={multiColorPhase} />
                    </div>
                    {/* DiagonalText stays permanently on top of everything */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: getSafeViewportWidth(),
                            height: getSafeViewportHeight(),
                            zIndex: 2,
                            pointerEvents: 'none',
                        }}
                    >
                        <DiagonalText />
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
                                height: getSafeViewportHeight(),
                                overflow: 'hidden',
                                zIndex: 3,
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
                                        zIndex: 4,
                                        pointerEvents: 'none',
                                        opacity: 0,
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
                                height: getSafeViewportHeight(),
                                overflow: 'hidden',
                                zIndex: 3,
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
                                        zIndex: 4,
                                        pointerEvents: 'none',
                                        opacity: 0,
                                    }}
                                >
                                    <RightTextReveal />
                                </div>
                            )}
                        </div>
                    )}
                    {/* Show models - reduced on mobile */}
                    {showModels && (
                        <div>
                            {showModel08 && <Model08 />}
                            {showModel01 && <Model01 />}
                            {showModel05 && <Model05 />}
                            {showModel04 && <Model04 />}
                            {!isMobile && showModel03 && <Model03 />}
                            {!isMobile && showModel02 && <Model02 />}
                            {!isMobile && showModel06 && <Model06 />}
                            {!isMobile && showModel07 && <Model07 />}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Hero