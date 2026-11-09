import React from 'react';

interface GeorgiaFlagProps {
  className?: string;
}

/**
 * Official Flag of the State of Georgia (adopted 2003)
 * Features three horizontal stripes (red, white, red), a blue canton,
 * gold state coat of arms arch, and circle of 13 white stars.
 */
export const GeorgiaFlag: React.FC<GeorgiaFlagProps> = ({ className = "w-6 h-4" }) => {
  const stars = Array.from({ length: 13 }, (_, i) => {
    const angle = (i * 360) / 13 - 90;
    const rad = (angle * Math.PI) / 180;
    const cx = 32 + 15.5 * Math.cos(rad);
    const cy = 24 + 15.5 * Math.sin(rad);
    return { cx, cy };
  });

  return (
    <svg
      viewBox="0 0 120 72"
      className={`inline-block rounded-[2px] shadow-sm border border-navy-200/60 shrink-0 ${className}`}
      role="img"
      aria-label="Flag of the State of Georgia"
    >
      {/* Background Red & White Stripes */}
      <rect width="120" height="24" y="0" fill="#B31942" />
      <rect width="120" height="24" y="24" fill="#FFFFFF" />
      <rect width="120" height="24" y="48" fill="#B31942" />

      {/* Blue Canton */}
      <rect width="64" height="48" x="0" y="0" fill="#0A3161" />

      {/* Simplified Gold Georgia Coat of Arms Arch in Center of Canton */}
      <g fill="#C4A46A">
        {/* Base platform */}
        <rect x="24" y="29" width="16" height="2" rx="0.5" />
        {/* Three columns */}
        <rect x="26" y="20" width="2" height="9" />
        <rect x="31" y="20" width="2" height="9" />
        <rect x="36" y="20" width="2" height="9" />
        {/* Arch top */}
        <path d="M24 20 Q32 13 40 20 Z" />
        {/* In God We Trust motto bar */}
        <rect x="25" y="32.5" width="14" height="1.5" rx="0.5" />
      </g>

      {/* Circle of 13 White Stars */}
      {stars.map((s, idx) => (
        <circle key={idx} cx={s.cx} cy={s.cy} r="1.45" fill="#FFFFFF" />
      ))}
    </svg>
  );
};
