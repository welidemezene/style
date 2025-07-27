
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getPlatformInfo, getSafeViewportHeight, getSafeViewportWidth } from '../../utils/platformUtils';

// Data for each bar: x, y, width, height, rotation, fill, stroke, strokeWidth, gradientId
const bars = [
    { x: -665, y: 264, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint0_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -650.418, y: 281.15, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint1_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -628.566, y: 306.856, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint2_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -606.711, y: 332.561, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint3_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -601.219, y: 339.022, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint4_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -586.641, y: 356.172, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint5_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -581.145, y: 362.633, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint6_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -566.566, y: 379.782, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint7_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -548.352, y: 401.207, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint8_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -526.496, y: 426.912, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint9_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -515.551, y: 439.788, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint10_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -493.695, y: 465.494, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint11_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -475.484, y: 486.918, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint12_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -464.535, y: 499.793, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint13_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -449.957, y: 516.943, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint14_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -444.465, y: 523.404, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint15_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -429.883, y: 540.554, width: 1898.45, height: 11.29, rot: -40.37, fill: 'url(#paint16_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -422.57, y: 549.156, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint17_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -407.992, y: 566.305, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint18_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -393.41, y: 583.455, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint19_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -371.555, y: 609.161, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint20_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -356.977, y: 626.311, width: 1898.45, height: 11.29, rot: -40.37, fill: 'url(#paint21_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -349.664, y: 634.913, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint22_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -335.082, y: 652.062, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint23_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -316.871, y: 673.486, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint24_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -311.375, y: 679.947, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint25_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -300.43, y: 692.823, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint26_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -289.484, y: 705.698, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint27_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -267.629, y: 731.404, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint28_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -256.684, y: 744.28, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint29_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -251.191, y: 750.741, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint30_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -240.242, y: 763.616, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint31_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -225.664, y: 780.766, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint32_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -214.719, y: 793.642, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint33_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -209.223, y: 800.103, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint34_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -194.645, y: 817.253, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint35_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -176.43, y: 838.677, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint36_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -161.852, y: 855.827, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint37_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -143.637, y: 877.25, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint38_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -138.145, y: 883.711, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint39_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -127.195, y: 896.587, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint40_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -105.344, y: 922.293, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint41_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -83.4883, y: 947.999, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint42_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -65.2734, y: 969.422, width: 1898.45, height: 11.29, rot: -40.37, fill: 'url(#paint43_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -57.9609, y: 978.024, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint44_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -39.75, y: 999.448, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint45_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -25.168, y: 1016.6, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint46_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: -3.3125, y: 1042.3, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint47_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 18.5391, y: 1068.01, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint48_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 24.0312, y: 1074.47, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint49_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 38.6133, y: 1091.62, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint50_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 44.1055, y: 1098.08, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint51_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 58.6875, y: 1115.23, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint52_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 76.8984, y: 1136.65, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint53_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 98.7539, y: 1162.36, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint54_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 109.699, y: 1175.24, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint55_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 131.555, y: 1200.94, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint56_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 149.77, y: 1222.37, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint57_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 160.715, y: 1235.24, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint58_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 175.297, y: 1252.39, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint59_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 180.789, y: 1258.85, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint60_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 195.367, y: 1276, width: 1898.45, height: 11.29, rot: -40.37, fill: 'url(#paint61_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 202.68, y: 1284.6, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint62_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 217.262, y: 1301.75, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint63_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 231.84, y: 1318.9, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint64_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 253.695, y: 1344.61, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint65_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 268.277, y: 1361.76, width: 1898.45, height: 11.29, rot: -40.37, fill: 'url(#paint66_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 275.59, y: 1370.36, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint67_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 290.168, y: 1387.51, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint68_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 308.383, y: 1408.93, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint69_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 313.875, y: 1415.4, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint70_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 324.82, y: 1428.27, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint71_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 335.77, y: 1441.15, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint72_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 357.621, y: 1466.85, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint73_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 368.57, y: 1479.73, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint74_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 374.062, y: 1486.19, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint75_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 385.008, y: 1499.06, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint76_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 399.59, y: 1516.21, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint77_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 410.535, y: 1529.09, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint78_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    { x: 416.027, y: 1535.55, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint79_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 430.609, y: 1552.7, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint80_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 448.82, y: 1574.12, width: 1898.45, height: 22.51, rot: -40.37, fill: 'url(#paint81_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 463.402, y: 1591.27, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint82_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 481.617, y: 1612.7, width: 1898.45, height: 8.48, rot: -40.37, fill: 'url(#paint83_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 487.109, y: 1619.16, width: 1898.45, height: 16.9, rot: -40.37, fill: 'url(#paint84_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 498.055, y: 1632.04, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint85_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 519.91, y: 1657.74, width: 1898.45, height: 33.74, rot: -40.37, fill: 'url(#paint86_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 541.762, y: 1683.45, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint87_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 559.977, y: 1704.87, width: 1898.45, height: 11.29, rot: -40.37, fill: 'url(#paint88_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
    // { x: 567.289, y: 1713.47, width: 1898.45, height: 28.12, rot: -40.37, fill: 'url(#paint89_linear_3499_109105)', stroke: 'white', strokeWidth: 2 },
];

const SVG_WIDTH = 1366;
const SVG_HEIGHT = 768;

const MultipleColorDiagonal = () => {
    const maskRectRefs = useRef([]);
    const [viewportSize, setViewportSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1366,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Clean up any previous animations
        gsap.killTweensOf(maskRectRefs.current);

        const platformInfo = getPlatformInfo();

        // Animate each bar for smooth, continuous, non-stacking progress
        bars.forEach((bar, i) => {
            const rect = maskRectRefs.current[i];
            if (rect) {
                // Set transform origin for scaling from left with platform optimizations
                gsap.set(rect, {
                    transformOrigin: "0% 50%",
                    scaleX: 0,
                    force3D: true,
                    ...(platformInfo.isWebKit && {
                        WebkitBackfaceVisibility: 'hidden',
                    }),
                });

                // Assign a unique duration and delay for each bar for different speeds and phase offsets
                // Adjust timing for Mac/WebKit for smoother performance
                const baseDuration = platformInfo.isMac ? 0.65 : 0.6555;
                const durationVariation = platformInfo.isMac ? 0.005 : (0.6566 - 0.6555);
                const duration = baseDuration + (durationVariation * (i % 2) / 6);

                // Phase offset so not all bars start at the same time
                const delay = (i * (platformInfo.isMac ? 0.18 : 0.2)) % duration;

                // Animate scaleX from 0 to 1
                gsap.to(rect, {
                    scaleX: 1,
                    duration,
                    delay,
                    ease: platformInfo.isWebKit ? "power2.inOut" : "power2.inOut",
                });
            }
        });

        // Clean up on unmount
        return () => {
            gsap.killTweensOf(maskRectRefs.current);
        };
    }, []);

    const platformInfo = getPlatformInfo();

    // Calculate optimal viewBox based on viewport aspect ratio for better Mac compatibility
    const aspectRatio = viewportSize.width / viewportSize.height;
    const svgAspectRatio = SVG_WIDTH / SVG_HEIGHT;

    let adjustedViewBox = `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`;
    let preserveAspectRatio = "none";

    // For Mac Safari, use proper aspect ratio preservation to avoid distortion
    if (platformInfo.isMac || platformInfo.isSafari) {
        if (aspectRatio > svgAspectRatio) {
            // Viewport is wider - adjust height
            const adjustedHeight = SVG_WIDTH / aspectRatio;
            const yOffset = (SVG_HEIGHT - adjustedHeight) / 2;
            adjustedViewBox = `0 ${yOffset} ${SVG_WIDTH} ${adjustedHeight}`;
        } else {
            // Viewport is taller - adjust width  
            const adjustedWidth = SVG_HEIGHT * aspectRatio;
            const xOffset = (SVG_WIDTH - adjustedWidth) / 2;
            adjustedViewBox = `${xOffset} 0 ${adjustedWidth} ${SVG_HEIGHT}`;
        }
        preserveAspectRatio = "xMidYMid slice";
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: getSafeViewportWidth(),
                height: getSafeViewportHeight(),
                overflow: 'hidden',
                zIndex: 9999,
                background: 'white',
                ...(platformInfo.isWebKit && {
                    WebkitTransform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }),
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={adjustedViewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio={preserveAspectRatio}
                style={{
                    display: 'block',
                    width: getSafeViewportWidth(),
                    height: getSafeViewportHeight(),
                    ...(platformInfo.isMac && {
                        shapeRendering: 'geometricPrecision',
                    }),
                }}
            >
                <g clipPath="url(#clip0_3499_109105)">
                    <rect width="1366" height="768" fill="white" />
                    {/* Render bars with masks */}
                    {bars.map((bar, i) => (
                        <g mask={`url(#progress-mask-${i})`} key={`bar-${i}`}>
                            <rect
                                x={bar.x}
                                y={bar.y}
                                width={bar.width}
                                height={bar.height}
                                transform={`rotate(${bar.rot} ${bar.x} ${bar.y})`}
                                fill={bar.fill}
                                stroke={bar.stroke}
                                strokeWidth={bar.strokeWidth}
                            />
                        </g>
                    ))}
                </g>
                {/* Masks */}
                <defs>
                    {bars.map((bar, i) => (
                        <mask id={`progress-mask-${i}`} key={`mask-${i}`}>
                            <rect
                                ref={el => (maskRectRefs.current[i] = el)}
                                x={bar.x}
                                y={bar.y}
                                width={bar.width}
                                height={bar.height}
                                transform={`rotate(${bar.rot} ${bar.x} ${bar.y})`}
                                fill="white"
                                style={{ transformOrigin: "0% 50%" }} // Ensures scaling starts from the left
                            />
                        </mask>
                    ))}
                    {/* Gradients and clipPath from SVG */}
                    <linearGradient id="paint0_linear_3499_109105" x1="-663.483" y1="277.621" x2="1234.97" y2="277.621" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FC6C81" />
                        <stop offset="0.45" stop-color="#FCF64B" />
                        <stop offset="0.79" stop-color="#FEA34D" />
                        <stop offset="1" stop-color="#FFC029" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_3499_109105" x1="-649.501" y1="302.335" x2="1248.95" y2="302.335" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF777A" />
                        <stop offset="0.25" stop-color="#FC6AD4" />
                        <stop offset="0.5" stop-color="#FFFF74" />
                        <stop offset="0.92" stop-color="#EBFF30" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_3499_109105" x1="-627.653" y1="328.321" x2="1270.8" y2="328.321" gradientUnits="userSpaceOnUse">
                        <stop offset="0.33" stop-color="#FF8BB8" />
                        <stop offset="0.68" stop-color="#FFF339" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_3499_109105" x1="-604.594" y1="336.744" x2="1293.86" y2="336.744" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FC8181" />
                        <stop offset="0.44" stop-color="#FFF724" />
                        <stop offset="0.6" stop-color="#B5F953" />
                        <stop offset="1" stop-color="#FFE13B" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_3499_109105" x1="-599.702" y1="352.366" x2="1298.75" y2="352.366" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5EFF45" />
                        <stop offset="0.45" stop-color="#00E8E5" />
                        <stop offset="0.79" stop-color="#F47842" />
                        <stop offset="1" stop-color="#EC366A" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_3499_109105" x1="-584.524" y1="359.432" x2="1313.93" y2="359.432" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#7DFF92" />
                        <stop offset="0.37" stop-color="#00E9D5" />
                        <stop offset="0.51" stop-color="#00E73E" />
                        <stop offset="0.75" stop-color="#E5B1B0" />
                        <stop offset="1" stop-color="#F3476E" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_3499_109105" x1="-579.628" y1="374.855" x2="1318.82" y2="374.855" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#71FF9B" />
                        <stop offset="0.38" stop-color="#00E9D6" />
                        <stop offset="0.49" stop-color="#00E81D" />
                        <stop offset="0.62" stop-color="#3DE5B6" />
                        <stop offset="0.79" stop-color="#EFA4A0" />
                        <stop offset="1" stop-color="#F73A8C" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_3499_109105" x1="-565.653" y1="397.4" x2="1332.8" y2="397.4" gradientUnits="userSpaceOnUse">
                        <stop offset="0.12" stop-color="#FB7064" />
                        <stop offset="0.4" stop-color="#00E188" />
                        <stop offset="0.62" stop-color="#00DED2" />
                        <stop offset="0.83" stop-color="#F5793C" />
                        <stop offset="1" stop-color="#ED3D57" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_3499_109105" x1="-548.034" y1="422.668" x2="1350.41" y2="422.668" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FE4593" />
                        <stop offset="0.54" stop-color="#00D4D9" />
                        <stop offset="0.69" stop-color="#F18679" />
                        <stop offset="1" stop-color="#F01B88" />
                    </linearGradient>
                    <linearGradient id="paint9_linear_3499_109105" x1="-524.979" y1="436.447" x2="1373.47" y2="436.447" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stop-color="#FF67AB" />
                        <stop offset="0.57" stop-color="#00D5D8" />
                        <stop offset="0.76" stop-color="#EAA4E1" />
                        <stop offset="0.88" stop-color="#FC12E3" />
                        <stop offset="1" stop-color="#6ACFEF" />
                    </linearGradient>
                    <linearGradient id="paint10_linear_3499_109105" x1="-515.23" y1="461.254" x2="1383.22" y2="461.254" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F57CD1" />
                        <stop offset="0.37" stop-color="#26F4FC" />
                        <stop offset="0.82" stop-color="#F823D5" />
                        <stop offset="1" stop-color="#65A3E9" />
                    </linearGradient>
                    <linearGradient id="paint11_linear_3499_109105" x1="-492.782" y1="482.834" x2="1405.67" y2="482.834" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stop-color="#F18ED7" />
                        <stop offset="0.41" stop-color="#2FD4FD" />
                        <stop offset="0.71" stop-color="#F94DD3" />
                        <stop offset="1" stop-color="#F28CE8" />
                    </linearGradient>
                    <linearGradient id="paint12_linear_3499_109105" x1="-473.666" y1="496.733" x2="1424.78" y2="496.733" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F892E8" />
                        <stop offset="0.63" stop-color="#FEFF74" />
                        <stop offset="0.82" stop-color="#EF10CA" />
                    </linearGradient>
                    <linearGradient id="paint13_linear_3499_109105" x1="-463.618" y1="513.134" x2="1434.83" y2="513.134" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F5FF5C" />
                        <stop offset="0.45" stop-color="#FBA035" />
                        <stop offset="0.7" stop-color="#FBF779" />
                        <stop offset="0.84" stop-color="#ED1AD6" />
                    </linearGradient>
                    <linearGradient id="paint14_linear_3499_109105" x1="-447.841" y1="521.126" x2="1450.61" y2="521.126" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F5AA3F" />
                        <stop offset="0.51" stop-color="#FE927C" />
                        <stop offset="0.75" stop-color="#F91BBB" />
                    </linearGradient>
                    <linearGradient id="paint15_linear_3499_109105" x1="-443.548" y1="537.029" x2="1454.9" y2="537.029" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBFD77" />
                        <stop offset="0.38" stop-color="#FB8C66" />
                        <stop offset="0.9" stop-color="#FA28BE" />
                    </linearGradient>
                    <linearGradient id="paint16_linear_3499_109105" x1="-428.37" y1="546.166" x2="1470.08" y2="546.166" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FCFF00" />
                        <stop offset="0.25" stop-color="#EBA0FA" />
                        <stop offset="0.54" stop-color="#FB28E4" />
                        <stop offset="0.74" stop-color="#F77DDC" />
                        <stop offset="1" stop-color="#FF2677" />
                    </linearGradient>
                    <linearGradient id="paint17_linear_3499_109105" x1="-421.057" y1="562.5" x2="1477.39" y2="562.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFB7B7" />
                        <stop offset="0.38" stop-color="#FBACEA" />
                        <stop offset="0.62" stop-color="#FB34DF" />
                        <stop offset="0.84" stop-color="#A1FF88" />
                        <stop offset="1" stop-color="#FF1464" />
                    </linearGradient>
                    <linearGradient id="paint18_linear_3499_109105" x1="-406.475" y1="579.93" x2="1491.97" y2="579.93" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stop-color="#FACE82" />
                        <stop offset="0.38" stop-color="#F46497" />
                        <stop offset="0.72" stop-color="#A6F77D" />
                        <stop offset="0.9" stop-color="#FA80ED" />
                    </linearGradient>
                    <linearGradient id="paint19_linear_3499_109105" x1="-392.493" y1="604.64" x2="1505.96" y2="604.64" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F6BB74" />
                        <stop offset="0.36" stop-color="#F5727F" />
                        <stop offset="0.61" stop-color="#F793CA" />
                        <stop offset="0.82" stop-color="#DDF66E" />
                    </linearGradient>
                    <linearGradient id="paint20_linear_3499_109105" x1="-370.038" y1="622.506" x2="1528.41" y2="622.506" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFDD43" />
                        <stop offset="0.38" stop-color="#FCB16C" />
                        <stop offset="0.79" stop-color="#FFB1D1" />
                        <stop offset="1" stop-color="#FCE6D2" />
                    </linearGradient>
                    <linearGradient id="paint21_linear_3499_109105" x1="-355.463" y1="631.643" x2="1542.99" y2="631.643" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stop-color="#FAE21A" />
                        <stop offset="0.54" stop-color="#F8DE3D" />
                        <stop offset="0.74" stop-color="#F28D77" />
                        <stop offset="1" stop-color="#F3FC34" />
                    </linearGradient>
                    <linearGradient id="paint22_linear_3499_109105" x1="-348.751" y1="648.534" x2="1549.7" y2="648.534" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBED87" />
                        <stop offset="0.02" stop-color="#FFF04B" />
                        <stop offset="0.49" stop-color="#D0ED6B" />
                        <stop offset="0.62" stop-color="#F3E668" />
                        <stop offset="0.84" stop-color="#F2A858" />
                    </linearGradient>
                    <linearGradient id="paint23_linear_3499_109105" x1="-334.165" y1="669.683" x2="1564.28" y2="669.683" gradientUnits="userSpaceOnUse">
                        <stop offset="0.14" stop-color="#17D7D7" />
                        <stop offset="0.47" stop-color="#B4EB4C" />
                        <stop offset="0.83" stop-color="#FEA766" />
                    </linearGradient>
                    <linearGradient id="paint24_linear_3499_109105" x1="-314.755" y1="677.946" x2="1583.7" y2="677.946" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#0097F8" />
                        <stop offset="0.54" stop-color="#55F15D" />
                        <stop offset="0.86" stop-color="#FF8E6E" />
                        <stop offset="1" stop-color="#F5F286" />
                    </linearGradient>
                    <linearGradient id="paint25_linear_3499_109105" x1="-309.858" y1="689.759" x2="1588.59" y2="689.759" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00A0F9" />
                        <stop offset="0.39" stop-color="#9CF29A" />
                        <stop offset="0.66" stop-color="#FCBC4F" />
                        <stop offset="0.8" stop-color="#F65986" />
                        <stop offset="0.96" stop-color="#F7F893" />
                    </linearGradient>
                    <linearGradient id="paint26_linear_3499_109105" x1="-298.913" y1="702.077" x2="1599.54" y2="702.077" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0058F1" />
                        <stop offset="0.41" stop-color="#F8D84E" />
                        <stop offset="0.63" stop-color="#FABC4E" />
                        <stop offset="0.82" stop-color="#F76A90" />
                        <stop offset="1" stop-color="#F7EB85" />
                    </linearGradient>
                    <linearGradient id="paint27_linear_3499_109105" x1="-288.571" y1="727.164" x2="1609.88" y2="727.164" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stop-color="#007EF5" />
                        <stop offset="0.36" stop-color="#C4FA33" />
                        <stop offset="0.61" stop-color="#5FF5B9" />
                        <stop offset="0.82" stop-color="#F7E64A" />
                        <stop offset="0.99" stop-color="#F6ED91" />
                    </linearGradient>
                    <linearGradient id="paint28_linear_3499_109105" x1="-266.112" y1="741.22" x2="1632.34" y2="741.22" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stop-color="#1FB2FE" />
                        <stop offset="0.4" stop-color="#BBF852" />
                        <stop offset="0.68" stop-color="#F3B943" />
                        <stop offset="0.82" stop-color="#F47CF9" />
                        <stop offset="0.99" stop-color="#9AEBE0" />
                    </linearGradient>
                    <linearGradient id="paint29_linear_3499_109105" x1="-255.167" y1="747.536" x2="1643.28" y2="747.536" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stop-color="#3EBBFB" />
                        <stop offset="0.38" stop-color="#8CF762" />
                        <stop offset="0.64" stop-color="#F4CF6F" />
                        <stop offset="0.86" stop-color="#F27088" />
                        <stop offset="1" stop-color="#E4F8A8" />
                    </linearGradient>
                    <linearGradient id="paint30_linear_3499_109105" x1="-249.675" y1="760.553" x2="1648.78" y2="760.553" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#00F2D2" />
                        <stop offset="0.4" stop-color="#F7EB5F" />
                        <stop offset="0.68" stop-color="#F1AF79" />
                        <stop offset="0.85" stop-color="#F04F8C" />
                        <stop offset="0.96" stop-color="#ECF75B" />
                    </linearGradient>
                    <linearGradient id="paint31_linear_3499_109105" x1="-238.725" y1="777.238" x2="1659.72" y2="777.238" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stop-color="#02DEE5" />
                        <stop offset="0.38" stop-color="#E6BDF1" />
                        <stop offset="0.84" stop-color="#FE2AD3" />
                        <stop offset="1" stop-color="#FDC4E0" />
                    </linearGradient>
                    <linearGradient id="paint32_linear_3499_109105" x1="-224.151" y1="790.021" x2="1674.3" y2="790.021" gradientUnits="userSpaceOnUse">
                        <stop offset="0.11" stop-color="#1FD2E8" />
                        <stop offset="0.47" stop-color="#F2F97B" />
                        <stop offset="0.79" stop-color="#F710DB" />
                        <stop offset="0.96" stop-color="#FCBCE5" />
                    </linearGradient>
                    <linearGradient id="paint33_linear_3499_109105" x1="-213.206" y1="796.341" x2="1685.24" y2="796.341" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#02E0E3" />
                        <stop offset="0.51" stop-color="#E0FD56" />
                        <stop offset="0.86" stop-color="#F413D5" />
                        <stop offset="1" stop-color="#F2D5EB" />
                    </linearGradient>
                    <linearGradient id="paint34_linear_3499_109105" x1="-208.309" y1="813.167" x2="1690.14" y2="813.167" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stop-color="#FCA96C" />
                        <stop offset="0.44" stop-color="#E5F390" />
                        <stop offset="0.71" stop-color="#F522DB" />
                        <stop offset="0.92" stop-color="#F5D2E9" />
                    </linearGradient>
                    <linearGradient id="paint35_linear_3499_109105" x1="-188.488" y1="834.87" x2="1709.96" y2="834.87" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stop-color="#FC8755" />
                        <stop offset="0.51" stop-color="#F1EC5A" />
                        <stop offset="0.69" stop-color="#F886B0" />
                        <stop offset="0.81" stop-color="#F37EDB" />
                        <stop offset="1" stop-color="#F5D2E6" />
                    </linearGradient>
                    <linearGradient id="paint36_linear_3499_109105" x1="-175.513" y1="852.298" x2="1722.94" y2="852.298" gradientUnits="userSpaceOnUse">
                        <stop offset="0.29" stop-color="#FF7059" />
                        <stop offset="0.53" stop-color="#FEF562" />
                        <stop offset="0.71" stop-color="#F28CED" />
                        <stop offset="0.92" stop-color="#FA3CC2" />
                    </linearGradient>
                    <linearGradient id="paint37_linear_3499_109105" x1="-160.935" y1="872.333" x2="1737.52" y2="872.333" gradientUnits="userSpaceOnUse">
                        <stop offset="0.05" stop-color="#F7A1C7" />
                        <stop offset="0.47" stop-color="#EA5D45" />
                        <stop offset="0.69" stop-color="#FDF867" />
                        <stop offset="0.81" stop-color="#FF9AE0" />
                        <stop offset="1" stop-color="#FEDBE6" />
                    </linearGradient>
                    <linearGradient id="paint38_linear_3499_109105" x1="-141.524" y1="879.949" x2="1756.93" y2="879.949" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stop-color="#C797D3" />
                        <stop offset="0.51" stop-color="#FF90C1" />
                        <stop offset="0.7" stop-color="#F6F28E" />
                        <stop offset="0.86" stop-color="#F469A2" />
                        <stop offset="1" stop-color="#EED5DB" />
                    </linearGradient>
                    <linearGradient id="paint39_linear_3499_109105" x1="-136.631" y1="892.966" x2="1761.82" y2="892.966" gradientUnits="userSpaceOnUse">
                        <stop offset="0.37" stop-color="#D978FD" />
                        <stop offset="0.57" stop-color="#FF91C1" />
                        <stop offset="0.68" stop-color="#F4EF9B" />
                        <stop offset="0.85" stop-color="#F47DB6" />
                        <stop offset="0.96" stop-color="#E847FB" />
                    </linearGradient>
                    <linearGradient id="paint40_linear_3499_109105" x1="-126.878" y1="918.053" x2="1771.57" y2="918.053" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E67D96" />
                        <stop offset="0.36" stop-color="#FCB5E9" />
                        <stop offset="0.65" stop-color="#EEFE3F" />
                        <stop offset="0.87" stop-color="#F46AD6" />
                        <stop offset="1" stop-color="#DE6CFB" />
                    </linearGradient>
                    <linearGradient id="paint41_linear_3499_109105" x1="-105.023" y1="943.758" x2="1793.42" y2="943.758" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stop-color="#EC9E64" />
                        <stop offset="0.52" stop-color="#F38DA1" />
                        <stop offset="0.72" stop-color="#D1FC61" />
                        <stop offset="0.88" stop-color="#D258FB" />
                    </linearGradient>
                    <linearGradient id="paint42_linear_3499_109105" x1="-83.1677" y1="965.62" x2="1815.28" y2="965.62" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F1AE51" />
                        <stop offset="0.35" stop-color="#F7C468" />
                        <stop offset="0.6" stop-color="#FB9498" />
                        <stop offset="0.81" stop-color="#FFB1D5" />
                        <stop offset="1" stop-color="#FF70FA" />
                    </linearGradient>
                    <linearGradient id="paint43_linear_3499_109105" x1="-63.7602" y1="974.754" x2="1834.69" y2="974.754" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FEE559" />
                        <stop offset="0.31" stop-color="#FFF174" />
                        <stop offset="0.54" stop-color="#F5EA9B" />
                        <stop offset="0.74" stop-color="#F9977D" />
                        <stop offset="1" stop-color="#F5EBCA" />
                    </linearGradient>
                    <linearGradient id="paint44_linear_3499_109105" x1="-57.044" y1="994.526" x2="1841.41" y2="994.526" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F3FF2C" />
                        <stop offset="0.34" stop-color="#D4FC7D" />
                        <stop offset="0.6" stop-color="#F6E56C" />
                        <stop offset="0.84" stop-color="#F8B251" />
                        <stop offset="1" stop-color="#FED54D" />
                    </linearGradient>
                    <linearGradient id="paint45_linear_3499_109105" x1="-38.2333" y1="1013.07" x2="1860.22" y2="1013.07" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FC6C81" />
                        <stop offset="0.45" stop-color="#FCF64B" />
                        <stop offset="0.79" stop-color="#FEA34D" />
                        <stop offset="1" stop-color="#FFC029" />
                    </linearGradient>
                    <linearGradient id="paint46_linear_3499_109105" x1="-24.2511" y1="1037.78" x2="1874.2" y2="1037.78" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF777A" />
                        <stop offset="0.25" stop-color="#FC6AD4" />
                        <stop offset="0.5" stop-color="#FFFF74" />
                        <stop offset="0.92" stop-color="#EBFF30" />
                    </linearGradient>
                    <linearGradient id="paint47_linear_3499_109105" x1="-2.39911" y1="1063.77" x2="1896.05" y2="1063.77" gradientUnits="userSpaceOnUse">
                        <stop offset="0.33" stop-color="#FF8BB8" />
                        <stop offset="0.68" stop-color="#FFF339" />
                    </linearGradient>
                    <linearGradient id="paint48_linear_3499_109105" x1="20.6556" y1="1072.19" x2="1919.11" y2="1072.19" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FC8181" />
                        <stop offset="0.44" stop-color="#FFF724" />
                        <stop offset="0.6" stop-color="#B5F953" />
                        <stop offset="1" stop-color="#FFE13B" />
                    </linearGradient>
                    <linearGradient id="paint49_linear_3499_109105" x1="25.5479" y1="1087.81" x2="1924" y2="1087.81" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5EFF45" />
                        <stop offset="0.45" stop-color="#00E8E5" />
                        <stop offset="0.79" stop-color="#F47842" />
                        <stop offset="1" stop-color="#EC366A" />
                    </linearGradient>
                    <linearGradient id="paint50_linear_3499_109105" x1="40.7298" y1="1094.88" x2="1939.18" y2="1094.88" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#7DFF92" />
                        <stop offset="0.37" stop-color="#00E9D5" />
                        <stop offset="0.51" stop-color="#00E73E" />
                        <stop offset="0.75" stop-color="#E5B1B0" />
                        <stop offset="1" stop-color="#F3476E" />
                    </linearGradient>
                    <linearGradient id="paint51_linear_3499_109105" x1="45.6222" y1="1110.3" x2="1944.07" y2="1110.3" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#71FF9B" />
                        <stop offset="0.38" stop-color="#00E9D6" />
                        <stop offset="0.49" stop-color="#00E81D" />
                        <stop offset="0.62" stop-color="#3DE5B6" />
                        <stop offset="0.79" stop-color="#EFA4A0" />
                        <stop offset="1" stop-color="#F73A8C" />
                    </linearGradient>
                    <linearGradient id="paint52_linear_3499_109105" x1="59.6009" y1="1132.85" x2="1958.05" y2="1132.85" gradientUnits="userSpaceOnUse">
                        <stop offset="0.12" stop-color="#FB7064" />
                        <stop offset="0.4" stop-color="#00E188" />
                        <stop offset="0.62" stop-color="#00DED2" />
                        <stop offset="0.83" stop-color="#F5793C" />
                        <stop offset="1" stop-color="#ED3D57" />
                    </linearGradient>
                    <linearGradient id="paint53_linear_3499_109105" x1="77.2155" y1="1158.12" x2="1975.66" y2="1158.12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FE4593" />
                        <stop offset="0.54" stop-color="#00D4D9" />
                        <stop offset="0.69" stop-color="#F18679" />
                        <stop offset="1" stop-color="#F01B88" />
                    </linearGradient>
                    <linearGradient id="paint54_linear_3499_109105" x1="100.271" y1="1171.9" x2="1998.72" y2="1171.9" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stop-color="#FF67AB" />
                        <stop offset="0.57" stop-color="#00D5D8" />
                        <stop offset="0.76" stop-color="#EAA4E1" />
                        <stop offset="0.88" stop-color="#FC12E3" />
                        <stop offset="1" stop-color="#6ACFEF" />
                    </linearGradient>
                    <linearGradient id="paint55_linear_3499_109105" x1="110.02" y1="1196.7" x2="2008.47" y2="1196.7" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F57CD1" />
                        <stop offset="0.37" stop-color="#26F4FC" />
                        <stop offset="0.82" stop-color="#F823D5" />
                        <stop offset="1" stop-color="#65A3E9" />
                    </linearGradient>
                    <linearGradient id="paint56_linear_3499_109105" x1="132.468" y1="1218.28" x2="2030.92" y2="1218.28" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stop-color="#F18ED7" />
                        <stop offset="0.41" stop-color="#2FD4FD" />
                        <stop offset="0.71" stop-color="#F94DD3" />
                        <stop offset="1" stop-color="#F28CE8" />
                    </linearGradient>
                    <linearGradient id="paint57_linear_3499_109105" x1="151.588" y1="1232.18" x2="2050.04" y2="1232.18" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F892E8" />
                        <stop offset="0.63" stop-color="#FEFF74" />
                        <stop offset="0.82" stop-color="#EF10CA" />
                    </linearGradient>
                    <linearGradient id="paint58_linear_3499_109105" x1="161.632" y1="1248.58" x2="2060.08" y2="1248.58" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F5FF5C" />
                        <stop offset="0.45" stop-color="#FBA035" />
                        <stop offset="0.7" stop-color="#FBF779" />
                        <stop offset="0.84" stop-color="#ED1AD6" />
                    </linearGradient>
                    <linearGradient id="paint59_linear_3499_109105" x1="177.413" y1="1256.57" x2="2075.86" y2="1256.57" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F5AA3F" />
                        <stop offset="0.51" stop-color="#FE927C" />
                        <stop offset="0.75" stop-color="#F91BBB" />
                    </linearGradient>
                    <linearGradient id="paint60_linear_3499_109105" x1="181.706" y1="1272.48" x2="2080.16" y2="1272.48" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBFD77" />
                        <stop offset="0.38" stop-color="#FB8C66" />
                        <stop offset="0.9" stop-color="#FA28BE" />
                    </linearGradient>
                    <linearGradient id="paint61_linear_3499_109105" x1="196.88" y1="1281.61" x2="2095.33" y2="1281.61" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FCFF00" />
                        <stop offset="0.25" stop-color="#EBA0FA" />
                        <stop offset="0.54" stop-color="#FB28E4" />
                        <stop offset="0.74" stop-color="#F77DDC" />
                        <stop offset="1" stop-color="#FF2677" />
                    </linearGradient>
                    <linearGradient id="paint62_linear_3499_109105" x1="204.193" y1="1297.95" x2="2102.64" y2="1297.95" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFB7B7" />
                        <stop offset="0.38" stop-color="#FBACEA" />
                        <stop offset="0.62" stop-color="#FB34DF" />
                        <stop offset="0.84" stop-color="#A1FF88" />
                        <stop offset="1" stop-color="#FF1464" />
                    </linearGradient>
                    <linearGradient id="paint63_linear_3499_109105" x1="218.778" y1="1315.38" x2="2117.23" y2="1315.38" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stop-color="#FACE82" />
                        <stop offset="0.38" stop-color="#F46497" />
                        <stop offset="0.72" stop-color="#A6F77D" />
                        <stop offset="0.9" stop-color="#FA80ED" />
                    </linearGradient>
                    <linearGradient id="paint64_linear_3499_109105" x1="232.757" y1="1340.09" x2="2131.21" y2="1340.09" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F6BB74" />
                        <stop offset="0.36" stop-color="#F5727F" />
                        <stop offset="0.61" stop-color="#F793CA" />
                        <stop offset="0.82" stop-color="#DDF66E" />
                    </linearGradient>
                    <linearGradient id="paint65_linear_3499_109105" x1="255.212" y1="1357.95" x2="2153.66" y2="1357.95" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFDD43" />
                        <stop offset="0.38" stop-color="#FCB16C" />
                        <stop offset="0.79" stop-color="#FFB1D1" />
                        <stop offset="1" stop-color="#FCE6D2" />
                    </linearGradient>
                    <linearGradient id="paint66_linear_3499_109105" x1="269.791" y1="1367.09" x2="2168.24" y2="1367.09" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stop-color="#FAE21A" />
                        <stop offset="0.54" stop-color="#F8DE3D" />
                        <stop offset="0.74" stop-color="#F28D77" />
                        <stop offset="1" stop-color="#F3FC34" />
                    </linearGradient>
                    <linearGradient id="paint67_linear_3499_109105" x1="276.503" y1="1383.98" x2="2174.95" y2="1383.98" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FBED87" />
                        <stop offset="0.02" stop-color="#FFF04B" />
                        <stop offset="0.49" stop-color="#D0ED6B" />
                        <stop offset="0.62" stop-color="#F3E668" />
                        <stop offset="0.84" stop-color="#F2A858" />
                    </linearGradient>
                    <linearGradient id="paint68_linear_3499_109105" x1="291.085" y1="1405.13" x2="2189.53" y2="1405.13" gradientUnits="userSpaceOnUse">
                        <stop offset="0.14" stop-color="#17D7D7" />
                        <stop offset="0.47" stop-color="#B4EB4C" />
                        <stop offset="0.83" stop-color="#FEA766" />
                    </linearGradient>
                    <linearGradient id="paint69_linear_3499_109105" x1="310.499" y1="1413.39" x2="2208.95" y2="1413.39" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#0097F8" />
                        <stop offset="0.54" stop-color="#55F15D" />
                        <stop offset="0.86" stop-color="#FF8E6E" />
                        <stop offset="1" stop-color="#F5F286" />
                    </linearGradient>
                    <linearGradient id="paint70_linear_3499_109105" x1="315.392" y1="1425.21" x2="2213.84" y2="1425.21" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00A0F9" />
                        <stop offset="0.39" stop-color="#9CF29A" />
                        <stop offset="0.66" stop-color="#FCBC4F" />
                        <stop offset="0.8" stop-color="#F65986" />
                        <stop offset="0.96" stop-color="#F7F893" />
                    </linearGradient>
                    <linearGradient id="paint71_linear_3499_109105" x1="326.337" y1="1437.53" x2="2224.79" y2="1437.53" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0058F1" />
                        <stop offset="0.41" stop-color="#F8D84E" />
                        <stop offset="0.63" stop-color="#FABC4E" />
                        <stop offset="0.82" stop-color="#F76A90" />
                        <stop offset="1" stop-color="#F7EB85" />
                    </linearGradient>
                    <linearGradient id="paint72_linear_3499_109105" x1="336.683" y1="1462.61" x2="2235.13" y2="1462.61" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stop-color="#007EF5" />
                        <stop offset="0.36" stop-color="#C4FA33" />
                        <stop offset="0.61" stop-color="#5FF5B9" />
                        <stop offset="0.82" stop-color="#F7E64A" />
                        <stop offset="0.99" stop-color="#F6ED91" />
                    </linearGradient>
                    <linearGradient id="paint73_linear_3499_109105" x1="359.138" y1="1476.67" x2="2257.59" y2="1476.67" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stop-color="#1FB2FE" />
                        <stop offset="0.4" stop-color="#BBF852" />
                        <stop offset="0.68" stop-color="#F3B943" />
                        <stop offset="0.82" stop-color="#F47CF9" />
                        <stop offset="0.99" stop-color="#9AEBE0" />
                    </linearGradient>
                    <linearGradient id="paint74_linear_3499_109105" x1="370.087" y1="1482.98" x2="2268.54" y2="1482.98" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stop-color="#3EBBFB" />
                        <stop offset="0.38" stop-color="#8CF762" />
                        <stop offset="0.64" stop-color="#F4CF6F" />
                        <stop offset="0.86" stop-color="#F27088" />
                        <stop offset="1" stop-color="#E4F8A8" />
                    </linearGradient>
                    <linearGradient id="paint75_linear_3499_109105" x1="375.579" y1="1496" x2="2274.03" y2="1496" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#00F2D2" />
                        <stop offset="0.4" stop-color="#F7EB5F" />
                        <stop offset="0.68" stop-color="#F1AF79" />
                        <stop offset="0.85" stop-color="#F04F8C" />
                        <stop offset="0.96" stop-color="#ECF75B" />
                    </linearGradient>
                    <linearGradient id="paint76_linear_3499_109105" x1="386.525" y1="1512.69" x2="2284.97" y2="1512.69" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stop-color="#02DEE5" />
                        <stop offset="0.38" stop-color="#E6BDF1" />
                        <stop offset="0.84" stop-color="#FE2AD3" />
                        <stop offset="1" stop-color="#FDC4E0" />
                    </linearGradient>
                    <linearGradient id="paint77_linear_3499_109105" x1="401.103" y1="1525.47" x2="2299.55" y2="1525.47" gradientUnits="userSpaceOnUse">
                        <stop offset="0.11" stop-color="#1FD2E8" />
                        <stop offset="0.47" stop-color="#F2F97B" />
                        <stop offset="0.79" stop-color="#F710DB" />
                        <stop offset="0.96" stop-color="#FCBCE5" />
                    </linearGradient>
                    <linearGradient id="paint78_linear_3499_109105" x1="412.048" y1="1531.79" x2="2310.5" y2="1531.79" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#02E0E3" />
                        <stop offset="0.51" stop-color="#E0FD56" />
                        <stop offset="0.86" stop-color="#F413D5" />
                        <stop offset="1" stop-color="#F2D5EB" />
                    </linearGradient>
                    <linearGradient id="paint79_linear_3499_109105" x1="416.941" y1="1548.61" x2="2315.39" y2="1548.61" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stop-color="#FCA96C" />
                        <stop offset="0.44" stop-color="#E5F390" />
                        <stop offset="0.71" stop-color="#F522DB" />
                        <stop offset="0.92" stop-color="#F5D2E9" />
                    </linearGradient>
                    {/* <linearGradient id="paint80_linear_3499_109105" x1="436.766" y1="1570.32" x2="2335.22" y2="1570.32" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stop-color="#FC8755" />
                        <stop offset="0.51" stop-color="#F1EC5A" />
                        <stop offset="0.69" stop-color="#F886B0" />
                        <stop offset="0.81" stop-color="#F37EDB" />
                        <stop offset="1" stop-color="#F5D2E6" />
                    </linearGradient>
                    <linearGradient id="paint81_linear_3499_109105" x1="449.737" y1="1587.75" x2="2348.19" y2="1587.75" gradientUnits="userSpaceOnUse">
                        <stop offset="0.29" stop-color="#FF7059" />
                        <stop offset="0.53" stop-color="#FEF562" />
                        <stop offset="0.71" stop-color="#F28CED" />
                        <stop offset="0.92" stop-color="#FA3CC2" />
                    </linearGradient>
                    <linearGradient id="paint82_linear_3499_109105" x1="464.319" y1="1607.78" x2="2362.77" y2="1607.78" gradientUnits="userSpaceOnUse">
                        <stop offset="0.05" stop-color="#F7A1C7" />
                        <stop offset="0.47" stop-color="#EA5D45" />
                        <stop offset="0.69" stop-color="#FDF867" />
                        <stop offset="0.81" stop-color="#FF9AE0" />
                        <stop offset="1" stop-color="#FEDBE6" />
                    </linearGradient>
                    <linearGradient id="paint83_linear_3499_109105" x1="483.73" y1="1615.4" x2="2382.18" y2="1615.4" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stop-color="#C797D3" />
                        <stop offset="0.51" stop-color="#FF90C1" />
                        <stop offset="0.7" stop-color="#F6F28E" />
                        <stop offset="0.86" stop-color="#F469A2" />
                        <stop offset="1" stop-color="#EED5DB" />
                    </linearGradient>
                    <linearGradient id="paint84_linear_3499_109105" x1="488.623" y1="1628.41" x2="2387.07" y2="1628.41" gradientUnits="userSpaceOnUse">
                        <stop offset="0.37" stop-color="#D978FD" />
                        <stop offset="0.57" stop-color="#FF91C1" />
                        <stop offset="0.68" stop-color="#F4EF9B" />
                        <stop offset="0.85" stop-color="#F47DB6" />
                        <stop offset="0.96" stop-color="#E847FB" />
                    </linearGradient>
                    <linearGradient id="paint85_linear_3499_109105" x1="498.372" y1="1653.5" x2="2396.82" y2="1653.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E67D96" />
                        <stop offset="0.36" stop-color="#FCB5E9" />
                        <stop offset="0.65" stop-color="#EEFE3F" />
                        <stop offset="0.87" stop-color="#F46AD6" />
                        <stop offset="1" stop-color="#DE6CFB" />
                    </linearGradient>
                    <linearGradient id="paint86_linear_3499_109105" x1="520.231" y1="1679.21" x2="2418.68" y2="1679.21" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stop-color="#EC9E64" />
                        <stop offset="0.52" stop-color="#F38DA1" />
                        <stop offset="0.72" stop-color="#D1FC61" />
                        <stop offset="0.88" stop-color="#D258FB" />
                    </linearGradient>
                    <linearGradient id="paint87_linear_3499_109105" x1="542.082" y1="1701.07" x2="2440.53" y2="1701.07" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F1AE51" />
                        <stop offset="0.35" stop-color="#F7C468" />
                        <stop offset="0.6" stop-color="#FB9498" />
                        <stop offset="0.81" stop-color="#FFB1D5" />
                        <stop offset="1" stop-color="#FF70FA" />
                    </linearGradient>
                    <linearGradient id="paint88_linear_3499_109105" x1="561.49" y1="1710.2" x2="2459.94" y2="1710.2" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FEE559" />
                        <stop offset="0.31" stop-color="#FFF174" />
                        <stop offset="0.54" stop-color="#F5EA9B" />
                        <stop offset="0.74" stop-color="#F9977D" />
                        <stop offset="1" stop-color="#F5EBCA" />
                    </linearGradient>
                    <linearGradient id="paint89_linear_3499_109105" x1="568.206" y1="1729.97" x2="2466.66" y2="1729.97" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F3FF2C" />
                        <stop offset="0.34" stop-color="#D4FC7D" />
                        <stop offset="0.6" stop-color="#F6E56C" />
                        <stop offset="0.84" stop-color="#F8B251" />
                        <stop offset="1" stop-color="#FED54D" />
                    </linearGradient> */}
                    <clipPath id="clip0_3499_109105">
                        <rect width="1366" height="768" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default MultipleColorDiagonal;
