import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const ProgressBar = () => {
    const barRef = useRef(null)
    const percentTextRef = useRef(null)
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
        // Responsive values
        const barTargetWidth = isMobile ? '85%' : '94%'
        const percentTextTargetLeft = (textWidth) => isMobile
            ? `calc(92% - ${textWidth}px)`
            : `calc(96% - ${textWidth}px)`

        const percentObj = { value: 0 }
        const textWidth = percentTextRef.current ? percentTextRef.current.offsetWidth : 60

        const tl = gsap.timeline()

        // Animate bar width and percent value together (duration: 3s)
        tl.to(barRef.current, {
            width: barTargetWidth,
            duration: 3,
            ease: 'power2.inOut'
        }, 0.1)
        tl.to(percentObj, {
            value: 100,
            duration: 3,
            ease: 'power2.inOut',
            onUpdate: () => setPercent(Math.round(percentObj.value))
        }, 0.1)
        // Animate percent text position responsively
        tl.fromTo(
            percentTextRef.current,
            { left: '0%' },
            {
                left: percentTextTargetLeft(textWidth),
                duration: 3,
                ease: 'power2.inOut'
            },
            0.2
        )

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
                className="w-full flex items-center"
                style={{
                    position: 'relative',
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Progress Bar Container */}
                <div
                    className="bg-white rounded-full overflow-hidden"
                    style={{
                        width: '100%',
                        height: isMobile ? '4px' : '6px',
                        margin: 0,
                        padding: 0,
                        position: 'relative'
                    }}
                >

                    <div
                        ref={barRef}
                        className="rounded-full"
                        style={{
                            height: '100%',
                            width: '0%',
                            background: 'linear-gradient(270deg, #F5DB47 0.01%, #EA5F6B 46%, #1274BC 99.99%)',
                            transition: 'width 0.2s',
                            margin: 0,
                            padding: 0,
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
                    }}
                >
                    {percent}%
                </span>
            </div>
        </div>
    )
}

export default ProgressBar
