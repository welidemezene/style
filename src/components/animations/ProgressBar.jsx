import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const ProgressBar = () => {
    const barRef = useRef(null)
    const percentTextRef = useRef(null)
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        // We'll use a single GSAP timeline to synchronize all animations
        const percentObj = { value: 0 }
        const textWidth = percentTextRef.current ? percentTextRef.current.offsetWidth : 60

        const tl = gsap.timeline()

        // Animate bar width and percent value together (duration: 3s)
        tl.to(barRef.current, { width: '94%', duration: 3, ease: 'power2.inOut' }, 0.1)
        tl.to(percentObj, {
            value: 100,
            duration: 3,
            ease: 'power2.inOut',
            onUpdate: () => setPercent(Math.round(percentObj.value))
        }, 0.1)
        // Animate percent text position: start after 0.3s delay, animate faster (duration: 2.2s)
        tl.fromTo(
            percentTextRef.current,
            { left: '0%' },
            {
                left: `calc(96% - ${textWidth}px)`,
                duration: 3,
                ease: 'power2.inOut'
            },
            0.2// delay start of percent text movement
        )

        return () => {
            tl.kill()
        }
    }, [])


    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-white"
            style={{
                margin: 0,
                padding: 0,
                overflowX: 'hidden', // Prevent horizontal overflow
            }}
        >
            <div style={{ marginright: '40px' }}></div>
            <div
                className="w-full flex items-center"
                style={{
                    position: 'relative',
                    margin: 0,
                    padding: 0,
                    // overflowX: 'hidden', // Prevent horizontal overflow on inner container too
                }}
            >
                {/* Progress Bar Container */}
                <div
                    className="bg-white rounded-full overflow-hidden"
                    style={{
                        width: '100%',
                        height: '6px',
                        marginLeft: 0,
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
                            background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%)',
                            transition: 'width 0.2s'
                        }}
                    ></div>
                </div>
                {/* Percentage Counter */}
                <span
                    ref={percentTextRef}
                    className="text-lg font-semibold ml-4 flex items-center"
                    style={{
                        background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto 0',
                        height: 'fit-content',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >

                    {percent}%
                </span>
            </div>
        </div >
    )
}

export default ProgressBar
