"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger };

// ========================
// FADE UP ANIMATION
// ========================
export const useFadeUp = (options) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const isMobile = window.innerWidth < 768;
      const initialY = isMobile ? Math.min(options?.y ?? 40, 20) : (options?.y ?? 40);
      const elements = ref.current.querySelectorAll(".gsap-reveal");
      if (elements.length === 0) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: initialY },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.8,
            delay: options?.delay ?? 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      } else {
        gsap.fromTo(
          elements,
          { opacity: 0, y: initialY },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.8,
            delay: options?.delay ?? 0,
            stagger: options?.stagger ?? 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return ref;
};

// ========================
// STAGGER ANIMATION
// ========================
export const useStagger = (selector, options) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const elements = ref.current.querySelectorAll(selector);
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: options?.stagger ?? 0.1,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return ref;
};

// ========================
// PARALLAX
// ========================
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return ref;
};

// ========================
// COUNTER ANIMATION
// ========================
export const useCounter = (end, options) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: end,
        duration: options?.duration ?? 2,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${options?.prefix ?? ""}${Math.round(obj.value)}${options?.suffix ?? ""}`;
          }
        },
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return ref;
};

// ========================
// FADE LEFT/RIGHT
// ========================
export const useFadeLeft = (options) => {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const isMobile = window.innerWidth < 1024;
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? 30 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );
  return ref;
};

export const useFadeRight = (options) => {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const isMobile = window.innerWidth < 1024;
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 30 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );
  return ref;
};

// ========================
// SCALE IN
// ========================
export const useScaleIn = (options) => {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: options?.delay ?? 0,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );
  return ref;
};

// ========================
// MAGNETIC BUTTON
// ========================
export const useMagnetic = (strength = 0.4) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: ref },
  );

  return ref;
};

// ========================
// TEXT SPLIT REVEAL
// ========================
export const useSplitText = (options) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const text = ref.current.textContent || "";
      const words = text.split(" ");
      ref.current.innerHTML = words
        .map(
          (word) =>
            `<span class="word-wrap" style="overflow:hidden;display:inline-block;"><span class="word" style="display:inline-block;">${word}</span></span>`,
        )
        .join(" ");

      const wordEls = ref.current.querySelectorAll(".word");
      gsap.fromTo(
        wordEls,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: options?.stagger ?? 0.06,
          delay: options?.delay ?? 0,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return ref;
};
