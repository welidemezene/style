import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import model01 from '../../images/model_01.png';
import { getPlatformInfo, getPlatformAdjustments, getResponsiveBreakpoint, getOptimizedTransform } from '../../utils/platformUtils';


// Helper to get device type
const getDeviceType = () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 600) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
};

const getResponsiveStyles = (device, windowWidth, windowHeight) => {
    const platformInfo = getPlatformInfo();
    const platformAdjustments = getPlatformAdjustments(windowWidth);
    const currentAdjustment = platformAdjustments[device] || platformAdjustments.desktop;
    
    // Calculate responsive positions based on viewport percentage instead of fixed pixels
    const getResponsivePosition = (baseConfig) => {
        const { position, size, rotation } = baseConfig;
        
        return {
            container: {
                position: 'absolute',
                left: position.left,
                top: position.top,
                bottom: position.bottom,
                transform: `translate(${currentAdjustment.translateX}px, ${currentAdjustment.translateY}px)`,
                zIndex: 2,
                pointerEvents: 'auto',
            },
            img: {
                ...getOptimizedTransform({
                    rotate: rotation,
                    scale: currentAdjustment.scale,
                }),
                width: size.width,
                height: size.height,
                objectFit: 'cover',
                borderRadius: '12px',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                // Mac-specific smoothing
                ...(platformInfo.isMac && {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                }),
            },
        };
    };

    switch (device) {
        case 'mobile':
            return getResponsivePosition({
                position: { 
                    left: `${Math.min(50, windowWidth * 0.08)}px`,
                    top: '0px' 
                },
                size: { width: '120px', height: '180px' },
                rotation: -10,
            });
        case 'tablet':
            return getResponsivePosition({
                position: { 
                    left: '0px',
                    top: `${Math.max(-50, -windowHeight * 0.07)}px` 
                },
                size: { width: '170px', height: '250px' },
                rotation: -9,
            });
        case 'desktop':
        default:
            return getResponsivePosition({
                position: { 
                    left: `${Math.min(800, windowWidth * 0.59)}px`,
                    bottom: `${Math.max(-70, -windowHeight * 0.09)}px` 
                },
                size: { width: '220px', height: '320px' },
                rotation: 5,
            });
    }
};

const Model01 = () => {
    const imgRef = useRef(null);
    const [device, setDevice] = useState(getDeviceType());
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        // Listen for resize to update device type and window size
        const handleResize = () => {
            setDevice(getDeviceType());
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!imgRef.current) return;

        const platformInfo = getPlatformInfo();
        
        // Optimize animation for WebKit/Mac
        const vibrationIntensity = platformInfo.isMac ? 0.8 : 1;
        const animationDuration = platformInfo.isWebKit ? 0.06 : 0.07;

        // Vibrate and blur animation ONCE, then return to original image
        const tl = gsap.timeline();
        
        // Set initial state for better performance on Mac
        gsap.set(imgRef.current, {
            force3D: true,
            ...(platformInfo.isWebKit && { 
                WebkitBackfaceVisibility: 'hidden',
                WebkitPerspective: 1000,
            }),
        });

        tl.to(imgRef.current, {
            x: 6 * vibrationIntensity,
            y: -7 * vibrationIntensity,
            filter: 'blur(2.5px)',
            duration: animationDuration,
            ease: 'power1.inOut',
        })
            .to(imgRef.current, {
                x: -4 * vibrationIntensity,
                y: 3 * vibrationIntensity,
                filter: 'blur(2.5px)',
                duration: animationDuration,
                ease: 'power1.inOut',
            })
            .to(imgRef.current, {
                x: 2 * vibrationIntensity,
                y: -2 * vibrationIntensity,
                filter: 'blur(1.5px)',
                duration: animationDuration,
                ease: 'power1.inOut',
            })
            .to(imgRef.current, {
                x: 0,
                y: 0,
                filter: 'blur(0px)',
                duration: animationDuration,
                ease: 'power1.inOut',
            });

        return () => {
            tl.kill();
            if (imgRef.current) {
                gsap.set(imgRef.current, { x: 0, y: 0, filter: 'blur(0px)' });
            }
        };
    }, []);

    const styles = getResponsiveStyles(device, windowSize.width, windowSize.height);

    return (
        <div style={styles.container}>
            <img
                ref={imgRef}
                src={model01}
                alt="Model"
                style={styles.img}
                loading="lazy"
                draggable={false}
            />
        </div>
    );
};

export default Model01;
