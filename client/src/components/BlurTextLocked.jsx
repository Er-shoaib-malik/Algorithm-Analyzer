import React, { useEffect, useRef, useState, useId } from "react";
import { motion } from "framer-motion";

const BREAK_TOKEN = "[br]";

const ANIMATE_BY = "words"; // "words" | "letters"
const DELAY_MS = 150;
const STEP_DURATION_S = 0.35;
const EASING = "easeOut";
const THRESHOLD = 0.1;
const ROOT_MARGIN = "20px";

const FROM_SNAPSHOT = { opacity: 0, y: -50, filter: "blur(20px)" };
const TO_SNAPSHOTS = [
  { opacity: 0.5, y: 10, filter: "blur(5px)" },
  { opacity: 1, y: 0, filter: "blur(0px)" },
];

const COLOR = "white";
const FONT_WEIGHT = 500;
const TEXT_ALIGN = "center";
const LETTER_SPACING_PX = 2;
const LINE_HEIGHT = 1.2;

const FONT_SIZE_DESKTOP = 48;
const FONT_SIZE_TABLET = 20;
const FONT_SIZE_MOBILE = 20;

const isOnlyWhitespace = (s) => s !== "\n" && /^\s+$/.test(s);

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });

  return keyframes;
};

export default function BlurTextLocked({ text }) {
  const normalizedText = text
    .replace(/\r\n?/g, "\n")
    .replace(/\\n/g, "\n")
    .split(BREAK_TOKEN)
    .join("\n");

  const elements =
    ANIMATE_BY === "words"
      ? normalizedText.split(/(\s+|\n)/)
      : Array.from(normalizedText);

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  const uid = useId();
  const uniqueClass = `blurtext-${uid.replace(/[:]/g, "")}`;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stepCount = TO_SNAPSHOTS.length + 1;
  const totalDuration = STEP_DURATION_S * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const animateKeyframes = buildKeyframes(
    FROM_SNAPSHOT,
    TO_SNAPSHOTS
  );

  let animatedIndex = -1;

  return (
    <>
      <style>
        {`
          .${uniqueClass} {
            font-family: 'Poppins', sans-serif;
            font-size: ${FONT_SIZE_DESKTOP}px;
          }

          @media (max-width: 1199px) {
            .${uniqueClass} {
              font-size: ${FONT_SIZE_TABLET}px;
            }
          }

          @media (max-width: 767px) {
            .${uniqueClass} {
              font-size: ${FONT_SIZE_MOBILE}px;
            }
          }
        `}
      </style>

      <p
        ref={ref}
        className={uniqueClass}
        style={{
          margin: 0,
          color: COLOR,
          fontWeight: FONT_WEIGHT,
          textAlign: TEXT_ALIGN,
          letterSpacing: `${LETTER_SPACING_PX}px`,
          lineHeight: LINE_HEIGHT,
          whiteSpace: "pre-wrap",
        }}
      >
        {elements.map((segment, index) => {
          if (segment === "\n") return <br key={index} />;

          if (isOnlyWhitespace(segment)) {
            return <span key={index}>{segment}</span>;
          }

          animatedIndex += 1;

          return (
            <motion.span
              key={index}
              initial={FROM_SNAPSHOT}
              animate={inView ? animateKeyframes : FROM_SNAPSHOT}
              transition={{
                duration: totalDuration,
                times,
                delay: (animatedIndex * DELAY_MS) / 1000,
                ease: EASING,
              }}
              style={{ display: "inline-block" }}
            >
              {segment}
            </motion.span>
          );
        })}
      </p>
    </>
  );
}
