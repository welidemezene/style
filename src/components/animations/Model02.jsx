import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
// import model02 from './images/model-02.png';

const model02 = './images/model_02.png';

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
                    left: '50px',
                    bottom: '150px',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '120px',
                    height: '180px',
                    transform: 'rotate(-10deg)',
                    objectFit: 'cover',
                    borderRadius: '12px',
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
                    left: '-2vw',
                    bottom: '90px',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '170px',
                    height: '250px',
                    transform: 'rotate(-8deg)',
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
                    left: '400px',
                    bottom: '-150px',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '220px',
                    height: '320px',
                    transform: 'rotate(7deg)',
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

const Model02 = () => {
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

        // Vibrate and blur animation ONCE, then return to original image
        const tl = gsap.timeline();
        tl.to(imgRef.current, {
            x: 4,
            y: -3,
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
            if (imgRef.current) {
                gsap.set(imgRef.current, { x: 0, y: 0, filter: 'blur(0px)' });
            }
        };
    }, [device]);

    const styles = getResponsiveStyles(device);

    return (
        <div style={styles.container}>
            <img
                ref={imgRef}
                src={model02}
                alt="Model"
                style={styles.img}
                loading="lazy"
                draggable={false}
            />
        </div>
    );
};

export default Model02;
