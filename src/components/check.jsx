import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GRADIENT =
    "linear-gradient(270deg, #F5DB47 0.01%, #EA5F6B 46%, #1274BC 99.99%)";
const TEXT = `ご縁ある全ての人を本音本心本気で支援する企業であり続けるために、新たなアイデアを、求め続ける。常識も、定石も、常套手段も、我々には必要ない。本質的な支援をするために、新たな常識を、創り続ける。`;

function useScrollTrigger(threshold = 0.2) {
    const [triggered, setTriggered] = useState(false);
    const ref = useRef();

    useEffect(() => {
        function onScroll() {
            if (!ref.current || triggered) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < windowHeight * (1 - threshold)) {
                setTriggered(true);
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [triggered, threshold]);

    return [ref, triggered];
}

const FullPageJapanese = () => {
    const [displayed, setDisplayed] = useState("");
    const idxRef = useRef(0);
    const [containerRef, triggered] = useScrollTrigger(0.2);

    // Check if mobile for optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

    // Animate text writing (slower speed, human-like)
    useEffect(() => {
        if (!triggered) return;
        if (idxRef.current < TEXT.length) {
            const timeout = setTimeout(() => {
                setDisplayed((prev) => prev + TEXT[idxRef.current]);
                idxRef.current += 1;
            }, isMobile ? 80 + Math.random() * 40 : 120 + Math.random() * 80); // Faster on mobile
            return () => clearTimeout(timeout);
        }
    }, [displayed, triggered, isMobile]);

    // Animate fade-in on scroll
    useEffect(() => {
        if (triggered && containerRef.current) {
            const duration = isMobile ? 0.8 : 1.1; // Faster on mobile
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: duration,
                    ease: "power2.out",
                    ...(isMobile && { force3D: true })
                }
            );
        }
    }, [triggered, containerRef, isMobile]);

    // Render the animated text with a single gradient line for the first 8 letters
    function renderAnimatedText() {
        const n = displayed.length;
        if (n === 0) return null;

        // If all text is written, show all black
        if (n >= TEXT.length) {
            return (
                <>
                    {TEXT.split("").map((ch, i) => (
                        <span key={i} style={{ color: "#111" }}>{ch}</span>
                    ))}
                </>
            );
        }

        // For first 8 letters, use a single gradient line for all 8 letters
        if (n <= 8) {
            return (
                <span
                    style={{
                        background: GRADIENT,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        transition: "color 0.5s, background 0.5s",
                        display: "inline-block",
                    }}
                >
                    {displayed}
                </span>
            );
        }

        // After 8th letter, first (n-8) letters are black, next 8 are gradient line, rest are not shown yet
        const numBlack = n - 8;
        const blackText = displayed.slice(0, numBlack);
        const gradientText = displayed.slice(numBlack, n);

        return (
            <>
                {/* Black letters */}
                <span style={{ color: "#111", transition: "color 0.5s", display: "inline" }}>
                    {blackText}
                </span>
                {/* Gradient line for next up to 8 letters */}
                <span
                    style={{
                        background: GRADIENT,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        transition: "color 0.5s, background 0.5s",
                        display: "inline-block",
                    }}
                >
                    {gradientText}
                </span>
            </>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`full-page-japanese-container mobile-safe-height mobile-touch-optimized ${displayed.length >= TEXT.length ? 'animation-complete' : ''} ${isMobile ? 'mobile-container' : ''}`}
            style={{
                minHeight: "100vh",
                width: "100%",
                background: "#fff",
                margin: 0,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                className={`full-page-japanese-content ${isMobile ? 'mobile-safe-area-container' : ''}`}
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    padding: 0,
                    margin: 0,
                    boxSizing: "border-box",
                }}
            >
                <p
                    className={`full-page-japanese-text ${isMobile ? 'mobile-text mobile-font-optimized' : ''}`}
                    style={{
                        fontSize: isMobile ? "clamp(1rem, 4vw, 1.8rem)" : "clamp(2rem, 6vw, 4.8rem)",
                        fontWeight: 900,
                        lineHeight: 1.4,
                        letterSpacing: "0.04em",
                        margin: 0,
                        padding: 0,
                        textAlign: "left",
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                        fontFamily:
                            "inherit, 'Noto Sans JP', 'Hiragino Sans', 'Meiryo', sans-serif",
                        userSelect: "none",
                        transition: "color 0.5s, background 0.5s",
                        display: "inline-block",
                        width: "100%",
                        boxSizing: "border-box",
                        overflowWrap: "break-word",
                    }}
                >
                    {renderAnimatedText()}
                    {/* Blinking cursor while writing and not yet finished */}
                    {displayed.length < TEXT.length && triggered && (
                        <span
                            className={`full-page-japanese-cursor ${isMobile ? 'mobile-optimized-animation' : ''}`}
                            style={{
                                display: "inline-block",
                                width: "1ch",
                                animation: "fullPageJapaneseBlink 1s steps(1) infinite",
                                color: "transparent",
                                background: GRADIENT,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            |
                        </span>
                    )}
                </p>
            </div>
            {/* Scoped styles for this component only */}
            <style>
                {`
          @keyframes fullPageJapaneseBlink {
            0% { opacity: 1; }
            49% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 0; }
          }
          
          .full-page-japanese-container {
            width: 100%;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            box-sizing: border-box;
          }
          
          .full-page-japanese-content {
            width: 100%;
            max-width: 100%;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          
          .full-page-japanese-text {
            font-size: clamp(2rem, 6vw, 4.8rem);
            padding: 0;
            margin: 0;
          }
          
          @media (max-width: 900px) {
            .full-page-japanese-text {
              font-size: clamp(1.2rem, 5vw, 2.8rem);
              padding: 0;
              margin: 0;
            }
            .full-page-japanese-content {
              padding: 0;
              margin: 0;
            }
          }
          
          @media (max-width: 600px) {
            .full-page-japanese-text {
              font-size: clamp(1rem, 4vw, 1.8rem);
              padding: 0;
              margin: 0;
              line-height: 1.3;
            }
            .full-page-japanese-content {
              padding: 0;
              margin: 0;
            }
            .full-page-japanese-container {
              min-height: 100vh;
              height: 100vh;
            }
          }
          
          @media (max-width: 480px) {
            .full-page-japanese-text {
              font-size: clamp(0.9rem, 3.5vw, 1.6rem);
              line-height: 1.2;
            }
          }
        `}
            </style>
        </div>
    );
};

export default FullPageJapanese;
