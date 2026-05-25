import React from 'react';
import './ChevronIcon.css';

interface ChevronIconProps {
  open?: boolean;
  size?: number;
}

function ChevronIcon({ open = false, size = 14 }: ChevronIconProps) {
  return (
    <svg
      className={`chevron-icon ${open ? 'chevron-icon--open' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default ChevronIcon;
