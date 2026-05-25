import React from 'react';
import { MenuIconName } from '../types/menuIcon';
import './MenuIcon.css';

interface MenuIconProps {
  name: MenuIconName;
  size?: number;
}

const paths: Record<MenuIconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  folder: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  ),
  box: (
    <>
      <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3z" />
      <path d="M12 12 21 7.5M12 12v9M12 12 3 7.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 8.5a2.5 2.5 0 1 1 0 5" />
      <path d="M19 19c0-2.5-1.5-4.5-4-4.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-6" />
      <path d="M22 19V3" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  sales: (
    <>
      <path d="M3 7h18l-2 10H5L3 7z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </>
  ),
};

/** Ícone monocromático — herda a cor do texto (branco no menu escuro, preto no conteúdo claro). */
function MenuIcon({ name, size = 18 }: MenuIconProps) {
  return (
    <svg
      className="menu-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}

export default MenuIcon;
