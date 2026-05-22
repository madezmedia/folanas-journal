'use client';

export function Acmiglyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      role="img"
      aria-label="ACMI Glyph"
    >
      <rect x="10" y="30" width="10" height="20" fill="currentColor" />
      <rect x="25" y="10" width="10" height="40" fill="currentColor" />
      <rect x="40" y="20" width="10" height="30" fill="currentColor" />
    </svg>
  );
}
