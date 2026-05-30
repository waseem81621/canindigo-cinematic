// ============================================================
// MOTION DESIGN TOKENS
// Centralized easing curves and durations for the entire site.
// Use these instead of inline literals so motion stays consistent
// and the personality of the site can be tuned in one place.
// ============================================================

// ─── EASING CURVES ───
// Different motion contexts need different easings. Treating them
// all the same is the motion equivalent of writing every sentence
// in the same tone.

/** Entrances — lands gently (easeOutExpo). Default for reveals, fades-in. */
export const easeEnter = [0.16, 1, 0.3, 1] as const;

/** Exits — accelerates out (easeInQuart). For fade-outs, modal close. */
export const easeExit = [0.7, 0, 0.84, 0] as const;

/** UI feedback — snappy, no overshoot (Material standard). For hover, focus, tooltips. */
export const easeUI = [0.4, 0, 0.2, 1] as const;

/** Linear — for scroll-scrubbed animations. Easing feels wrong tied to scroll. */
export const easeLinear = "linear" as const;

// ─── DURATION SCALE ───
// Four speeds covering every motion need. Pick the closest one;
// resist the urge to invent a custom duration.

/** 150ms — hover, focus, button states. */
export const durInstant = 0.15;

/** 300ms — modals, dropdowns, tooltips. */
export const durQuick = 0.3;

/** 600ms — reveals, hero entrances, section transitions. */
export const durCalm = 0.6;

/** 1200ms — page transitions, big cinematic moments. */
export const durCinematic = 1.2;
