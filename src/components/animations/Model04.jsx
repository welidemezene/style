import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import model01 from '../../images/model_04.png';

// Helper to get responsive style values
const getResponsiveStyles = () => {
    if (typeof window === 'undefined') {
        // Default to desktop
        return {
            container: {
                position: 'absolute',
                bottom: '-100px',
                right: '0px',
                zIndex: 2,
                pointerEvents: 'auto',
            },
            img: {
                width: '220px',
                height: '320px',
                transform: 'rotate(5deg)',
            },
        };
    }
    const width = window.innerWidth;
    // Mobile: < 600px, Tablet: 600-1024px, Desktop: > 1024px
    if (width < 600) {
        // Mobile
        return {
            container: {
                position: 'absolute',
                bottom: '20px',
                right: '60px',
                // left: '50%',
                transform: 'translateX(50%)',
                zIndex: 2,
                pointerEvents: 'auto',
            },
            img: {
                width: '120px',
                height: '180px',
                transform: 'rotate(-10deg)',
            },
        };
    } else if (width < 1024) {
        // Tablet
        return {
            container: {
                position: 'absolute',
                bottom: '-60px',
                right: '20px',
                zIndex: 2,
                pointerEvents: 'auto',
            },
            img: {
                width: '170px',
                height: '250px',
                transform: 'rotate(2deg)',
            },
        };
    } else {
        // Desktop
        return {
            container: {
                position: 'absolute',
                bottom: '-100px',
                right: '0px',
                zIndex: 2,
                pointerEvents: 'auto',
            },
            img: {
                width: '220px',
                height: '320px',
                transform: 'rotate(5deg)',
            },
        };
    }
};

const Model04 = () => {
    const imgRef = useRef(null);
    const [responsiveStyles, setResponsiveStyles] = React.useState(getResponsiveStyles());

    // Update styles on resize
    React.useEffect(() => {
        const handleResize = () => {
            setResponsiveStyles(getResponsiveStyles());
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
    }, []);

    return (
        <div
            style={{
                ...responsiveStyles.container,
            }}
        >
            <img
                ref={imgRef}
                src={model01}
                alt="Model"
                style={{
                    ...responsiveStyles.img,
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    willChange: 'transform, filter',
                }}
                loading="lazy"
                draggable={false}
            />
        </div>
    );
};

export default Model04;
