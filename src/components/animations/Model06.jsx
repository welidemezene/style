import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import model01 from '../../images/model_06.png';

// Helper to get device type
const getDeviceType = () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1200) return 'tablet';
    return 'desktop';
};

const getStylesByDevice = (device) => {
    // You can adjust these values as needed for your design
    switch (device) {
        case 'mobile':
            return {
                container: {
                    position: 'absolute',
                    top: '-16px',
                    right: '-80px',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '200px',
                    height: '260px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    transform: 'rotate(0deg)',
                    willChange: 'transform, filter',
                },
            };
        case 'tablet':
            return {
                container: {
                    position: 'absolute',
                    top: '-50px',
                    left: '50vw',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '280px',
                    height: '360px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    transform: 'rotate(0deg)',
                    willChange: 'transform, filter',
                },
            };
        case 'desktop':
        default:
            return {
                container: {
                    position: 'absolute',
                    top: '-70px',
                    left: '980px',
                    zIndex: 2,
                    pointerEvents: 'auto',
                },
                img: {
                    width: '320px',
                    height: '420px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    transform: 'rotate(0deg)',
                    willChange: 'transform, filter',
                },
            };
    }
};

const Model06 = () => {
    const imgRef = useRef(null);
    const [device, setDevice] = useState(getDeviceType());

    useEffect(() => {
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

    const styles = getStylesByDevice(device);

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

export default Model06;
