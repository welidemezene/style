import React, { useState, useRef, useEffect } from 'react'
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
import Heropage from '../images/deskl.png'
import Iphone from '../images/iphl.png'
import Ipad from '../images/tabl.png'

const Hero = () => {
    // Animation step states
    const [showFirst, setShowFirst] = useState(true)
    const [showSecond, setShowSecond] = useState(false)
    const [showThird, setShowThird] = useState(false)
    const [showMultiColor, setShowMultiColor] = useState(false)
    const [showSides, setShowSides] = useState(false)
    const [multiColorPhase, setMultiColorPhase] = useState('none')
    const [showLeftSide, setShowLeftSide] = useState(false)
    const [showRightSide, setShowRightSide] = useState(false)
    const [showLeftText, setShowLeftText] = useState(false)
    const [showRightText, setShowRightText] = useState(false)
    const [showModels, setShowModels] = useState(false)
    const [showModel08, setShowModel08] = useState(false)
    const [showModel01, setShowModel01] = useState(false)
    const [showModel05, setShowModel05] = useState(false)
    const [showModel04, setShowModel04] = useState(false)
    const [showModel03, setShowModel03] = useState(false)
    const [showModel02, setShowModel02] = useState(false)
    const [showModel06, setShowModel06] = useState(false)
    const [showModel07, setShowModel07] = useState(false)
    const [animationFinished, setAnimationFinished] = useState(false)

    const leftSideRef = useRef(null)
    const rightSideRef = useRef(null)
    const leftTextRef = useRef(null)
    const rightTextRef = useRef(null)
    const heroContainerRef = useRef(null)

    // Responsive background image state
    const [bgImage, setBgImage] = useState(Heropage)

    // Check if mobile for animation optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600

    // Responsive background image logic
    useEffect(() => {
        function updateBgImage() {
            const width = window.innerWidth
            if (width <= 600) {
                setBgImage(Iphone)
            } else if (width <= 1024) {
                setBgImage(Ipad)
            } else {
                setBgImage(Heropage)
            }
        }
        updateBgImage()
        window.addEventListener('resize', updateBgImage)
        return () => window.removeEventListener('resize', updateBgImage)
    }, [])

    // Animation sequence with mobile optimization
    useEffect(() => {
        // Store original overflow value
        const originalOverflow = document.body.style.overflow

        // Prevent scroll only during animation
        if (heroContainerRef.current) {
            heroContainerRef.current.style.overflow = 'hidden'
        }

        // Mobile-optimized animation durations
        const durations = isMobile ? {
            first: 3.5,    // Reduced from 3.7
            second: 0.3,   // Reduced from 0.5
            third: 3.7,    // Reduced from 4.0
            multiColor: 1.6, // Reduced from 2.0
            sides: 1.4,    // Reduced from 2.0
            leftSide: 0.6, // Reduced from 0.8
            rightSide: 0.6, // Reduced from 0.8
            leftText: 0.3, // Reduced from 0.4
            rightText: 0.3, // Reduced from 0.4
            models: 0.5    // Reduced from 0.61
        } : {
            first: 3.7,
            second: 0.5,
            third: 4.0,
            multiColor: 2.0,
            sides: 2.0,
            leftSide: 0.8,
            rightSide: 0.8,
            leftText: 0.4,
            rightText: 0.4,
            models: 0.61
        }

        const tl = gsap.timeline()
        tl.to({}, {
            duration: durations.first, onComplete: () => {
                setShowFirst(false)
                setShowSecond(true)
            }
        })
        tl.to({}, {
            duration: durations.second, onComplete: () => {
                setShowSecond(false)
                setShowThird(true)
            }
        })
        tl.to({}, {
            duration: durations.third, onComplete: () => {
                setShowThird(false)
                setShowMultiColor(true)
                setMultiColorPhase('progress')
            }
        })
        tl.to({}, {
            duration: durations.multiColor, onComplete: () => {
                setMultiColorPhase('sides')
                setShowSides(true)
            }
        })
        tl.to({}, {
            duration: durations.sides, onComplete: () => setShowLeftSide(true)
        })
        tl.to({}, {
            duration: durations.leftSide, onComplete: () => setShowRightSide(true)
        })
        tl.to({}, {
            duration: durations.rightSide, onComplete: () => setShowLeftText(true)
        })
        tl.to({}, {
            duration: durations.leftText, onComplete: () => setShowRightText(true)
        })
        tl.to({}, {
            duration: durations.rightText, onComplete: () => {
                setMultiColorPhase('text')
                setShowModels(true)
                // Do NOT enable scroll yet, wait until models are shown
                setTimeout(() => {
                    setAnimationFinished(true)
                    // Restore original overflow after animation is finished
                    if (heroContainerRef.current) {
                        heroContainerRef.current.style.overflow = originalOverflow || ''
                    }
                }, durations.models * 1000)
            }
        })
        return () => {
            tl.kill()
            // Restore original overflow on cleanup
            if (heroContainerRef.current) {
                heroContainerRef.current.style.overflow = originalOverflow || ''
            }
        }
    }, [isMobile])

    // Animate LeftSideSVG sliding in with mobile optimization
    useEffect(() => {
        if (showLeftSide && leftSideRef.current) {
            const duration = isMobile ? 0.6 : 0.8
            gsap.fromTo(
                leftSideRef.current,
                { width: 0, opacity: 1 },
                {
                    width: '100vw',
                    duration: duration,
                    ease: 'power2.inOut',
                    ...(isMobile && { force3D: true })
                }
            )
        }
    }, [showLeftSide, isMobile])

    // Animate RightSideSVG sliding in with mobile optimization
    useEffect(() => {
        if (showRightSide && rightSideRef.current) {
            const duration = isMobile ? 0.6 : 0.8
            gsap.fromTo(
                rightSideRef.current,
                { width: 0, opacity: 1 },
                {
                    width: '100vw',
                    duration: duration,
                    ease: 'power2.inOut',
                    ...(isMobile && { force3D: true })
                }
            )
        }
    }, [showRightSide, isMobile])

    // Fade in LeftTextReveal with mobile optimization
    useEffect(() => {
        if (showLeftText && leftTextRef.current) {
            const duration = isMobile ? 0.3 : 0.4
            gsap.fromTo(
                leftTextRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: duration,
                    ease: 'power2.inOut',
                    ...(isMobile && { force3D: true })
                }
            )
        }
    }, [showLeftText, isMobile])

    // Fade in RightTextReveal with mobile optimization
    useEffect(() => {
        if (showRightText && rightTextRef.current) {
            const duration = isMobile ? 0.3 : 0.4
            gsap.fromTo(
                rightTextRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: duration,
                    ease: 'power2.inOut',
                    ...(isMobile && { force3D: true })
                }
            )
        }
    }, [showRightText, isMobile])

    // Show each model with a different delay (optimized for mobile)
    useEffect(() => {
        let timers = []
        if (showModels) {
            const delay = isMobile ? 30 : 40 // Reduced delay for mobile
            timers.push(setTimeout(() => setShowModel08(true), 0))
            timers.push(setTimeout(() => setShowModel01(true), delay))
            timers.push(setTimeout(() => setShowModel05(true), delay * 2))
            timers.push(setTimeout(() => setShowModel04(true), delay * 3))
            timers.push(setTimeout(() => setShowModel03(true), delay * 4))
            timers.push(setTimeout(() => setShowModel02(true), delay * 5))
            timers.push(setTimeout(() => setShowModel06(true), delay * 6))
            timers.push(setTimeout(() => setShowModel07(true), delay * 7))
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

    // Use scrollable page with imported image as background after animation
    return (
        <div
            ref={heroContainerRef}
            className={`hero-container mobile-safe-height mobile-touch-optimized ${isMobile ? 'mobile-container' : ''}`}
            style={{
                minHeight: '100vh',
                position: 'relative',
                width: '100%',
                background: animationFinished
                    ? `url(${bgImage}) center center / cover no-repeat`
                    : undefined,
                transition: 'background 0.6s',
                // Prevent scroll on the main container as a fallback
                overflow: animationFinished ? undefined : 'hidden',
            }}
        >
            {/* Animation overlays */}
            {!(animationFinished) && (showFirst || showSecond || showThird || showMultiColor || showSides || showModels) && (
                <>
                    {showFirst && (
                        <div className={`hero-animation-layer ${isMobile ? 'mobile-optimized-animation' : ''}`}>
                            <ProgressBar />
                        </div>
                    )}
                    {showSecond && (
                        <div className={`hero-animation-layer ${isMobile ? 'mobile-optimized-animation' : ''}`}>
                            <WhiteBackgroundPage />
                        </div>
                    )}
                    {showThird && (
                        <div className={`hero-animation-layer ${isMobile ? 'mobile-optimized-animation' : ''}`}>
                            <LogoAnimation />
                        </div>
                    )}
                    {showMultiColor && (
                        <div
                            className={`hero-multicolor-layer ${isMobile ? 'mobile-fixed-element mobile-optimized-animation' : ''}`}
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
                                <Multiplecolorlines phase={multiColorPhase} />
                            </div>
                        </div>
                    )}
                    {showSides && (
                        <div
                            className={`hero-sides-layer ${isMobile ? 'mobile-fixed-element mobile-optimized-animation' : ''}`}
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
                                <Multiplecolorlines phase={multiColorPhase} />
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100vw',
                                    height: '100vh',
                                    zIndex: 2,
                                    pointerEvents: 'none',
                                }}
                            >
                                <DiagonalText />
                            </div>
                            {showLeftSide && (
                                <div
                                    ref={leftSideRef}
                                    className={`hero-left-side ${isMobile ? 'mobile-optimized-animation' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: 0,
                                        height: '100vh',
                                        overflow: 'hidden',
                                        zIndex: 3,
                                        pointerEvents: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <LeftSideSVG />
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
                            {showRightSide && (
                                <div
                                    ref={rightSideRef}
                                    className={`hero-right-side ${isMobile ? 'mobile-optimized-animation' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: 0,
                                        height: '100vh',
                                        overflow: 'hidden',
                                        zIndex: 3,
                                        pointerEvents: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <RightSideSVG />
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
                            {showModels && (
                                <div className={`hero-models-container ${isMobile ? 'mobile-optimized-animation' : ''}`}>
                                    {showModel08 && <Model08 />}
                                    {showModel01 && <Model01 />}
                                    {showModel05 && <Model05 />}
                                    {showModel04 && <Model04 />}
                                    {showModel03 && <Model03 />}
                                    {showModel02 && <Model02 />}
                                    {showModel06 && <Model06 />}
                                    {showModel07 && <Model07 />}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
            {/* After animation, render a scroll anchor to next page */}
            {animationFinished && (
                <div style={{ width: '100%', height: '1px' }} tabIndex={-1} aria-hidden="true"></div>
            )}

            {/* Scoped styles for Hero component */}
            <style>
                {`
                    .hero-container {
                        width: 100%;
                        min-height: 100vh;
                        position: relative;
                        overflow-x: hidden;
                    }
                    
                    .hero-animation-layer {
                        position: relative;
                        width: 100%;
                        height: 100vh;
                    }
                    
                    .hero-multicolor-layer,
                    .hero-sides-layer {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        pointer-events: none;
                    }
                    
                    .hero-left-side,
                    .hero-right-side {
                        position: absolute;
                        top: 0;
                        height: 100vh;
                        overflow: hidden;
                        pointer-events: none;
                        display: flex;
                        align-items: center;
                    }
                    
                    .hero-models-container {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                    
                    /* Mobile-specific optimizations */
                    @media (max-width: 600px) {
                        .hero-container {
                            min-height: 100vh;
                            height: 100vh;
                            overflow: hidden;
                        }
                        
                        .hero-animation-layer {
                            height: 100vh;
                        }
                        
                        .hero-multicolor-layer,
                        .hero-sides-layer {
                            width: 100vw;
                            height: 100vh;
                        }
                        
                        .hero-left-side,
                        .hero-right-side {
                            height: 100vh;
                        }
                    }
                `}
            </style>
        </div>
    )
}

export default Hero