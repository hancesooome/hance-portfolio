export const EASE_OUT_CUBIC = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const;

export const motionTimings = {
  fast: 0.18,
  normal: 0.28,
  slow: 0.42,
} as const;

export const spring = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 26,
  mass: 0.8,
};

export const pageEnter = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const cardEnter = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalPanel = {
  hidden: { opacity: 0, scale: 0.98, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 14 },
};

export const hoverLift = {
  y: -4,
  scale: 1.01,
};

export const tapShrink = {
  scale: 0.98,
};
