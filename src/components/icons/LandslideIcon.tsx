import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Custom Landslide Icon designed in Lucide icon style (24x24, stroke 2, round linecap/join)
 * Illustrates a fractured mountain slope with tumbling boulders and active slip movement.
 */
export default function LandslideIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Ground horizontal plane */}
      <path d="M2 21h20" />
      {/* Stable mountain ridge on the left */}
      <path d="M2 21l6.5-14 3.5 6" />
      {/* Slip surface / fault cleavage line */}
      <path d="M12 13l3 8" strokeDasharray="2 2" />
      {/* Falling boulders / rock debris rolling down slope */}
      <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="16.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="17" r="1.8" fill="currentColor" stroke="none" />
      {/* Dynamic movement lines along the slope */}
      <path d="M14 6.5l3 3" />
      <path d="M16 4.5l3 3" />
    </svg>
  );
}

export { LandslideIcon };
