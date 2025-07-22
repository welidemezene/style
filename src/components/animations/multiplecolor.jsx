
import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * Understanding of the design:
 * The user wants the animated progress bar SVG to cover the full page, regardless of screen size.
 * This means the SVG should always fill 100vw x 100vh, and the animation should scale accordingly.
 * To achieve this, we will:
 *   - Make the SVG responsive using width="100%" height="100%" and preserveAspectRatio="none"
 *   - Animate the mask rectangles from width 0 to 100% of the SVG's bounding box, using viewBox units
 *   - Use refs and resize observer to update the mask rects' widths on resize, so the animation always fills the screen
 *   - The SVG's viewBox remains 0 0 1366 768, so all paths/gradients remain correct, but the SVG stretches to fill the screen
 */

const LINE_COUNT = 37;

// Durations for each line (in seconds), can be randomized or set as desired
const LINE_DURATIONS = [
    2.0, 3.2, 2.7, 2.4, 3.0, 2.1, 2.8, 3.5, 2.3, 2.9, 2.2, 3.1, 2.6, 2.5, 2.7, 2.0, 3.3, 2.8,
    2.4, 3.0, 2.1, 2.7, 2.5, 3.2, 2.6, 2.9, 2.3, 3.4, 2.2, 2.8, 2.7, 2.5, 3.1, 2.6, 2.9, 2.3, 3.0
];

const SVG_WIDTH = 1366;
const SVG_HEIGHT = 768;

const MultipleColorLines = () => {
    // Refs for each mask rect
    const maskRectRefs = useRef([]);
    // Ref for the SVG element
    const svgRef = useRef(null);

    // Helper to animate all mask rects
    const animateRects = useCallback(() => {
        maskRectRefs.current.forEach((rect, i) => {
            if (rect) {
                // Reset width to 0 before animating
                gsap.set(rect, { width: 0 });
                gsap.to(
                    rect,
                    {
                        width: SVG_WIDTH,
                        duration: LINE_DURATIONS[i % LINE_DURATIONS.length],
                        delay: i * 0.08,
                        ease: "power2.inOut"
                    }
                );
            }
        });
    }, []);

    // Animate on mount and when window resizes
    useEffect(() => {
        animateRects();

        // Re-animate on resize to ensure mask covers full SVG
        const handleResize = () => {
            // If the SVG is resized, we want to reset and re-animate the masks
            animateRects();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [animateRects]);

    // Array of path data and gradient ids (extracted from the original SVG)
    const paths = [
        { d: "M1633.07 614.364V648.072L-266.852 648.009V614.301L1633.07 614.364Z", fill: "url(#paint0_linear_3279_71637)" },
        { d: "M1633.07 406.509V440.217L-266.844 440.154V406.446L1633.07 406.509Z", fill: "url(#paint1_linear_3279_71637)" },
        { d: "M1633.07 440.214V473.922L-266.844 473.859V440.151L1633.07 440.214Z", fill: "url(#paint2_linear_3279_71637)" },
        { d: "M1633.07 563.806V597.514L-266.852 597.451V563.743L1633.07 563.806Z", fill: "url(#paint3_linear_3279_71637)" },
        { d: "M1633.07 384.037V406.507L-266.844 406.443V383.974L1633.07 384.037Z", fill: "url(#paint4_linear_3279_71637)" },
        { d: "M1633.07 482.348V504.818L-266.848 504.755V482.285L1633.07 482.348Z", fill: "url(#paint5_linear_3279_71637)" },
        { d: "M1633.06 693.013V715.483L-266.855 715.419V692.95L1633.06 693.013Z", fill: "url(#paint6_linear_3279_71637)" },
        { d: "M1633.06 757.618V780.088L-266.852 780.024V757.555L1633.06 757.618Z", fill: "url(#paint7_linear_3279_71637)" },
        { d: "M1633.07 513.246V535.716L-266.848 535.652V513.183L1633.07 513.246Z", fill: "url(#paint8_linear_3279_71637)" },
        { d: "M1633.06 723.909V746.378L-266.855 746.315V723.845L1633.06 723.909Z", fill: "url(#paint9_linear_3279_71637)" },
        { d: "M1633.07 535.717V563.808L-266.848 563.744V535.657L1633.07 535.721V535.717Z", fill: "url(#paint10_linear_3279_71637)" },
        { d: "M1633.07 648.072V676.159L-266.848 676.096V648.009L1633.07 648.072Z", fill: "url(#paint11_linear_3279_71637)" },
        { d: "M1633.06 676.157V693.009L-266.855 692.946V676.094L1633.06 676.157Z", fill: "url(#paint12_linear_3279_71637)" },
        { d: "M1633.06 597.511V614.363L-266.852 614.3V597.448L1633.06 597.511Z", fill: "url(#paint13_linear_3279_71637)" },
        { d: "M1633.07 473.923V482.349L-266.844 482.286V473.859L1633.07 473.923Z", fill: "url(#paint14_linear_3279_71637)" },
        { d: "M1633.07 504.818V513.244L-266.844 513.181V504.755L1633.07 504.818Z", fill: "url(#paint15_linear_3279_71637)" },
        { d: "M1633.06 715.483V723.909L-266.855 723.846V715.42L1633.06 715.483Z", fill: "url(#paint16_linear_3279_71637)" },
        { d: "M1633.06 746.383V757.618L-266.852 757.555V746.32L1633.06 746.383Z", fill: "url(#paint17_linear_3279_71637)" },
        { d: "M1633.08 282.917V316.624L-266.84 316.561V282.853L1633.08 282.917Z", fill: "url(#paint18_linear_3279_71637)" },
        { d: "M1633.08 249.214V282.922L-266.84 282.859V249.151L1633.08 249.214Z", fill: "url(#paint19_linear_3279_71637)" },
        { d: "M1633.09 -0.778155V32.9296L-266.828 32.8664V-0.84137L1633.09 -0.778155Z", fill: "url(#paint20_linear_3279_71637)" },
        { d: "M1633.08 32.9305V49.7827L-266.832 49.7194V32.8673L1633.08 32.9305Z", fill: "url(#paint21_linear_3279_71637)" },
        { d: "M1633.08 58.2077V75.0599L-266.832 74.9967V58.1445L1633.08 58.2077Z", fill: "url(#paint22_linear_3279_71637)" },
        { d: "M1633.08 97.5335V114.386L-266.832 114.322V97.4703L1633.08 97.5335Z", fill: "url(#paint23_linear_3279_71637)" },
        { d: "M1633.08 232.361V249.213L-266.836 249.15V232.298L1633.08 232.361Z", fill: "url(#paint24_linear_3279_71637)" },
        { d: "M1633.08 75.0633V97.5329L-266.832 97.4696V75.0001L1633.08 75.0633Z", fill: "url(#paint25_linear_3279_71637)" },
        { d: "M1633.08 122.815V145.284L-266.832 145.221V122.752L1633.08 122.815Z", fill: "url(#paint26_linear_3279_71637)" },
        { d: "M1633.08 173.37V195.84L-266.836 195.776V173.307L1633.08 173.37Z", fill: "url(#paint27_linear_3279_71637)" },
        { d: "M1633.08 145.284V173.374L-266.836 173.311V145.221L1633.08 145.284Z", fill: "url(#paint28_linear_3279_71637)" },
        { d: "M1633.08 195.843V223.934L-266.836 223.87V195.784L1633.08 195.847V195.843Z", fill: "url(#paint29_linear_3279_71637)" },
        { d: "M1633.08 316.626V344.717L-266.84 344.653V316.563L1633.08 316.626Z", fill: "url(#paint30_linear_3279_71637)" },
        { d: "M1633.07 355.951V384.038L-266.844 383.975V355.888L1633.07 355.951Z", fill: "url(#paint31_linear_3279_71637)" },
        { d: "M1633.09 -17.6292V-0.777029L-266.828 -0.840244V-17.6924L1633.09 -17.6292Z", fill: "url(#paint32_linear_3279_71637)" },
        { d: "M1633.08 49.782V58.208L-266.832 58.1448V49.7188L1633.08 49.782Z", fill: "url(#paint33_linear_3279_71637)" },
        { d: "M1633.08 114.385V122.811L-266.832 122.747V114.321L1633.08 114.385Z", fill: "url(#paint34_linear_3279_71637)" },
        { d: "M1633.08 223.931V232.357L-266.836 232.294V223.868L1633.08 223.931Z", fill: "url(#paint35_linear_3279_71637)" },
        { d: "M1633.08 344.714V355.949L-266.84 355.886V344.651L1633.08 344.714Z", fill: "url(#paint36_linear_3279_71637)" },
    ];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 9999, // ensure it covers the page
                background: 'white', // optional: background color
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ display: 'block', width: '100vw', height: '100vh' }}
            >
                <defs>
                    {/* Define a mask for each line */}
                    {paths.map((_, i) => (
                        <mask id={`progress-mask-${i}`} key={`mask-${i}`}>
                            <rect
                                ref={el => maskRectRefs.current[i] = el}
                                x="0"
                                y="0"
                                width={SVG_WIDTH}
                                height={SVG_HEIGHT}
                                fill="white"
                            />
                        </mask>
                    ))}
                </defs>
                {/* Each line is masked by its own growing rect */}
                <g clipPath="url(#clip0_3279_71637)">
                    {paths.map((path, i) => (
                        <g mask={`url(#progress-mask-${i})`} key={`line-${i}`}>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d={path.d}
                                fill={path.fill}
                                stroke="white"
                                strokeWidth="2"
                            />
                        </g>
                    ))}
                </g>
                {/* Gradients and clipPath definitions */}
                <defs>
                    {/* ... All the original linearGradient and clipPath definitions ... */}
                    <linearGradient id="paint0_linear_3279_71637" x1="-266.531" y1="635.786" x2="1633.39" y2="635.786" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F57CD1" />
                        <stop offset="0.37" stopColor="#26F4FC" />
                        <stop offset="0.82" stopColor="#F823D5" />
                        <stop offset="1" stopColor="#65A3E9" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_3279_71637" x1="-265.926" y1="427.65" x2="1633.99" y2="427.65" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF777A" />
                        <stop offset="0.25" stopColor="#FC6AD4" />
                        <stop offset="0.5" stopColor="#FFFF74" />
                        <stop offset="0.92" stopColor="#EBFF30" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_3279_71637" x1="-265.93" y1="461.636" x2="1633.99" y2="461.636" gradientUnits="userSpaceOnUse">
                        <stop offset="0.33" stopColor="#FF8BB8" />
                        <stop offset="0.68" stopColor="#FFF339" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_3279_71637" x1="-266.534" y1="585.225" x2="1633.38" y2="585.225" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FE4593" />
                        <stop offset="0.54" stopColor="#00D4D9" />
                        <stop offset="0.69" stopColor="#F18679" />
                        <stop offset="1" stopColor="#F01B88" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_3279_71637" x1="-265.326" y1="397.609" x2="1634.59" y2="397.609" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC6C81" />
                        <stop offset="0.45" stopColor="#FCF64B" />
                        <stop offset="0.79" stopColor="#FEA34D" />
                        <stop offset="1" stopColor="#FFC029" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_3279_71637" x1="-265.33" y1="495.643" x2="1634.59" y2="495.643" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5EFF45" />
                        <stop offset="0.45" stopColor="#00E8E5" />
                        <stop offset="0.79" stopColor="#F47842" />
                        <stop offset="1" stopColor="#EC366A" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_3279_71637" x1="-265.938" y1="706.304" x2="1633.98" y2="706.304" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5FF5C" />
                        <stop offset="0.45" stopColor="#FBA035" />
                        <stop offset="0.7" stopColor="#FBF779" />
                        <stop offset="0.84" stopColor="#ED1AD6" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_3279_71637" x1="-265.337" y1="770.913" x2="1634.58" y2="770.913" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFB7B7" />
                        <stop offset="0.38" stopColor="#FBACEA" />
                        <stop offset="0.62" stopColor="#FB34DF" />
                        <stop offset="0.84" stopColor="#A1FF88" />
                        <stop offset="1" stopColor="#FF1464" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_3279_71637" x1="-265.33" y1="525.417" x2="1634.59" y2="525.417" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#71FF9B" />
                        <stop offset="0.38" stopColor="#00E9D6" />
                        <stop offset="0.49" stopColor="#00E81D" />
                        <stop offset="0.62" stopColor="#3DE5B6" />
                        <stop offset="0.79" stopColor="#EFA4A0" />
                        <stop offset="1" stopColor="#F73A8C" />
                    </linearGradient>
                    <linearGradient id="paint9_linear_3279_71637" x1="-265.938" y1="737.484" x2="1633.98" y2="737.484" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBFD77" />
                        <stop offset="0.38" stopColor="#FB8C66" />
                        <stop offset="0.9" stopColor="#FA28BE" />
                    </linearGradient>
                    <linearGradient id="paint10_linear_3279_71637" x1="-265.934" y1="553.293" x2="1633.98" y2="553.293" gradientUnits="userSpaceOnUse">
                        <stop offset="0.12" stopColor="#FB7064" />
                        <stop offset="0.4" stopColor="#00E188" />
                        <stop offset="0.62" stopColor="#00DED2" />
                        <stop offset="0.83" stopColor="#F5793C" />
                        <stop offset="1" stopColor="#ED3D57" />
                    </linearGradient>
                    <linearGradient id="paint11_linear_3279_71637" x1="-265.934" y1="665.367" x2="1633.98" y2="665.367" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#F18ED7" />
                        <stop offset="0.41" stopColor="#2FD4FD" />
                        <stop offset="0.71" stopColor="#F94DD3" />
                        <stop offset="1" stopColor="#F28CE8" />
                    </linearGradient>
                    <linearGradient id="paint12_linear_3279_71637" x1="-265.036" y1="685.919" x2="1634.88" y2="685.919" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F892E8" />
                        <stop offset="0.63" stopColor="#FEFF74" />
                        <stop offset="0.82" stopColor="#EF10CA" />
                    </linearGradient>
                    <linearGradient id="paint13_linear_3279_71637" x1="-265.334" y1="606.992" x2="1634.58" y2="606.992" gradientUnits="userSpaceOnUse">
                        <stop offset="0.06" stopColor="#FF67AB" />
                        <stop offset="0.57" stopColor="#00D5D8" />
                        <stop offset="0.76" stopColor="#EAA4E1" />
                        <stop offset="0.88" stopColor="#FC12E3" />
                        <stop offset="1" stopColor="#6ACFEF" />
                    </linearGradient>
                    <linearGradient id="paint14_linear_3279_71637" x1="-264.726" y1="478.047" x2="1635.19" y2="478.047" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FC8181" />
                        <stop offset="0.44" stopColor="#FFF724" />
                        <stop offset="0.6" stopColor="#B5F953" />
                        <stop offset="1" stopColor="#FFE13B" />
                    </linearGradient>
                    <linearGradient id="paint15_linear_3279_71637" x1="-264.726" y1="508.019" x2="1635.19" y2="508.019" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7DFF92" />
                        <stop offset="0.37" stopColor="#00E9D5" />
                        <stop offset="0.51" stopColor="#00E73E" />
                        <stop offset="0.75" stopColor="#E5B1B0" />
                        <stop offset="1" stopColor="#F3476E" />
                    </linearGradient>
                    <linearGradient id="paint16_linear_3279_71637" x1="-264.737" y1="719.607" x2="1635.18" y2="719.607" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5AA3F" />
                        <stop offset="0.51" stopColor="#FE927C" />
                        <stop offset="0.75" stopColor="#F91BBB" />
                    </linearGradient>
                    <linearGradient id="paint17_linear_3279_71637" x1="-265.337" y1="751.936" x2="1634.58" y2="751.936" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FCFF00" />
                        <stop offset="0.25" stopColor="#EBA0FA" />
                        <stop offset="0.54" stopColor="#FB28E4" />
                        <stop offset="0.74" stopColor="#F77DDC" />
                        <stop offset="1" stopColor="#FF2677" />
                    </linearGradient>
                    <linearGradient id="paint18_linear_3279_71637" x1="-266.523" y1="304.061" x2="1633.39" y2="304.061" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#EC9E64" />
                        <stop offset="0.52" stopColor="#F38DA1" />
                        <stop offset="0.72" stopColor="#D1FC61" />
                        <stop offset="0.88" stopColor="#D258FB" />
                    </linearGradient>
                    <linearGradient id="paint19_linear_3279_71637" x1="-266.523" y1="270.636" x2="1633.39" y2="270.636" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E67D96" />
                        <stop offset="0.36" stopColor="#FCB5E9" />
                        <stop offset="0.65" stopColor="#EEFE3F" />
                        <stop offset="0.87" stopColor="#F46AD6" />
                        <stop offset="1" stopColor="#DE6CFB" />
                    </linearGradient>
                    <linearGradient id="paint20_linear_3279_71637" x1="-265.914" y1="19.3869" x2="1634" y2="19.3869" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#007EF5" />
                        <stop offset="0.36" stopColor="#C4FA33" />
                        <stop offset="0.61" stopColor="#5FF5B9" />
                        <stop offset="0.82" stopColor="#F7E64A" />
                        <stop offset="0.99" stopColor="#F6ED91" />
                    </linearGradient>
                    <linearGradient id="paint21_linear_3279_71637" x1="-265.314" y1="42.548" x2="1634.6" y2="42.548" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#1FB2FE" />
                        <stop offset="0.4" stopColor="#BBF852" />
                        <stop offset="0.68" stopColor="#F3B943" />
                        <stop offset="0.82" stopColor="#F47CF9" />
                        <stop offset="0.99" stopColor="#9AEBE0" />
                    </linearGradient>
                    <linearGradient id="paint22_linear_3279_71637" x1="-265.314" y1="67.8288" x2="1634.6" y2="67.8288" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#00F2D2" />
                        <stop offset="0.4" stopColor="#F7EB5F" />
                        <stop offset="0.68" stopColor="#F1AF79" />
                        <stop offset="0.85" stopColor="#F04F8C" />
                        <stop offset="0.96" stopColor="#ECF75B" />
                    </linearGradient>
                    <linearGradient id="paint23_linear_3279_71637" x1="-265.318" y1="107.014" x2="1634.6" y2="107.014" gradientUnits="userSpaceOnUse">
                        <stop offset="0.11" stopColor="#1FD2E8" />
                        <stop offset="0.47" stopColor="#F2F97B" />
                        <stop offset="0.79" stopColor="#F710DB" />
                        <stop offset="0.96" stopColor="#FCBCE5" />
                    </linearGradient>
                    <linearGradient id="paint24_linear_3279_71637" x1="-265.02" y1="241.838" x2="1634.9" y2="241.838" gradientUnits="userSpaceOnUse">
                        <stop offset="0.37" stopColor="#D978FD" />
                        <stop offset="0.57" stopColor="#FF91C1" />
                        <stop offset="0.68" stopColor="#F4EF9B" />
                        <stop offset="0.85" stopColor="#F47DB6" />
                        <stop offset="0.96" stopColor="#E847FB" />
                    </linearGradient>
                    <linearGradient id="paint25_linear_3279_71637" x1="-265.314" y1="88.4949" x2="1634.6" y2="88.4949" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#02DEE5" />
                        <stop offset="0.38" stopColor="#E6BDF1" />
                        <stop offset="0.84" stopColor="#FE2AD3" />
                        <stop offset="1" stopColor="#FDC4E0" />
                    </linearGradient>
                    <linearGradient id="paint26_linear_3279_71637" x1="-265.918" y1="136.106" x2="1634" y2="136.106" gradientUnits="userSpaceOnUse">
                        <stop offset="0.16" stopColor="#FCA96C" />
                        <stop offset="0.44" stopColor="#E5F390" />
                        <stop offset="0.71" stopColor="#F522DB" />
                        <stop offset="0.92" stopColor="#F5D2E9" />
                    </linearGradient>
                    <linearGradient id="paint27_linear_3279_71637" x1="-265.318" y1="186.665" x2="1634.6" y2="186.665" gradientUnits="userSpaceOnUse">
                        <stop offset="0.29" stopColor="#FF7059" />
                        <stop offset="0.53" stopColor="#FEF562" />
                        <stop offset="0.71" stopColor="#F28CED" />
                        <stop offset="0.92" stopColor="#FA3CC2" />
                    </linearGradient>
                    <linearGradient id="paint28_linear_3279_71637" x1="-265.918" y1="162.86" x2="1634" y2="162.86" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#FC8755" />
                        <stop offset="0.51" stopColor="#F1EC5A" />
                        <stop offset="0.69" stopColor="#F886B0" />
                        <stop offset="0.81" stopColor="#F37EDB" />
                        <stop offset="1" stopColor="#F5D2E6" />
                    </linearGradient>
                    <linearGradient id="paint29_linear_3279_71637" x1="-265.918" y1="213.42" x2="1634" y2="213.42" gradientUnits="userSpaceOnUse">
                        <stop offset="0.05" stopColor="#F7A1C7" />
                        <stop offset="0.47" stopColor="#EA5D45" />
                        <stop offset="0.69" stopColor="#FDF867" />
                        <stop offset="0.81" stopColor="#FF9AE0" />
                        <stop offset="1" stopColor="#FEDBE6" />
                    </linearGradient>
                    <linearGradient id="paint30_linear_3279_71637" x1="-265.922" y1="93058.9" x2="1633.99" y2="93058.9" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F1AE51" />
                        <stop offset="0.35" stopColor="#F7C468" />
                        <stop offset="0.6" stopColor="#FB9498" />
                        <stop offset="0.81" stopColor="#FFB1D5" />
                        <stop offset="1" stopColor="#FF70FA" />
                    </linearGradient>
                    <linearGradient id="paint31_linear_3279_71637" x1="-265.926" y1="373.247" x2="1633.99" y2="373.247" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F3FF2C" />
                        <stop offset="0.34" stopColor="#D4FC7D" />
                        <stop offset="0.6" stopColor="#F6E56C" />
                        <stop offset="0.84" stopColor="#F8B251" />
                        <stop offset="1" stopColor="#FED54D" />
                    </linearGradient>
                    <linearGradient id="paint32_linear_3279_71637" x1="-265.31" y1="-8.14858" x2="1634.61" y2="-8.14858" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0058F1" />
                        <stop offset="0.41" stopColor="#F8D84E" />
                        <stop offset="0.63" stopColor="#FABC4E" />
                        <stop offset="0.82" stopColor="#F76A90" />
                        <stop offset="1" stopColor="#F7EB85" />
                    </linearGradient>
                    <linearGradient id="paint33_linear_3279_71637" x1="-265.314" y1="52.7013" x2="1634.6" y2="52.7013" gradientUnits="userSpaceOnUse">
                        <stop offset="0.1" stopColor="#3EBBFB" />
                        <stop offset="0.38" stopColor="#8CF762" />
                        <stop offset="0.64" stopColor="#F4CF6F" />
                        <stop offset="0.86" stopColor="#F27088" />
                        <stop offset="1" stopColor="#E4F8A8" />
                    </linearGradient>
                    <linearGradient id="paint34_linear_3279_71637" x1="-265.318" y1="118.649" x2="1634.6" y2="118.649" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stopColor="#02E0E3" />
                        <stop offset="0.51" stopColor="#E0FD56" />
                        <stop offset="0.86" stopColor="#F413D5" />
                        <stop offset="1" stopColor="#F2D5EB" />
                    </linearGradient>
                    <linearGradient id="paint35_linear_3279_71637" x1="-264.419" y1="228.336" x2="1635.5" y2="228.336" gradientUnits="userSpaceOnUse">
                        <stop offset="0.08" stopColor="#C797D3" />
                        <stop offset="0.51" stopColor="#FF90C1" />
                        <stop offset="0.7" stopColor="#F6F28E" />
                        <stop offset="0.86" stopColor="#F469A2" />
                        <stop offset="1" stopColor="#EED5DB" />
                    </linearGradient>
                    <linearGradient id="paint36_linear_3279_71637" x1="-264.725" y1="350.264" x2="1635.19" y2="350.264" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FEE559" />
                        <stop offset="0.31" stopColor="#FFF174" />
                        <stop offset="0.54" stopColor="#F5EA9B" />
                        <stop offset="0.74" stopColor="#F9977D" />
                        <stop offset="1" stopColor="#F5EBCA" />
                    </linearGradient>
                    <clipPath id="clip0_3279_71637">
                        <rect width="1900.74" height="1927.41" fill="white" transform="translate(-267.371 -579.705)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default MultipleColorLines;
