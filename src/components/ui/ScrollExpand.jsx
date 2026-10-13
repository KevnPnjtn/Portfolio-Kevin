"use client";

import { useEffect, useRef, useState } from "react";

import "./ScrollExpand.css";

const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

const smoothstep = (value) =>
    value * value * (3 - 2 * value);

function ScrollExpand({
    title = "Building ideas into digital experiences",
    scrollHint = "Scroll to explore",
    startWidth = 72,
    startHeight = 42,
    startRadius = 28,
    endRadius = 0,
    scrollDistance = 0.75,
    holdDistance = 0.15,
    smoothing = 0.12,
    children,
    className = "",
    style = {},
    enabled = true,
    onExpand,
    ...rest
}) {
    const rootRef = useRef(null);

    const progressRef = useRef(enabled ? 0 : 1);
    const targetProgressRef = useRef(enabled ? 0 : 1);

    const expandedRef = useRef(!enabled);
    const animationFrameRef = useRef(null);

    const [progress, setProgress] = useState(
        () => (enabled ? 0 : 1)
    );

    const [expanded, setExpanded] = useState(
        () => !enabled
    );

    /*
     * Once the Hero reaches the expanded state,
     * keep it expanded permanently.
     */
    const lockExpanded = () => {
        if (expandedRef.current) {
            return;
        }

        expandedRef.current = true;

        progressRef.current = 1;
        targetProgressRef.current = 1;

        setProgress(1);
        setExpanded(true);

        onExpand?.();
    };

    useEffect(() => {
        /*
         * When disabled, there is nothing to synchronize.
         *
         * The initial state already handles this case:
         * progress = 1
         * expanded = true
         */
        if (!enabled) {
            return undefined;
        }

        const updateProgress = () => {
            if (
                !rootRef.current ||
                expandedRef.current
            ) {
                return;
            }

            const rect =
                rootRef.current.getBoundingClientRect();

            const viewportHeight =
                window.innerHeight;

            const distance =
                viewportHeight *
                scrollDistance;

            if (distance <= 0) {
                lockExpanded();
                return;
            }

            /*
             * How far the user has scrolled
             * through the opening section.
             */
            const travelled = Math.max(
                0,
                -rect.top
            );

            const rawProgress = clamp(
                travelled / distance,
                0,
                1
            );

            targetProgressRef.current =
                rawProgress;

            /*
             * Once expansion reaches almost 100%,
             * permanently lock the Hero open.
             */
            if (rawProgress >= 0.98) {
                lockExpanded();
            }
        };

        const animate = () => {
            const current =
                progressRef.current;

            const target =
                targetProgressRef.current;

            const next =
                current +
                (target - current) *
                smoothing;

            progressRef.current = next;

            setProgress(next);

            animationFrameRef.current =
                requestAnimationFrame(animate);
        };

        updateProgress();

        window.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateProgress
        );

        animationFrameRef.current =
            requestAnimationFrame(animate);

        return () => {
            window.removeEventListener(
                "scroll",
                updateProgress
            );

            window.removeEventListener(
                "resize",
                updateProgress
            );

            if (animationFrameRef.current) {
                cancelAnimationFrame(
                    animationFrameRef.current
                );
            }
        };
    }, [
        enabled,
        scrollDistance,
        smoothing,
        onExpand,
    ]);

    /*
     * =========================================
     * EXPANSION CALCULATIONS
     * =========================================
     */

    const easedProgress =
        smoothstep(progress);

    const width =
        startWidth +
        (100 - startWidth) *
        easedProgress;

    const height =
        startHeight +
        (100 - startHeight) *
        easedProgress;

    const radius =
        startRadius +
        (endRadius - startRadius) *
        easedProgress;

    /*
     * Opening title fades away while
     * the Hero expands.
     */
    const titleOpacity =
        1 -
        clamp(
            easedProgress / 0.55,
            0,
            1
        );

    /*
     * Scroll hint disappears quickly
     * after the first scroll.
     */
    const hintOpacity =
        1 -
        clamp(
            easedProgress / 0.2,
            0,
            1
        );

    /*
     * Full Hero content gradually appears
     * after the expansion is mostly complete.
     */
    const contentOpacity = clamp(
        (easedProgress - 0.45) / 0.45,
        0,
        1
    );

    const contentScale =
        0.96 +
        contentOpacity * 0.04;

    return (
        <section
            ref={rootRef}
            className={`scroll-expand ${className}`}
            style={style}
            {...rest}
        >
            <div className="scroll-expand__stage">
                {/* =========================================
                    EXPANDING HERO FRAME
                ========================================= */}

                <div
                    className="scroll-expand__frame"
                    style={{
                        width: `${width}%`,
                        height: `${height}%`,
                        borderRadius: `${radius}px`,
                    }}
                >
                    {/* Background */}

                    <div
                        aria-hidden
                        className="scroll-expand__background"
                    />

                    {/* Blue glow */}

                    <div
                        aria-hidden
                        className="scroll-expand__glow scroll-expand__glow--blue"
                    />

                    {/* Violet glow */}

                    <div
                        aria-hidden
                        className="scroll-expand__glow scroll-expand__glow--violet"
                    />

                    {/* Dark overlay */}

                    <div
                        aria-hidden
                        className="scroll-expand__scrim"
                    />

                    {/* =====================================
                        OPENING TITLE
                    ===================================== */}

                    <div
                        className="scroll-expand__title"
                        style={{
                            opacity:
                                titleOpacity,
                        }}
                    >
                        <span>
                            {title}
                        </span>
                    </div>

                    {/* =====================================
                        FULL HERO CONTENT
                    ===================================== */}

                    <div
                        className="scroll-expand__content"
                        style={{
                            opacity:
                                contentOpacity,

                            transform: `scale(${contentScale})`,

                            pointerEvents:
                                expanded
                                    ? "auto"
                                    : "none",
                        }}
                    >
                        {children}
                    </div>
                </div>

                {/* =========================================
                    SCROLL HINT
                ========================================= */}

                {!expanded &&
                    scrollHint && (
                        <div
                            className="scroll-expand__hint"
                            style={{
                                opacity:
                                    hintOpacity,
                            }}
                        >
                            <span>
                                {scrollHint}
                            </span>

                            <span
                                aria-hidden
                                className="scroll-expand__hint-line"
                            />
                        </div>
                    )}
            </div>
        </section>
    );
}

export { ScrollExpand };

export default ScrollExpand;