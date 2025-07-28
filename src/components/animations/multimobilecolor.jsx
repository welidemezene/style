import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SVG_WIDTH = 375;
const SVG_HEIGHT = 812;

const bars = [

    { x: -706.949, y: 304.524, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint0_linear_mobile)', stroke: 'white' },
    { x: -697.27, y: 315.912, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint1_linear_mobile)', stroke: 'white' },
    { x: -682.758, y: 332.981, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint2_linear_mobile)', stroke: 'white' },
    { x: -668.246, y: 350.05, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint3_linear_mobile)', stroke: 'white' },
    { x: -664.598, y: 354.34, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint4_linear_mobile)', stroke: 'white' },
    { x: -654.918, y: 365.728, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint5_linear_mobile)', stroke: 'white' },
    { x: -651.27, y: 370.019, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint6_linear_mobile)', stroke: 'white' },
    { x: -641.59, y: 381.406, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint7_linear_mobile)', stroke: 'white' },
    { x: -629.492, y: 395.632, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint8_linear_mobile)', stroke: 'white' },
    { x: -614.98, y: 412.701, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint9_linear_mobile)', stroke: 'white' },
    { x: -607.715, y: 421.251, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint10_linear_mobile)', stroke: 'white' },
    { x: -593.199, y: 438.32, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint11_linear_mobile)', stroke: 'white' },
    { x: -581.109, y: 452.546, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint12_linear_mobile)', stroke: 'white' },
    { x: -573.84, y: 461.096, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint13_linear_mobile)', stroke: 'white' },
    { x: -564.156, y: 472.484, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint14_linear_mobile)', stroke: 'white' },
    { x: -560.512, y: 476.774, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint15_linear_mobile)', stroke: 'white' },
    { x: -550.828, y: 488.162, width: 1260, height: 7.49317, rot: -40.37, fill: 'url(#paint16_linear_mobile)', stroke: 'white' },
    { x: -545.973, y: 493.873, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint17_linear_mobile)', stroke: 'white' },
    { x: -536.293, y: 505.261, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint18_linear_mobile)', stroke: 'white' },
    { x: -526.609, y: 516.649, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint19_linear_mobile)', stroke: 'white' },
    { x: -512.098, y: 533.718, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint20_linear_mobile)', stroke: 'white' },
    { x: -502.418, y: 545.106, width: 1260, height: 7.49317, rot: -40.37, fill: 'url(#paint21_linear_mobile)', stroke: 'white' },
    { x: -497.562, y: 550.818, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint22_linear_mobile)', stroke: 'white' },
    { x: -487.879, y: 562.206, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint23_linear_mobile)', stroke: 'white' },
    { x: -475.785, y: 576.432, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint24_linear_mobile)', stroke: 'white' },
    { x: -472.137, y: 580.722, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint25_linear_mobile)', stroke: 'white' },
    { x: -464.867, y: 589.271, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint26_linear_mobile)', stroke: 'white' },
    { x: -457.602, y: 597.821, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint27_linear_mobile)', stroke: 'white' },
    { x: -443.09, y: 614.891, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint28_linear_mobile)', stroke: 'white' },
    { x: -435.82, y: 623.44, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint29_linear_mobile)', stroke: 'white' },
    { x: -432.172, y: 627.73, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint30_linear_mobile)', stroke: 'white' },
    { x: -424.902, y: 636.28, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint31_linear_mobile)', stroke: 'white' },
    { x: -415.223, y: 647.668, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint32_linear_mobile)', stroke: 'white' },
    { x: -407.953, y: 656.218, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint33_linear_mobile)', stroke: 'white' },
    { x: -404.305, y: 660.508, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint34_linear_mobile)', stroke: 'white' },
    { x: -394.625, y: 671.895, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint35_linear_mobile)', stroke: 'white' },
    { x: -382.531, y: 686.122, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint36_linear_mobile)', stroke: 'white' },
    { x: -372.852, y: 697.509, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint37_linear_mobile)', stroke: 'white' },
    { x: -360.754, y: 711.735, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint38_linear_mobile)', stroke: 'white' },
    { x: -357.109, y: 716.025, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint39_linear_mobile)', stroke: 'white' },
    { x: -349.836, y: 724.575, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint40_linear_mobile)', stroke: 'white' },
    { x: -335.328, y: 741.645, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint41_linear_mobile)', stroke: 'white' },
    { x: -320.816, y: 758.713, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint42_linear_mobile)', stroke: 'white' },
    { x: -308.719, y: 772.939, width: 1260, height: 7.49317, rot: -40.37, fill: 'url(#paint43_linear_mobile)', stroke: 'white' },
    { x: -303.863, y: 778.651, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint44_linear_mobile)', stroke: 'white' },
    { x: -291.773, y: 792.877, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint45_linear_mobile)', stroke: 'white' },
    { x: -282.09, y: 804.265, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint46_linear_mobile)', stroke: 'white' },
    { x: -267.578, y: 821.334, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint47_linear_mobile)', stroke: 'white' },
    { x: -253.066, y: 838.403, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint48_linear_mobile)', stroke: 'white' },
    { x: -249.418, y: 842.693, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint49_linear_mobile)', stroke: 'white' },
    { x: -239.738, y: 854.082, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint50_linear_mobile)', stroke: 'white' },
    { x: -236.09, y: 858.371, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint51_linear_mobile)', stroke: 'white' },
    { x: -226.406, y: 869.759, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint52_linear_mobile)', stroke: 'white' },
    { x: -214.316, y: 883.985, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint53_linear_mobile)', stroke: 'white' },
    { x: -199.801, y: 901.054, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint54_linear_mobile)', stroke: 'white' },
    { x: -192.535, y: 909.604, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint55_linear_mobile)', stroke: 'white' },
    { x: -178.023, y: 926.673, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint56_linear_mobile)', stroke: 'white' },
    { x: -165.926, y: 940.899, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint57_linear_mobile)', stroke: 'white' },
    { x: -158.66, y: 949.449, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint58_linear_mobile)', stroke: 'white' },
    { x: -148.977, y: 960.837, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint59_linear_mobile)', stroke: 'white' },
    { x: -145.328, y: 965.127, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint60_linear_mobile)', stroke: 'white' },
    { x: -135.648, y: 976.515, width: 1260, height: 7.49317, rot: -40.37, fill: 'url(#paint61_linear_mobile)', stroke: 'white' },
    { x: -130.793, y: 982.227, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint62_linear_mobile)', stroke: 'white' },
    { x: -121.109, y: 993.614, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint63_linear_mobile)', stroke: 'white' },
    { x: -111.43, y: 1005, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint64_linear_mobile)', stroke: 'white' },
    { x: -96.918, y: 1022.07, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint65_linear_mobile)', stroke: 'white' },
    { x: -87.2344, y: 1033.46, width: 1260, height: 7.49317, rot: -40.37, fill: 'url(#paint66_linear_mobile)', stroke: 'white' },
    { x: -82.3789, y: 1039.17, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint67_linear_mobile)', stroke: 'white' },
    { x: -72.6992, y: 1050.56, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint68_linear_mobile)', stroke: 'white' },
    { x: -60.6055, y: 1064.78, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint69_linear_mobile)', stroke: 'white' },
    { x: -56.957, y: 1069.07, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint70_linear_mobile)', stroke: 'white' },
    { x: -49.6914, y: 1077.62, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint71_linear_mobile)', stroke: 'white' },
    { x: -42.418, y: 1086.17, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint72_linear_mobile)', stroke: 'white' },
    { x: -27.9102, y: 1103.24, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint73_linear_mobile)', stroke: 'white' },
    { x: -20.6367, y: 1111.79, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint74_linear_mobile)', stroke: 'white' },
    { x: -16.9922, y: 1116.08, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint75_linear_mobile)', stroke: 'white' },
    { x: -9.72266, y: 1124.63, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint76_linear_mobile)', stroke: 'white' },
    { x: -0.0390625, y: 1136.02, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint77_linear_mobile)', stroke: 'white' },
    { x: 7.22656, y: 1144.57, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint78_linear_mobile)', stroke: 'white' },
    { x: 10.875, y: 1148.86, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint79_linear_mobile)', stroke: 'white' },
    { x: 20.5586, y: 1160.25, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint80_linear_mobile)', stroke: 'white' },
    { x: 32.6484, y: 1174.47, width: 1260, height: 14.9399, rot: -40.37, fill: 'url(#paint81_linear_mobile)', stroke: 'white' },
    { x: 42.332, y: 1185.86, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint82_linear_mobile)', stroke: 'white' },
    { x: 54.4258, y: 1200.09, width: 1260, height: 5.62817, rot: -40.37, fill: 'url(#paint83_linear_mobile)', stroke: 'white' },
    { x: 58.0742, y: 1204.38, width: 1260, height: 11.2165, rot: -40.37, fill: 'url(#paint84_linear_mobile)', stroke: 'white' },
    { x: 65.3438, y: 1212.93, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint85_linear_mobile)', stroke: 'white' },
    { x: 79.8555, y: 1230, width: 1260, height: 22.3932, rot: -40.37, fill: 'url(#paint86_linear_mobile)', stroke: 'white' },
    { x: 94.3633, y: 1247.07, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint87_linear_mobile)', stroke: 'white' },
    { x: 106.461, y: 1261.29, width: 1260, height: 7.49317, rot: -40.37, fill: 'url(#paint88_linear_mobile)', stroke: 'white' },
    { x: 111.316, y: 1267, width: 1260, height: 18.6632, rot: -40.37, fill: 'url(#paint89_linear_mobile)', stroke: 'white' }
];


const getPlatformInfo = () => {
    if (typeof window === 'undefined') {
        return {
            isMac: false,
            isSafari: false,
            isWebKit: false
        };
    }

    const userAgent = window.navigator.userAgent;
    return {
        isMac: /Mac/i.test(userAgent),
        isSafari: /^((?!chrome|android).)*safari/i.test(userAgent),
        isWebKit: /AppleWebKit/i.test(userAgent) && !/Chrome/i.test(userAgent)
    };
};

const getSafeViewportWidth = () => {
    if (typeof window === 'undefined') return SVG_WIDTH;
    return Math.min(window.innerWidth, document.documentElement.clientWidth);
};

const getSafeViewportHeight = () => {
    if (typeof window === 'undefined') return SVG_HEIGHT;
    return Math.min(window.innerHeight, document.documentElement.clientHeight);
};

const MobileDiagonalAnimation = () => {
    const maskRectRefs = useRef([]);
    const [viewportSize, setViewportSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : SVG_WIDTH,
        height: typeof window !== 'undefined' ? window.innerHeight : SVG_HEIGHT,
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
        gsap.killTweensOf(maskRectRefs.current);

        const platformInfo = getPlatformInfo();

        bars.forEach((bar, i) => {
            const rect = maskRectRefs.current[i];
            if (rect) {
                gsap.set(rect, {
                    transformOrigin: "0% 50%",
                    scaleX: 0,
                    force3D: true,
                    ...(platformInfo.isWebKit && {
                        WebkitBackfaceVisibility: 'hidden',
                    }),
                });

                const baseDuration = platformInfo.isMac ? 0.65 : 0.6555;
                const durationVariation = platformInfo.isMac ? 0.005 : (0.6566 - 0.6555);
                const duration = baseDuration + (durationVariation * (i % 2) / 6);
                const delay = (i * (platformInfo.isMac ? 0.18 : 0.2)) % duration;

                gsap.to(rect, {
                    scaleX: 1,
                    duration,
                    delay,
                    ease: platformInfo.isWebKit ? "power2.inOut" : "power2.inOut",
                });
            }
        });

        return () => {
            gsap.killTweensOf(maskRectRefs.current);
        };
    }, []);

    const platformInfo = getPlatformInfo();
    const aspectRatio = viewportSize.width / viewportSize.height;
    const svgAspectRatio = SVG_WIDTH / SVG_HEIGHT;

    let adjustedViewBox = `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`;
    let preserveAspectRatio = "none";

    if (platformInfo.isMac || platformInfo.isSafari) {
        if (aspectRatio > svgAspectRatio) {
            const adjustedHeight = SVG_WIDTH / aspectRatio;
            const yOffset = (SVG_HEIGHT - adjustedHeight) / 2;
            adjustedViewBox = `0 ${yOffset} ${SVG_WIDTH} ${adjustedHeight}`;
        } else {
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
                <g clipPath="url(#clip0_mobile)">
                    <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="white" />
                    {bars.map((bar, i) => (
                        <g mask={`url(#progress-mask-mobile-${i})`} key={`bar-mobile-${i}`}>
                            <rect
                                x={bar.x}
                                y={bar.y}
                                width={bar.width}
                                height={bar.height}
                                transform={`rotate(${bar.rot} ${bar.x} ${bar.y})`}
                                fill={bar.fill}
                                stroke={bar.stroke}
                            />
                        </g>
                    ))}
                </g>

                <defs>
                    {bars.map((bar, i) => (
                        <mask id={`progress-mask-mobile-${i}`} key={`mask-mobile-${i}`}>
                            <rect
                                ref={el => (maskRectRefs.current[i] = el)}
                                x={bar.x}
                                y={bar.y}
                                width={bar.width}
                                height={bar.height}
                                transform={`rotate(${bar.rot} ${bar.x} ${bar.y})`}
                                fill="white"
                                style={{ transformOrigin: "0% 50%" }}
                            />
                        </mask>
                    ))}

                    {/* Add all your gradient definitions here */}
                    <linearGradient id="paint0_linear_mobile" x1="-705.943" y1="313.564" x2="554.057" y2="313.564" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC6C81" />
                        <stop offset="0.45" stopColor="#FCF64B" />
                        <stop offset="0.79" stopColor="#FEA34D" />
                        <stop offset="1" stopColor="#FFC029" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_mobile" x1="-696.661" y1="329.972" x2="563.339" y2="329.972" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF777A" />
                        <stop offset="0.25" stopColor="#FC6AD4" />
                        <stop offset="0.5" stopColor="#FFFF74" />
                        <stop offset="0.92" stopColor="#EBFF30" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_mobile" x1="-682.152" y1="347.228" x2="577.848" y2="347.228" gradientUnits="userSpaceOnUse">
                        <stop offset="0.33" stopColor="#FF8BB8" />
                        <stop offset="0.68" stopColor="#FFF339" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_mobile" x1="-666.841" y1="352.826" x2="593.159" y2="352.826" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC8181" />
                        <stop offset="0.44" stopColor="#FFF724" />
                        <stop offset="0.6" stopColor="#B5F953" />
                        <stop offset="1" stopColor="#FFE13B" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_mobile" x1="-663.591" y1="363.197" x2="596.409" y2="363.197" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5EFF45" />
                        <stop offset="0.45" stopColor="#00E8E5" />
                        <stop offset="0.79" stopColor="#F47842" />
                        <stop offset="1" stopColor="#EC366A" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_mobile" x1="-653.513" y1="367.892" x2="606.487" y2="367.892" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7DFF92" />
                        <stop offset="0.37" stopColor="#00E9D5" />
                        <stop offset="0.51" stopColor="#00E73E" />
                        <stop offset="0.75" stopColor="#E5B1B0" />
                        <stop offset="1" stopColor="#F3476E" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_mobile" x1="-650.263" y1="378.13" x2="609.737" y2="378.13" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#71FF9B" />
                        <stop offset="0.38" stopColor="#00E9D6" />
                        <stop offset="0.49" stopColor="#00E81D" />
                        <stop offset="0.62" stopColor="#3DE5B6" />
                        <stop offset="0.79" stopColor="#EFA4A0" />
                        <stop offset="1" stopColor="#F73A8C" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_mobile" x1="-640.984" y1="393.099" x2="619.016" y2="393.099" gradientUnits="userSpaceOnUse">
                        <stop offset="0.12" stopColor="#FB7064" />
                        <stop offset="0.4" stopColor="#00E188" />
                        <stop offset="0.62" stopColor="#00DED2" />
                        <stop offset="0.83" stopColor="#F5793C" />
                        <stop offset="1" stopColor="#ED3D57" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_mobile" x1="-629.282" y1="409.877" x2="630.716" y2="409.877" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FE4593" />
                        <stop offset="0.54" stopColor="#00D4D9" />
                        <stop offset="0.69" stopColor="#F18679" />
                        <stop offset="1" stopColor="#F01B88" />
                    </linearGradient>
                    <linearGradient id="paint9_linear_mobile" x1="-613.974" y1="419.03" x2="646.026" y2="419.03" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#FF67AB" />
                        <stop offset="0.57" stopColor="#00D5D8" />
                        <stop offset="0.76" stopColor="#EAA4E1" />
                        <stop offset="0.88" stopColor="#FC12E3" />
                        <stop offset="1" stopColor="#6ACFEF" />
                    </linearGradient>
                    <linearGradient id="paint10_linear_mobile" x1="-607.502" y1="435.498" x2="652.496" y2="435.498" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F57CD1" />
                        <stop offset="0.37" stopColor="#26F4FC" />
                        <stop offset="0.82" stopColor="#F823D5" />
                        <stop offset="1" stopColor="#65A3E9" />
                    </linearGradient>
                    <linearGradient id="paint11_linear_mobile" x1="-592.593" y1="449.829" x2="667.407" y2="449.829" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#F18ED7" />
                        <stop offset="0.41" stopColor="#2FD4FD" />
                        <stop offset="0.71" stopColor="#F94DD3" />
                        <stop offset="1" stopColor="#F28CE8" />
                    </linearGradient>
                    <linearGradient id="paint12_linear_mobile" x1="-579.903" y1="459.061" x2="680.098" y2="459.061" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F892E8" />
                        <stop offset="0.63" stopColor="#FEFF74" />
                        <stop offset="0.82" stopColor="#EF10CA" />
                    </linearGradient>
                    <linearGradient id="paint13_linear_mobile" x1="-573.231" y1="469.95" x2="686.769" y2="469.95" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5FF5C" />
                        <stop offset="0.45" stopColor="#FBA035" />
                        <stop offset="0.7" stopColor="#FBF779" />
                        <stop offset="0.84" stopColor="#ED1AD6" />
                    </linearGradient>
                    <linearGradient id="paint14_linear_mobile" x1="-562.752" y1="475.26" x2="697.249" y2="475.26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5AA3F" />
                        <stop offset="0.51" stopColor="#FE927C" />
                        <stop offset="0.75" stopColor="#F91BBB" />
                    </linearGradient>
                    <linearGradient id="paint15_linear_mobile" x1="-559.903" y1="485.817" x2="700.097" y2="485.817" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBFD77" />
                        <stop offset="0.38" stopColor="#FB8C66" />
                        <stop offset="0.9" stopColor="#FA28BE" />
                    </linearGradient>
                    <linearGradient id="paint16_linear_mobile" x1="-549.824" y1="491.887" x2="710.176" y2="491.887" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FCFF00" />
                        <stop offset="0.25" stopColor="#EBA0FA" />
                        <stop offset="0.54" stopColor="#FB28E4" />
                        <stop offset="0.74" stopColor="#F77DDC" />
                        <stop offset="1" stopColor="#FF2677" />
                    </linearGradient>
                    <linearGradient id="paint17_linear_mobile" x1="-544.968" y1="502.73" x2="715.032" y2="502.73" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFB7B7" />
                        <stop offset="0.38" stopColor="#FBACEA" />
                        <stop offset="0.62" stopColor="#FB34DF" />
                        <stop offset="0.84" stopColor="#A1FF88" />
                        <stop offset="1" stopColor="#FF1464" />
                    </linearGradient>
                    <linearGradient id="paint18_linear_mobile" x1="-535.286" y1="514.304" x2="724.714" y2="514.304" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#FACE82" />
                        <stop offset="0.38" stopColor="#F46497" />
                        <stop offset="0.72" stopColor="#A6F77D" />
                        <stop offset="0.9" stopColor="#FA80ED" />
                    </linearGradient>
                    <linearGradient id="paint19_linear_mobile" x1="-526.001" y1="530.709" x2="733.999" y2="530.709" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F6BB74" />
                        <stop offset="0.36" stopColor="#F5727F" />
                        <stop offset="0.61" stopColor="#F793CA" />
                        <stop offset="0.82" stopColor="#DDF66E" />
                    </linearGradient>
                    <linearGradient id="paint20_linear_mobile" x1="-511.091" y1="542.575" x2="748.909" y2="542.575" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFDD43" />
                        <stop offset="0.38" stopColor="#FCB16C" />
                        <stop offset="0.79" stopColor="#FFB1D1" />
                        <stop offset="1" stopColor="#FCE6D2" />
                    </linearGradient>
                    <linearGradient id="paint21_linear_mobile" x1="-501.414" y1="548.645" x2="758.586" y2="548.645" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#FAE21A" />
                        <stop offset="0.54" stopColor="#F8DE3D" />
                        <stop offset="0.74" stopColor="#F28D77" />
                        <stop offset="1" stopColor="#F3FC34" />
                    </linearGradient>
                    <linearGradient id="paint22_linear_mobile" x1="-496.956" y1="559.858" x2="763.044" y2="559.858" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED87" />
                        <stop offset="0.02" stopColor="#FFF04B" />
                        <stop offset="0.49" stopColor="#D0ED6B" />
                        <stop offset="0.62" stopColor="#F3E668" />
                        <stop offset="0.84" stopColor="#F2A858" />
                    </linearGradient>
                    <linearGradient id="paint23_linear_mobile" x1="-487.27" y1="573.9" x2="772.73" y2="573.9" gradientUnits="userSpaceOnUse">
                        <stop offset="0.14" stopColor="#17D7D7" />
                        <stop offset="0.47" stopColor="#B4EB4C" />
                        <stop offset="0.83" stopColor="#FEA766" />
                    </linearGradient>
                    <linearGradient id="paint24_linear_mobile" x1="-474.38" y1="579.392" x2="785.62" y2="579.392" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#0097F8" />
                        <stop offset="0.54" stopColor="#55F15D" />
                        <stop offset="0.86" stopColor="#FF8E6E" />
                        <stop offset="1" stopColor="#F5F286" />
                    </linearGradient>
                    <linearGradient id="paint25_linear_mobile" x1="-471.13" y1="587.234" x2="788.87" y2="587.234" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00A0F9" />
                        <stop offset="0.39" stopColor="#9CF29A" />
                        <stop offset="0.66" stopColor="#FCBC4F" />
                        <stop offset="0.8" stopColor="#F65986" />
                        <stop offset="0.96" stopColor="#F7F893" />
                    </linearGradient>
                    <linearGradient id="paint26_linear_mobile" x1="-463.861" y1="595.414" x2="796.14" y2="595.414" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0058F1" />
                        <stop offset="0.41" stopColor="#F8D84E" />
                        <stop offset="0.63" stopColor="#FABC4E" />
                        <stop offset="0.82" stopColor="#F76A90" />
                        <stop offset="1" stopColor="#F7EB85" />
                    </linearGradient>
                    <linearGradient id="paint27_linear_mobile" x1="-456.995" y1="612.068" x2="803.005" y2="612.068" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#007EF5" />
                        <stop offset="0.36" stopColor="#C4FA33" />
                        <stop offset="0.61" stopColor="#5FF5B9" />
                        <stop offset="0.82" stopColor="#F7E64A" />
                        <stop offset="0.99" stopColor="#F6ED91" />
                    </linearGradient>
                    <linearGradient id="paint28_linear_mobile" x1="-442.083" y1="621.405" x2="817.917" y2="621.405" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#1FB2FE" />
                        <stop offset="0.4" stopColor="#BBF852" />
                        <stop offset="0.68" stopColor="#F3B943" />
                        <stop offset="0.82" stopColor="#F47CF9" />
                        <stop offset="0.99" stopColor="#9AEBE0" />
                    </linearGradient>
                    <linearGradient id="paint29_linear_mobile" x1="-434.814" y1="625.602" x2="825.186" y2="625.602" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#3EBBFB" />
                        <stop offset="0.38" stopColor="#8CF762" />
                        <stop offset="0.64" stopColor="#F4CF6F" />
                        <stop offset="0.86" stopColor="#F27088" />
                        <stop offset="1" stopColor="#E4F8A8" />
                    </linearGradient>
                    <linearGradient id="paint30_linear_mobile" x1="-431.165" y1="634.242" x2="828.835" y2="634.242" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#00F2D2" />
                        <stop offset="0.4" stopColor="#F7EB5F" />
                        <stop offset="0.68" stopColor="#F1AF79" />
                        <stop offset="0.85" stopColor="#F04F8C" />
                        <stop offset="0.96" stopColor="#ECF75B" />
                    </linearGradient>
                    <linearGradient id="paint31_linear_mobile" x1="-423.896" y1="645.321" x2="836.104" y2="645.321" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#02DEE5" />
                        <stop offset="0.38" stopColor="#E6BDF1" />
                        <stop offset="0.84" stopColor="#FE2AD3" />
                        <stop offset="1" stopColor="#FDC4E0" />
                    </linearGradient>
                    <linearGradient id="paint32_linear_mobile" x1="-414.218" y1="653.81" x2="845.782" y2="653.81" gradientUnits="userSpaceOnUse">
                        <stop offset="0.11" stopColor="#1FD2E8" />
                        <stop offset="0.47" stopColor="#F2F97B" />
                        <stop offset="0.79" stopColor="#F710DB" />
                        <stop offset="0.96" stopColor="#FCBCE5" />
                    </linearGradient>
                    <linearGradient id="paint33_linear_mobile" x1="-406.949" y1="658.009" x2="853.051" y2="658.009" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#02E0E3" />
                        <stop offset="0.51" stopColor="#E0FD56" />
                        <stop offset="0.86" stopColor="#F413D5" />
                        <stop offset="1" stopColor="#F2D5EB" />
                    </linearGradient>
                    <linearGradient id="paint34_linear_mobile" x1="-403.698" y1="669.178" x2="856.302" y2="669.178" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#FCA96C" />
                        <stop offset="0.44" stopColor="#E5F390" />
                        <stop offset="0.71" stopColor="#F522DB" />
                        <stop offset="0.92" stopColor="#F5D2E9" />
                    </linearGradient>
                    <linearGradient id="paint35_linear_mobile" x1="-390.539" y1="683.588" x2="869.461" y2="683.588" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#FC8755" />
                        <stop offset="0.51" stopColor="#F1EC5A" />
                        <stop offset="0.69" stopColor="#F886B0" />
                        <stop offset="0.81" stopColor="#F37EDB" />
                        <stop offset="1" stopColor="#F5D2E6" />
                    </linearGradient>
                    <linearGradient id="paint36_linear_mobile" x1="-381.923" y1="695.162" x2="878.077" y2="695.162" gradientUnits="userSpaceOnUse">
                        <stop offset="0.29" stopColor="#FF7059" />
                        <stop offset="0.53" stopColor="#FEF562" />
                        <stop offset="0.71" stopColor="#F28CED" />
                        <stop offset="0.92" stopColor="#FA3CC2" />
                    </linearGradient>
                    <linearGradient id="paint37_linear_mobile" x1="-372.243" y1="708.465" x2="887.757" y2="708.465" gradientUnits="userSpaceOnUse">
                        <stop offset="0.05" stopColor="#F7A1C7" />
                        <stop offset="0.47" stopColor="#EA5D45" />
                        <stop offset="0.69" stopColor="#FDF867" />
                        <stop offset="0.81" stopColor="#FF9AE0" />
                        <stop offset="1" stopColor="#FEDBE6" />
                    </linearGradient>
                    <linearGradient id="paint38_linear_mobile" x1="-359.352" y1="713.526" x2="900.649" y2="713.526" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#C797D3" />
                        <stop offset="0.51" stopColor="#FF90C1" />
                        <stop offset="0.7" stopColor="#F6F28E" />
                        <stop offset="0.86" stopColor="#F469A2" />
                        <stop offset="1" stopColor="#EED5DB" />
                    </linearGradient>
                    <linearGradient id="paint39_linear_mobile" x1="-356.105" y1="722.168" x2="903.895" y2="722.168" gradientUnits="userSpaceOnUse">
                        <stop offset="0.37" stopColor="#D978FD" />
                        <stop offset="0.57" stopColor="#FF91C1" />
                        <stop offset="0.68" stopColor="#F4EF9B" />
                        <stop offset="0.85" stopColor="#F47DB6" />
                        <stop offset="0.96" stopColor="#E847FB" />
                    </linearGradient>
                    <linearGradient id="paint40_linear_mobile" x1="-349.625" y1="738.822" x2="910.375" y2="738.822" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E67D96" />
                        <stop offset="0.36" stopColor="#FCB5E9" />
                        <stop offset="0.65" stopColor="#EEFE3F" />
                        <stop offset="0.87" stopColor="#F46AD6" />
                        <stop offset="1" stopColor="#DE6CFB" />
                    </linearGradient>
                    <linearGradient id="paint41_linear_mobile" x1="-335.115" y1="755.891" x2="924.882" y2="755.891" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#EC9E64" />
                        <stop offset="0.52" stopColor="#F38DA1" />
                        <stop offset="0.72" stopColor="#D1FC61" />
                        <stop offset="0.88" stopColor="#D258FB" />
                    </linearGradient>
                    <linearGradient id="paint42_linear_mobile" x1="-320.604" y1="770.409" x2="939.394" y2="770.409" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F1AE51" />
                        <stop offset="0.35" stopColor="#F7C468" />
                        <stop offset="0.6" stopColor="#FB9498" />
                        <stop offset="0.81" stopColor="#FFB1D5" />
                        <stop offset="1" stopColor="#FF70FA" />
                    </linearGradient>
                    <linearGradient id="paint43_linear_mobile" x1="-307.714" y1="776.478" x2="952.286" y2="776.478" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FEE559" />
                        <stop offset="0.31" stopColor="#FFF174" />
                        <stop offset="0.54" stopColor="#F5EA9B" />
                        <stop offset="0.74" stopColor="#F9977D" />
                        <stop offset="1" stopColor="#F5EBCA" />
                    </linearGradient>
                    <linearGradient id="paint44_linear_mobile" x1="-303.255" y1="789.603" x2="956.745" y2="789.603" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F3FF2C" />
                        <stop offset="0.34" stopColor="#D4FC7D" />
                        <stop offset="0.6" stopColor="#F6E56C" />
                        <stop offset="0.84" stopColor="#F8B251" />
                        <stop offset="1" stopColor="#FED54D" />
                    </linearGradient>
                    <linearGradient id="paint45_linear_mobile" x1="-290.767" y1="801.918" x2="969.233" y2="801.918" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC6C81" />
                        <stop offset="0.45" stopColor="#FCF64B" />
                        <stop offset="0.79" stopColor="#FEA34D" />
                        <stop offset="1" stopColor="#FFC029" />
                    </linearGradient>
                    <linearGradient id="paint46_linear_mobile" x1="-281.481" y1="818.325" x2="978.519" y2="818.325" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF777A" />
                        <stop offset="0.25" stopColor="#FC6AD4" />
                        <stop offset="0.5" stopColor="#FFFF74" />
                        <stop offset="0.92" stopColor="#EBFF30" />
                    </linearGradient>
                    <linearGradient id="paint47_linear_mobile" x1="-266.972" y1="835.581" x2="993.028" y2="835.581" gradientUnits="userSpaceOnUse">
                        <stop offset="0.33" stopColor="#FF8BB8" />
                        <stop offset="0.68" stopColor="#FFF339" />
                    </linearGradient>
                    <linearGradient id="paint48_linear_mobile" x1="-251.662" y1="841.179" x2="1008.34" y2="841.179" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC8181" />
                        <stop offset="0.44" stopColor="#FFF724" />
                        <stop offset="0.6" stopColor="#B5F953" />
                        <stop offset="1" stopColor="#FFE13B" />
                    </linearGradient>
                    <linearGradient id="paint49_linear_mobile" x1="-248.411" y1="851.55" x2="1011.59" y2="851.55" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5EFF45" />
                        <stop offset="0.45" stopColor="#00E8E5" />
                        <stop offset="0.79" stopColor="#F47842" />
                        <stop offset="1" stopColor="#EC366A" />
                    </linearGradient>
                    <linearGradient id="paint50_linear_mobile" x1="-238.334" y1="856.245" x2="1021.67" y2="856.245" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7DFF92" />
                        <stop offset="0.37" stopColor="#00E9D5" />
                        <stop offset="0.51" stopColor="#00E73E" />
                        <stop offset="0.75" stopColor="#E5B1B0" />
                        <stop offset="1" stopColor="#F3476E" />
                    </linearGradient>
                    <linearGradient id="paint51_linear_mobile" x1="-235.083" y1="866.483" x2="1024.92" y2="866.483" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#71FF9B" />
                        <stop offset="0.38" stopColor="#00E9D6" />
                        <stop offset="0.49" stopColor="#00E81D" />
                        <stop offset="0.62" stopColor="#3DE5B6" />
                        <stop offset="0.79" stopColor="#EFA4A0" />
                        <stop offset="1" stopColor="#F73A8C" />
                    </linearGradient>
                    <linearGradient id="paint52_linear_mobile" x1="-225.8" y1="881.452" x2="1034.2" y2="881.452" gradientUnits="userSpaceOnUse">
                        <stop offset="0.12" stopColor="#FB7064" />
                        <stop offset="0.4" stopColor="#00E188" />
                        <stop offset="0.62" stopColor="#00DED2" />
                        <stop offset="0.83" stopColor="#F5793C" />
                        <stop offset="1" stopColor="#ED3D57" />
                    </linearGradient>
                    <linearGradient id="paint53_linear_mobile" x1="-214.106" y1="898.23" x2="1045.89" y2="898.23" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FE4593" />
                        <stop offset="0.54" stopColor="#00D4D9" />
                        <stop offset="0.69" stopColor="#F18679" />
                        <stop offset="1" stopColor="#F01B88" />
                    </linearGradient>
                    <linearGradient id="paint54_linear_mobile" x1="-198.794" y1="907.383" x2="1061.21" y2="907.383" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#FF67AB" />
                        <stop offset="0.57" stopColor="#00D5D8" />
                        <stop offset="0.76" stopColor="#EAA4E1" />
                        <stop offset="0.88" stopColor="#FC12E3" />
                        <stop offset="1" stopColor="#6ACFEF" />
                    </linearGradient>
                    <linearGradient id="paint55_linear_mobile" x1="-192.322" y1="923.851" x2="1067.68" y2="923.851" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F57CD1" />
                        <stop offset="0.37" stopColor="#26F4FC" />
                        <stop offset="0.82" stopColor="#F823D5" />
                        <stop offset="1" stopColor="#65A3E9" />
                    </linearGradient>
                    <linearGradient id="paint56_linear_mobile" x1="-177.417" y1="938.182" x2="1082.58" y2="938.182" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#F18ED7" />
                        <stop offset="0.41" stopColor="#2FD4FD" />
                        <stop offset="0.71" stopColor="#F94DD3" />
                        <stop offset="1" stopColor="#F28CE8" />
                    </linearGradient>
                    <linearGradient id="paint57_linear_mobile" x1="-164.719" y1="947.414" x2="1095.28" y2="947.414" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F892E8" />
                        <stop offset="0.63" stopColor="#FEFF74" />
                        <stop offset="0.82" stopColor="#EF10CA" />
                    </linearGradient>
                    <linearGradient id="paint58_linear_mobile" x1="-158.052" y1="958.304" x2="1101.95" y2="958.304" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5FF5C" />
                        <stop offset="0.45" stopColor="#FBA035" />
                        <stop offset="0.7" stopColor="#FBF779" />
                        <stop offset="0.84" stopColor="#ED1AD6" />
                    </linearGradient>
                    <linearGradient id="paint59_linear_mobile" x1="-147.572" y1="963.613" x2="1112.43" y2="963.613" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5AA3F" />
                        <stop offset="0.51" stopColor="#FE927C" />
                        <stop offset="0.75" stopColor="#F91BBB" />
                    </linearGradient>
                    <linearGradient id="paint60_linear_mobile" x1="-144.72" y1="974.17" x2="1115.28" y2="974.17" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBFD77" />
                        <stop offset="0.38" stopColor="#FB8C66" />
                        <stop offset="0.9" stopColor="#FA28BE" />
                    </linearGradient>
                    <linearGradient id="paint61_linear_mobile" x1="-134.644" y1="980.24" x2="1125.36" y2="980.24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FCFF00" />
                        <stop offset="0.25" stopColor="#EBA0FA" />
                        <stop offset="0.54" stopColor="#FB28E4" />
                        <stop offset="0.74" stopColor="#F77DDC" />
                        <stop offset="1" stopColor="#FF2677" />
                    </linearGradient>
                    <linearGradient id="paint62_linear_mobile" x1="-129.789" y1="991.083" x2="1130.21" y2="991.083" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFB7B7" />
                        <stop offset="0.38" stopColor="#FBACEA" />
                        <stop offset="0.62" stopColor="#FB34DF" />
                        <stop offset="0.84" stopColor="#A1FF88" />
                        <stop offset="1" stopColor="#FF1464" />
                    </linearGradient>
                    <linearGradient id="paint63_linear_mobile" x1="-120.103" y1="1002.66" x2="1139.9" y2="1002.66" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#FACE82" />
                        <stop offset="0.38" stopColor="#F46497" />
                        <stop offset="0.72" stopColor="#A6F77D" />
                        <stop offset="0.9" stopColor="#FA80ED" />
                    </linearGradient>
                    <linearGradient id="paint64_linear_mobile" x1="-110.821" y1="1019.06" x2="1149.18" y2="1019.06" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F6BB74" />
                        <stop offset="0.36" stopColor="#F5727F" />
                        <stop offset="0.61" stopColor="#F793CA" />
                        <stop offset="0.82" stopColor="#DDF66E" />
                    </linearGradient>
                    <linearGradient id="paint65_linear_mobile" x1="-95.9113" y1="1030.93" x2="1164.09" y2="1030.93" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFDD43" />
                        <stop offset="0.38" stopColor="#FCB16C" />
                        <stop offset="0.79" stopColor="#FFB1D1" />
                        <stop offset="1" stopColor="#FCE6D2" />
                    </linearGradient>
                    <linearGradient id="paint66_linear_mobile" x1="-86.2301" y1="1037" x2="1173.77" y2="1037" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#FAE21A" />
                        <stop offset="0.54" stopColor="#F8DE3D" />
                        <stop offset="0.74" stopColor="#F28D77" />
                        <stop offset="1" stopColor="#F3FC34" />
                    </linearGradient>
                    <linearGradient id="paint67_linear_mobile" x1="-81.7727" y1="1048.21" x2="1178.23" y2="1048.21" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED87" />
                        <stop offset="0.02" stopColor="#FFF04B" />
                        <stop offset="0.49" stopColor="#D0ED6B" />
                        <stop offset="0.62" stopColor="#F3E668" />
                        <stop offset="0.84" stopColor="#F2A858" />
                    </linearGradient>
                    <linearGradient id="paint68_linear_mobile" x1="-72.0907" y1="1062.25" x2="1187.91" y2="1062.25" gradientUnits="userSpaceOnUse">
                        <stop offset="0.14" stopColor="#17D7D7" />
                        <stop offset="0.47" stopColor="#B4EB4C" />
                        <stop offset="0.83" stopColor="#FEA766" />
                    </linearGradient>
                    <linearGradient id="paint69_linear_mobile" x1="-59.2007" y1="1067.74" x2="1200.8" y2="1067.74" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#0097F8" />
                        <stop offset="0.54" stopColor="#55F15D" />
                        <stop offset="0.86" stopColor="#FF8E6E" />
                        <stop offset="1" stopColor="#F5F286" />
                    </linearGradient>
                    <linearGradient id="paint70_linear_mobile" x1="-55.9504" y1="1075.59" x2="1204.05" y2="1075.59" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00A0F9" />
                        <stop offset="0.39" stopColor="#9CF29A" />
                        <stop offset="0.66" stopColor="#FCBC4F" />
                        <stop offset="0.8" stopColor="#F65986" />
                        <stop offset="0.96" stopColor="#F7F893" />
                    </linearGradient>
                    <linearGradient id="paint71_linear_mobile" x1="-48.6848" y1="1083.77" x2="1211.32" y2="1083.77" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0058F1" />
                        <stop offset="0.41" stopColor="#F8D84E" />
                        <stop offset="0.63" stopColor="#FABC4E" />
                        <stop offset="0.82" stopColor="#F76A90" />
                        <stop offset="1" stopColor="#F7EB85" />
                    </linearGradient>
                    <linearGradient id="paint72_linear_mobile" x1="-41.8118" y1="1100.42" x2="1218.19" y2="1100.42" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#007EF5" />
                        <stop offset="0.36" stopColor="#C4FA33" />
                        <stop offset="0.61" stopColor="#5FF5B9" />
                        <stop offset="0.82" stopColor="#F7E64A" />
                        <stop offset="0.99" stopColor="#F6ED91" />
                    </linearGradient>
                    <linearGradient id="paint73_linear_mobile" x1="-26.9035" y1="1109.76" x2="1233.1" y2="1109.76" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#1FB2FE" />
                        <stop offset="0.4" stopColor="#BBF852" />
                        <stop offset="0.68" stopColor="#F3B943" />
                        <stop offset="0.82" stopColor="#F47CF9" />
                        <stop offset="0.99" stopColor="#9AEBE0" />
                    </linearGradient>
                    <linearGradient id="paint74_linear_mobile" x1="-19.6301" y1="1113.95" x2="1240.37" y2="1113.95" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#3EBBFB" />
                        <stop offset="0.38" stopColor="#8CF762" />
                        <stop offset="0.64" stopColor="#F4CF6F" />
                        <stop offset="0.86" stopColor="#F27088" />
                        <stop offset="1" stopColor="#E4F8A8" />
                    </linearGradient>
                    <linearGradient id="paint75_linear_mobile" x1="-15.9856" y1="1122.6" x2="1244.01" y2="1122.6" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#00F2D2" />
                        <stop offset="0.4" stopColor="#F7EB5F" />
                        <stop offset="0.68" stopColor="#F1AF79" />
                        <stop offset="0.85" stopColor="#F04F8C" />
                        <stop offset="0.96" stopColor="#ECF75B" />
                    </linearGradient>
                    <linearGradient id="paint76_linear_mobile" x1="-8.71603" y1="1133.67" x2="1251.28" y2="1133.67" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#02DEE5" />
                        <stop offset="0.38" stopColor="#E6BDF1" />
                        <stop offset="0.84" stopColor="#FE2AD3" />
                        <stop offset="1" stopColor="#FDC4E0" />
                    </linearGradient>
                    <linearGradient id="paint77_linear_mobile" x1="0.965241" y1="1142.16" x2="1260.97" y2="1142.16" gradientUnits="userSpaceOnUse">
                        <stop offset="0.11" stopColor="#1FD2E8" />
                        <stop offset="0.47" stopColor="#F2F97B" />
                        <stop offset="0.79" stopColor="#F710DB" />
                        <stop offset="0.96" stopColor="#FCBCE5" />
                    </linearGradient>
                    <linearGradient id="paint78_linear_mobile" x1="8.23087" y1="1146.36" x2="1268.23" y2="1146.36" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#02E0E3" />
                        <stop offset="0.51" stopColor="#E0FD56" />
                        <stop offset="0.86" stopColor="#F413D5" />
                        <stop offset="1" stopColor="#F2D5EB" />
                    </linearGradient>
                    <linearGradient id="paint79_linear_mobile" x1="11.4812" y1="1157.53" x2="1271.48" y2="1157.53" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#FCA96C" />
                        <stop offset="0.44" stopColor="#E5F390" />
                        <stop offset="0.71" stopColor="#F522DB" />
                        <stop offset="0.92" stopColor="#F5D2E9" />
                    </linearGradient>
                    <linearGradient id="paint80_linear_mobile" x1="24.6448" y1="1171.94" x2="1284.64" y2="1171.94" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#FC8755" />
                        <stop offset="0.51" stopColor="#F1EC5A" />
                        <stop offset="0.69" stopColor="#F886B0" />
                        <stop offset="0.81" stopColor="#F37EDB" />
                        <stop offset="1" stopColor="#F5D2E6" />
                    </linearGradient>
                    <linearGradient id="paint81_linear_mobile" x1="33.257" y1="1183.52" x2="1293.26" y2="1183.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0.29" stopColor="#FF7059" />
                        <stop offset="0.53" stopColor="#FEF562" />
                        <stop offset="0.71" stopColor="#F28CED" />
                        <stop offset="0.92" stopColor="#FA3CC2" />
                    </linearGradient>
                    <linearGradient id="paint82_linear_mobile" x1="42.9406" y1="1196.82" x2="1302.94" y2="1196.82" gradientUnits="userSpaceOnUse">
                        <stop offset="0.05" stopColor="#F7A1C7" />
                        <stop offset="0.47" stopColor="#EA5D45" />
                        <stop offset="0.69" stopColor="#FDF867" />
                        <stop offset="0.81" stopColor="#FF9AE0" />
                        <stop offset="1" stopColor="#FEDBE6" />
                    </linearGradient>
                    <linearGradient id="paint83_linear_mobile" x1="55.8282" y1="1201.88" x2="1315.83" y2="1201.88" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#C797D3" />
                        <stop offset="0.51" stopColor="#FF90C1" />
                        <stop offset="0.7" stopColor="#F6F28E" />
                        <stop offset="0.86" stopColor="#F469A2" />
                        <stop offset="1" stopColor="#EED5DB" />
                    </linearGradient>
                    <linearGradient id="paint84_linear_mobile" x1="59.0785" y1="1210.52" x2="1319.08" y2="1210.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0.37" stopColor="#D978FD" />
                        <stop offset="0.57" stopColor="#FF91C1" />
                        <stop offset="0.68" stopColor="#F4EF9B" />
                        <stop offset="0.85" stopColor="#F47DB6" />
                        <stop offset="0.96" stopColor="#E847FB" />
                    </linearGradient>
                    <linearGradient id="paint85_linear_mobile" x1="65.5542" y1="1227.17" x2="1325.55" y2="1227.17" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E67D96" />
                        <stop offset="0.36" stopColor="#FCB5E9" />
                        <stop offset="0.65" stopColor="#EEFE3F" />
                        <stop offset="0.87" stopColor="#F46AD6" />
                        <stop offset="1" stopColor="#DE6CFB" />
                    </linearGradient>
                    <linearGradient id="paint86_linear_mobile" x1="80.0682" y1="1244.24" x2="1340.07" y2="1244.24" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#EC9E64" />
                        <stop offset="0.52" stopColor="#F38DA1" />
                        <stop offset="0.72" stopColor="#D1FC61" />
                        <stop offset="0.88" stopColor="#D258FB" />
                    </linearGradient>
                    <linearGradient id="paint87_linear_mobile" x1="94.5761" y1="1258.76" x2="1354.57" y2="1258.76" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F1AE51" />
                        <stop offset="0.35" stopColor="#F7C468" />
                        <stop offset="0.6" stopColor="#FB9498" />
                        <stop offset="0.81" stopColor="#FFB1D5" />
                        <stop offset="1" stopColor="#FF70FA" />
                    </linearGradient>
                    <linearGradient id="paint88_linear_mobile" x1="107.465" y1="1264.83" x2="1367.47" y2="1264.83" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FEE559" />
                        <stop offset="0.31" stopColor="#FFF174" />
                        <stop offset="0.54" stopColor="#F5EA9B" />
                        <stop offset="0.74" stopColor="#F9977D" />
                        <stop offset="1" stopColor="#F5EBCA" />
                    </linearGradient>
                    <linearGradient id="paint89_linear_mobile" x1="111.925" y1="1277.96" x2="1371.93" y2="1277.96" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F3FF2C" />
                        <stop offset="0.34" stopColor="#D4FC7D" />
                        <stop offset="0.6" stopColor="#F6E56C" />
                        <stop offset="0.84" stopColor="#F8B251" />
                        <stop offset="1" stopColor="#FED54D" />
                    </linearGradient>
                    {/* Add all other gradients following the same pattern */}
                    {/* ... */}

                    <clipPath id="clip0_mobile">
                        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default MobileDiagonalAnimation;