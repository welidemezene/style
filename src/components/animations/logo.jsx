import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// This component animates a logo mark (circle with SVG) that pops up, shakes, slides left,
// then animates each letter of a text ("LogoType") coming up one by one from the bottom.

const LOGO_TEXT = "LogoType"

const LogoAnimation = () => {
    const containerRef = useRef(null)
    const logoMarkRef = useRef(null)
    const letterRefs = useRef([])

    // Clear refs on rerender
    letterRefs.current = []

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

        // 1. Logo mark pops up from below with a light bounce
        tl.fromTo(
            logoMarkRef.current,
            { y: 120, opacity: 0, scale: 0.8 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "bounce.out"
            }
        )

        // 2. Quick horizontal shake after appearing
        tl.to(
            logoMarkRef.current,
            {
                x: -10,
                duration: 0.08,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
            },
            "+=0.1"
        )
        tl.to(
            logoMarkRef.current,
            {
                x: 10,
                duration: 0.08,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
            }
        )
        tl.to(
            logoMarkRef.current,
            {
                x: 0,
                duration: 0.08,
                ease: "power1.inOut"
            }
        )

        // 3. Logo mark slides to left
        tl.to(
            logoMarkRef.current,
            {
                x: -60,
                duration: 0.5,
                ease: "power2.inOut"
            },
            "+=0.1"
        )

        // 4. Animate each letter of the logo text coming up from below, one by one
        letterRefs.current.forEach((ref, i) => {
            tl.fromTo(
                ref,
                {
                    y: 40,
                    opacity: 0,
                    filter: "blur(8px)"
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.32" + "+" + (i * 0.08) // Overlap with previous, but stagger
            )
        })

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: 120
                }}
            >
                {/* Logo Mark */}
                <div
                    ref={logoMarkRef}
                    style={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%)',
                        borderRadius: '50%',
                        boxShadow: '0 4px 24px 0 rgba(160,160,255,0.10)',
                        marginRight: 16,
                        fontSize: 36,
                        color: '#fff',
                        userSelect: 'none'
                    }}
                >
                    {/* Example SVG logo mark */}
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="16" fill="white" opacity="0.15" />
                        <path d="M18 8L24 28H12L18 8Z" fill="white" />
                    </svg>
                </div>
                {/* Logo Type - each letter animated separately */}
                <div
                    style={{
                        fontSize: 36,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        color: '#222',
                        whiteSpace: 'nowrap',
                        fontFamily: 'Inter, sans-serif',
                        background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {LOGO_TEXT.split('').map((char, i) => (
                        <span
                            key={i}
                            ref={el => letterRefs.current[i] = el}
                            style={{
                                display: 'inline-block',
                                opacity: 0,
                                filter: 'blur(8px)',
                                transition: 'opacity 0.2s, filter 0.2s'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LogoAnimation
