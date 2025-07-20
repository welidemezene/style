import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// SVG logo text groups (unchanged)
const LOGO_TEXT = [
    (
        <g key="B">
            <path d="M0.9375 46.8788V1.74121H8.03399C12.147 1.74121 15.1624 2.00773 17.0591 2.54077C19.7656 3.25504 21.9073 4.58763 23.5056 6.52788C25.1039 8.46814 25.9031 10.7602 25.9031 13.4041C25.9031 15.1204 25.5408 16.6769 24.8162 18.0841C24.0917 19.4913 22.9089 20.8026 21.2786 22.0286C24.0171 23.3186 26.0203 24.9283 27.2883 26.8579C28.5562 28.7875 29.1849 31.0796 29.1849 33.7128C29.1849 36.346 28.5243 38.5634 27.2137 40.6529C25.9031 42.7424 24.2195 44.2989 22.1524 45.333C20.0852 46.3671 17.2296 46.8788 13.5854 46.8788H0.9375ZM9.52574 9.93932V19.4487H11.4011C13.4895 19.4487 15.0452 19.0116 16.0681 18.1268C17.0804 17.2526 17.5919 16.0479 17.5919 14.5341C17.5919 13.1269 17.1124 12.0075 16.1427 11.176C15.1838 10.3444 13.7133 9.92866 11.7421 9.92866H9.52574V9.93932ZM9.52574 27.1244V38.6913H11.6781C15.2477 38.6913 17.6451 38.2436 18.8918 37.3374C20.1279 36.4313 20.7565 35.1307 20.7565 33.4143C20.7565 31.474 20.0319 29.9389 18.5722 28.8088C17.1124 27.6895 14.6936 27.1244 11.3158 27.1244H9.53639H9.52574Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="s">
            <path d="M56.3239 18.1588L51.1454 23.3399C49.0356 21.2504 47.1283 20.2057 45.4128 20.2057C44.4751 20.2057 43.7399 20.4082 43.2071 20.8027C42.6743 21.1971 42.4079 21.6982 42.4079 22.2845C42.4079 22.7323 42.5784 23.148 42.9194 23.5318C43.2604 23.9156 44.0915 24.4273 45.4234 25.0776L48.4922 26.6128C51.7208 28.2119 53.9371 29.8323 55.1411 31.4954C56.3452 33.1585 56.9526 35.0987 56.9526 37.3268C56.9526 40.2905 55.8657 42.7638 53.6813 44.7467C51.5076 46.7296 48.5881 47.7211 44.9226 47.7211C40.0531 47.7211 36.1745 45.8234 33.2656 42.0176L38.4228 36.3993C39.4031 37.5507 40.5539 38.4675 41.8752 39.1818C43.1964 39.8854 44.3685 40.2372 45.3808 40.2372C46.489 40.2372 47.3734 39.9707 48.0447 39.4377C48.7159 38.9046 49.0569 38.297 49.0569 37.5934C49.0569 36.3034 47.8422 35.0454 45.4128 33.8195L42.5891 32.4122C37.1868 29.6937 34.491 26.2823 34.491 22.1886C34.491 19.5447 35.5033 17.2953 37.5384 15.419C39.5736 13.5534 42.1735 12.6152 45.3488 12.6152C47.5119 12.6152 49.5577 13.095 51.465 14.0438C53.3723 14.9926 54.9919 16.3572 56.3239 18.1375V18.1588Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="t">
            <path d="M64.923 1.18701H73.2982V13.4895H78.2636V20.6962H73.2982V46.8683H64.923V20.6962H60.6289V13.4895H64.923V1.18701Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="y">
            <path d="M81.3633 13.5H89.9196L98.5824 34.4484L108.151 13.5H116.728L95.8333 59.096H87.1918L94.0538 44.3948L81.3739 13.5H81.3633Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="l">
            <path d="M120.074 0.611328H128.449V46.879H120.074V0.611328Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="e">
            <path d="M168.036 32.6149H141.142C141.536 34.9922 142.57 36.8792 144.253 38.2757C145.937 39.6829 148.089 40.3759 150.711 40.3759C153.843 40.3759 156.528 39.2778 158.777 37.0924L165.831 40.4079C164.073 42.9025 161.963 44.7468 159.512 45.9408C157.061 47.1348 154.142 47.7318 150.775 47.7318C145.543 47.7318 141.281 46.0794 137.988 42.7746C134.696 39.4697 133.055 35.3334 133.055 30.3655C133.055 25.3975 134.696 21.048 137.977 17.6792C141.259 14.3104 145.372 12.626 150.327 12.626C155.58 12.626 159.853 14.3104 163.145 17.6792C166.438 21.048 168.079 25.4828 168.079 31.0051L168.047 32.6042L168.036 32.6149ZM159.672 26.0159C159.118 24.1502 158.031 22.6364 156.401 21.4744C154.77 20.3124 152.884 19.726 150.732 19.726C148.398 19.726 146.353 20.387 144.584 21.6876C143.476 22.5085 142.453 23.9477 141.515 26.0159H159.672Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="gap" />
    ),
    (
        <g key="j">
            <path d="M204.529 1.74121H213.15V31.6872C213.15 36.4526 212.766 39.8001 212.02 41.719C211.264 43.6379 210.017 45.1731 208.28 46.3031C206.543 47.4438 204.455 48.0088 202.025 48.0088C197.06 48.0088 192.83 45.834 189.324 41.4738L195.515 35.6744C196.879 37.2308 198.051 38.2756 199.01 38.8086C199.969 39.3417 200.896 39.6082 201.802 39.6082C202.707 39.6082 203.411 39.2244 203.858 38.4462C204.306 37.6679 204.529 35.9622 204.529 33.3183V1.74121Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="a">
            <path d="M245.725 13.5002H254.101V46.8789H245.725V43.3502C244.095 44.9067 242.454 46.0261 240.813 46.7084C239.172 47.3907 237.382 47.7318 235.464 47.7318C231.159 47.7318 227.43 46.0581 224.287 42.7106C221.143 39.3631 219.566 35.2054 219.566 30.2375C219.566 25.2696 221.09 20.8561 224.127 17.5619C227.174 14.2677 230.861 12.626 235.219 12.626C237.222 12.626 239.098 13.0098 240.856 13.7667C242.614 14.5236 244.234 15.6536 245.725 17.1675V13.4895V13.5002ZM236.924 20.3657C234.335 20.3657 232.182 21.2825 230.478 23.1161C228.762 24.9498 227.91 27.2952 227.91 30.1629C227.91 33.0306 228.783 35.4186 230.52 37.2843C232.268 39.1499 234.409 40.0774 236.956 40.0774C239.503 40.0774 241.762 39.1606 243.498 37.3269C245.225 35.4933 246.098 33.0946 246.098 30.1309C246.098 27.1672 245.235 24.8752 243.498 23.0735C241.772 21.2718 239.577 20.3763 236.924 20.3763V20.3657Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="p">
            <path d="M269.922 13.5002V17.1782C271.435 15.6644 273.076 14.5237 274.834 13.7774C276.592 13.0205 278.478 12.6367 280.481 12.6367C284.839 12.6367 288.537 14.2785 291.584 17.5726C294.631 20.8668 296.155 25.0885 296.155 30.2483C296.155 35.4081 294.578 39.3739 291.435 42.7213C288.281 46.0688 284.551 47.7425 280.236 47.7425C278.318 47.7425 276.528 47.4014 274.866 46.7191C273.214 46.0368 271.563 44.9174 269.932 43.361V59.0962H261.621V13.5002H269.932H269.922ZM278.723 20.3658C276.08 20.3658 273.896 21.2719 272.159 23.0629C270.422 24.8646 269.549 27.2206 269.549 30.1203C269.549 33.0201 270.422 35.4827 272.159 37.3163C273.896 39.15 276.08 40.0668 278.723 40.0668C281.366 40.0668 283.433 39.1393 285.18 37.2737C286.928 35.4081 287.801 33.0414 287.801 30.1523C287.801 27.2633 286.938 24.9392 285.223 23.1056C283.507 21.2719 281.334 20.3551 278.723 20.3551V20.3658Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="a2">
            <path d="M326.514 13.5002H334.89V46.8789H326.514V43.3502C324.884 44.9067 323.243 46.0261 321.602 46.7084C319.961 47.3907 318.171 47.7318 316.253 47.7318C311.949 47.7318 308.219 46.0581 305.076 42.7106C301.932 39.3631 300.355 35.2054 300.355 30.2375C300.355 25.2696 301.879 20.8561 304.916 17.5619C307.963 14.2677 311.661 12.626 316.008 12.626C318.011 12.626 319.887 13.0098 321.645 13.7667C323.403 14.5236 325.023 15.6536 326.514 17.1675V13.4895V13.5002ZM317.713 20.3657C315.124 20.3657 312.971 21.2825 311.267 23.1161C309.551 24.9498 308.699 27.2952 308.699 30.1629C308.699 33.0306 309.572 35.4186 311.309 37.2843C313.046 39.1499 315.198 40.0774 317.745 40.0774C320.292 40.0774 322.551 39.1606 324.287 37.3269C326.014 35.4933 326.887 33.0946 326.887 30.1309C326.887 27.1672 326.024 24.8752 324.287 23.0735C322.551 21.2718 320.366 20.3763 317.713 20.3763V20.3657Z" fill="#3E3A39" />
        </g>
    ),
    (
        <g key="n">
            <path d="M342.401 13.5003H350.776V16.9224C352.673 15.3233 354.399 14.2039 355.934 13.5856C357.479 12.9566 359.056 12.6475 360.665 12.6475C363.968 12.6475 366.781 13.7988 369.082 16.1122C371.022 18.0738 371.991 20.9842 371.991 24.822V46.8791H363.712V32.2632C363.712 28.2761 363.531 25.6322 363.179 24.321C362.817 23.0097 362.199 22.0183 361.315 21.336C360.43 20.6537 359.333 20.3125 358.022 20.3125C356.328 20.3125 354.879 20.8776 353.664 22.0183C352.449 23.1483 351.608 24.7261 351.139 26.7196C350.894 27.7644 350.766 30.0245 350.766 33.4892V46.8791H342.391V13.5003H342.401Z" fill="#3E3A39" />
        </g>
    ),
];

const LogoAnimation = () => {
    const containerRef = useRef(null)
    const logoMarkRef = useRef(null)
    const textWrapperRef = useRef(null)
    const svgGroupRefs = useRef([])

    // Clear refs on rerender
    svgGroupRefs.current = []

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // 1. Logo mark appears in center, bounces in
        tl.fromTo(
            logoMarkRef.current,
            {
                opacity: 0,
                scale: 0.4,
                y: 80,
                x: 0,
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                position: "absolute",
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.35,
                ease: "bounce.out",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                position: "absolute",
            }
        );

        // 2. Move logo mark horizontally to the left (from center to left in flex row)
        tl.to(
            logoMarkRef.current,
            {
                left: 0,
                xPercent: 0,
                x: "-30",
                position: "absolute",
                duration: 0.5,
                ease: "power2.inOut"
            },
            "+=0.1"
        ).to(
            logoMarkRef.current,
            {
                position: "static",
                x: 0,
                left: 0,
                xPercent: 0,
                clearProps: "all",
                duration: 0.01
            }
        );

        // 3. Text wrapper slides in from right
        tl.fromTo(
            textWrapperRef.current,
            {
                opacity: 0,
                x: 60,
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out"
            },
            "-=0.2"
        );

        // 4. Animate each SVG group (letter/word) one by one:
        // Each letter appears one by one, except the last letter "n" which bounces in.
        let letterIndex = 0;
        svgGroupRefs.current.forEach((ref, i) => {
            if (!ref) return; // skip gap
            // Find the last non-gap index for "n"
            let lastLetterIndex = svgGroupRefs.current.length - 1;
            while (lastLetterIndex >= 0 && !svgGroupRefs.current[lastLetterIndex]) {
                lastLetterIndex--;
            }
            if (i === lastLetterIndex) {
                // "n" bounces in
                tl.fromTo(
                    ref,
                    {
                        opacity: 0,
                        y: -40,
                        scale: 0.7,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.35,
                        ease: "bounce.out"
                    },
                    "+=" + (letterIndex === 0 ? 0 : 0.09)
                );
            } else {
                // Other letters fade in one by one
                tl.fromTo(
                    ref,
                    {
                        y: 10,
                        opacity: 0

                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.28,
                        ease: "bounce.out"
                    },
                    "+=" + (letterIndex === 0 ? 0 : 0.09)
                );
            }
            letterIndex++;
        });

        return () => {
            tl.kill();
        };
    }, []);

    // Responsive values for logo/text sizes
    // We'll use window.matchMedia to determine if mobile or desktop
    // But for SSR safety, fallback to desktop
    const isMobile = typeof window !== "undefined"
        ? window.matchMedia("(max-width: 600px)").matches
        : false;

    // Responsive sizing
    const logoMarkSize = isMobile ? { width: 48, height: 56 } : { width: 82, height: 96 };
    const logoTextSize = isMobile
        ? { width: 210, height: 34, minWidth: 120, minHeight: 20 }
        : { width: 372, height: 60, minWidth: 200, minHeight: 40 };

    // Responsive margin between logo and text
    const logoTextMargin = isMobile ? 14 : 30;
    const logoMarkMarginRight = isMobile ? 16 : 34;

    // Responsive container minHeight
    const containerMinHeight = isMobile ? 80 : 120;

    // Responsive wrapper: flexDirection stays row, but allow wrapping on very small screens
    // Responsive fontSize for logoMark (if any text)
    const logoMarkFontSize = isMobile ? 20 : 36;

    // Responsive SVG style
    const logoTextSvgStyle = {
        display: 'block',
        height: logoTextSize.height,
        width: logoTextSize.width,
        minWidth: logoTextSize.minWidth,
        minHeight: logoTextSize.minHeight,
        marginLeft: 0,
        marginRight: 0,
        overflow: 'visible'
    };

    // Responsive viewBox for SVG text (keeps the same, but scales down via width/height)
    // Responsive viewBox for logoMark (keeps the same, but scales down via width/height)

    // Responsive: add a <style> tag for further fine-tuning if needed
    // (e.g. for very small screens, stack vertically)
    // We'll add a className to the root for easier targeting

    return (
        <div
            ref={containerRef}
            className="logo-animation-root"
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                overflow: 'hidden'
            }}
        >
            {/* Responsive CSS for mobile/desktop */}
            <style>{`
                .logo-animation-root .logo-animation-flex {
                    display: flex;
                    align-items: center;
                    position: relative;
                    min-height: ${containerMinHeight}px;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                @media (max-width: 600px) {
                    .logo-animation-root .logo-animation-flex {
                        min-height: 80px;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                    .logo-animation-root .logo-mark {
                        width: 48px !important;
                        height: 56px !important;
                        margin-right: 16px !important;
                    }
                    .logo-animation-root .logo-text-wrapper {
                        margin-left: 14px !important;
                    }
                    .logo-animation-root .logo-text-svg {
                        width: 210px !important;
                        height: 34px !important;
                        min-width: 120px !important;
                        min-height: 20px !important;
                    }
                }
                @media (max-width: 400px) {
                    .logo-animation-root .logo-animation-flex {
                        flex-direction: column;
                        min-height: 60px;
                        gap: 8px;
                    }
                    .logo-animation-root .logo-mark {
                        margin-right: 0 !important;
                        margin-bottom: 8px !important;
                    }
                    .logo-animation-root .logo-text-wrapper {
                        margin-left: 0 !important;
                    }
                }
            `}</style>
            <div
                className="logo-animation-flex"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: containerMinHeight,
                    flexDirection: 'row',
                }}
            >
                {/* Logo Mark */}
                <div
                    ref={logoMarkRef}
                    className="logo-mark"
                    style={{
                        width: logoMarkSize.width,
                        height: logoMarkSize.height,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'none',
                        borderRadius: '0%',
                        marginRight: logoMarkMarginRight,
                        fontSize: logoMarkFontSize,
                        color: '#fff',
                        userSelect: 'none',
                        opacity: 0, // initial state for animation
                        position: 'absolute', // initial state for animation
                        left: '50%',
                        top: '50%',
                        xPercent: -50,
                        yPercent: -50,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                    }}
                >
                    {/* SVG logo mark */}
                    <svg
                        width={logoMarkSize.width}
                        height={logoMarkSize.height}
                        viewBox="0 0 82 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 82.4182L11.5633 96L76.2984 41.0439L64.7565 27.4834L81.1458 13.5711L69.5932 0L12.1612 13.5818L4.85807 54.9561L0 82.4182ZM14.5956 15.8738L58.9055 5.405L29.6076 30.2765H57.1224L14.5849 66.3738L4.11068 75.2648L14.5956 15.8738Z" fill="url(#paint0_linear_3234_1658)" />
                        <defs>
                            <linearGradient id="paint0_linear_3234_1658" x1="56.5672" y1="32.3447" x2="7.05617" y2="57.2771" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F5DB47" />
                                <stop offset="0.46" stopColor="#EA5F6B" />
                                <stop offset="1" stopColor="#1274BC" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                {/* Logo Text Wrapper */}
                <div
                    ref={textWrapperRef}
                    className="logo-text-wrapper"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        opacity: 0,
                        transform: 'translateX(60px)',
                        willChange: 'opacity, transform',
                        marginLeft: logoTextMargin,
                        zIndex: 1,
                    }}
                >
                    <svg
                        className="logo-text-svg"
                        width={logoTextSize.width}
                        height={logoTextSize.height}
                        viewBox="0 0 372 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={logoTextSvgStyle}
                    >
                        {LOGO_TEXT.map((group, i) =>
                            group.key === "gap" ? (
                                <g
                                    key="gap"
                                    ref={el => svgGroupRefs.current[i] = null}
                                    style={{
                                        opacity: 1
                                    }}
                                >
                                    <rect x="170" y="0" width="24" height="60" fill="transparent" />
                                </g>
                            ) : (
                                <g
                                    key={group.key || i}
                                    ref={el => svgGroupRefs.current[i] = el}
                                    style={{
                                        opacity: 0,
                                        transition: 'opacity 0.2s'
                                    }}
                                >
                                    {group.props.children}
                                </g>
                            )
                        )}
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default LogoAnimation