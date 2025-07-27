import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import model01 from '../../images/model_01.png';
import { mobileOptimizedTo } from '../../utils/gsapConfig';


// Helper to get device type
const getDeviceType = () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 600) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
};

const getResponsiveStyles = (device) => {
    // Position, angle, and size for each device
    switch (device) {
        case 'mobile':
            return {
                container: {
                    position: 'absolute',
                    left: '80px',
                    top: '0px',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '150px', // Reduced size for mobile
                    height: '195px',
                    transform: 'rotate(0deg)',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    willChange: 'transform, filter',
                },
            };
        case 'tablet':
            return {
                container: {
                    position: 'absolute',
                    left: '180px',
                top: '250px',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '270px',
                    height: '350px',
                    transform: 'rotate(0deg)',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    willChange: 'transform, filter',
                },
            };
        case 'desktop':
        default:
            return {
                container: {
                    position: 'absolute',
                    left: '900px',
                    bottom: '65px',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '320px',
                    height: '420px',
                    transform: 'rotate(0deg)',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    willChange: 'transform, filter',
                },
            };
    }
};

const Model01 = () => {
    const imgRef = useRef(null);
    const [device, setDevice] = useState(getDeviceType());

    useEffect(() => {
        // Listen for resize to update device type
        const handleResize = () => {
            setDevice(getDeviceType());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!imgRef.current) return;

        const isMobile = window.innerWidth <= 768;
        
        // Simplified animation for mobile performance
        if (isMobile) {
            // Simple fade-in for mobile
            mobileOptimizedTo(imgRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
            });
        } else {
            // Full vibrate and blur animation for desktop
            const tl = gsap.timeline();
            tl.to(imgRef.current, {
                x: 6,
                y: -7,
                filter: 'blur(2.5px)',
                duration: 0.07,
                ease: 'power1.inOut',
            })
                .to(imgRef.current, {
                    x: -4,
                    y: 3,
                    filter: 'blur(2.5px)',
                    duration: 0.07,
                    ease: 'power1.inOut',
                })
                .to(imgRef.current, {
                    x: 2,
                    y: -2,
                    filter: 'blur(1.5px)',
                    duration: 0.07,
                    ease: 'power1.inOut',
                })
                .to(imgRef.current, {
                    x: 0,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.07,
                    ease: 'power1.inOut',
                });
                
            return () => {
                tl.kill();
            };
        }

        return () => {
            if (imgRef.current) {
                gsap.set(imgRef.current, { x: 0, y: 0, filter: 'blur(0px)', opacity: 1 });
            }
        };
    }, []);

    const styles = getResponsiveStyles(device);

    return (
        <div style={styles.container}>
            <img
                ref={imgRef}
                src={model01}
                alt="Model"
                style={{
                    ...styles.img,
                    opacity: window.innerWidth <= 768 ? 0 : 1, // Start hidden on mobile
                }}
                loading="lazy"
                draggable={false}
                decoding="async"
            />
        </div>
    );
};

export default Model01;
