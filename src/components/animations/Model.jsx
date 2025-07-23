import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../styles/Model.css';

import model01 from '../../images/model_01.png';
import model02 from '../../images/model_02.png';
import model03 from '../../images/model_03.png';
import model04 from '../../images/model_04.png';
import model05 from '../../images/model_05.png';
import model06 from '../../images/model_06.png';
import model07 from '../../images/model_07.png';
import model08 from '../../images/model_08.png';

const images = [
    model01,
    model02,
    model03,
    model04,
    model05,
    model06,
    model07,
    model08,
];

const Model = () => {
    // Create refs for each image wrapper
    const imageRefs = useRef([]);

    useEffect(() => {
        // Animate each image in one by one using GSAP
        if (imageRefs.current.length) {
            gsap.set(imageRefs.current, { opacity: 0, y: 40 });
            gsap.to(imageRefs.current, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                stagger: 0.18,
                delay: 0.2,
            });
        }
    }, []);

    return (
        <div
            className="model-grid"
            tabIndex={-1}
            aria-label="Model grid"
            style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                boxSizing: 'border-box',
            }}
        >
            {images.map((src, idx) => (
                <div
                    className="model-image-wrapper"
                    key={idx}
                    tabIndex={0}
                    aria-label={`Model ${idx + 1}`}
                    ref={el => (imageRefs.current[idx] = el)}
                    style={{
                        width: '100%',
                        maxWidth: '240px',
                        minWidth: '120px',
                        minHeight: '180px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={src}
                        alt={`Model ${idx + 1}`}
                        className="model-image"
                        loading="lazy"
                        draggable={false}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '220px',
                            maxHeight: '320px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            background: '#fff',
                            display: 'block',
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Model;
