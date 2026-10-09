import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'light' | 'dark' | 'cream';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SunflowerIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/karun-logo.jpg"
        alt="Karun Cafe Sunflower Logo"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${className} rounded-full object-cover shadow-2xs shrink-0 transition-transform duration-300 hover:rotate-6`}
      />
    );
  }

  // Graceful SVG fallback
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g className="transition-transform duration-500 origin-center group-hover:rotate-45">
        <path d="M24 6C24 6 27 13 24 17C21 13 24 6 24 6Z" fill="#F4B54F" />
        <path d="M24 42C24 42 27 35 24 31C21 35 24 42 24 42Z" fill="#F4B54F" />
        <path d="M6 24C6 24 13 27 17 24C13 21 6 24 6 24Z" fill="#F4B54F" />
        <path d="M42 24C42 24 35 27 31 24C35 21 42 24 42 24Z" fill="#F4B54F" />
        <path d="M11.3 11.3C11.3 11.3 18.5 14.5 19 19C14.5 18.5 11.3 11.3 11.3 11.3Z" fill="#F4B54F" opacity="0.9" />
        <path d="M36.7 36.7C36.7 36.7 29.5 33.5 29 29C33.5 29.5 36.7 36.7 36.7 36.7Z" fill="#F4B54F" opacity="0.9" />
        <path d="M36.7 11.3C36.7 11.3 33.5 18.5 29 19C29.5 14.5 36.7 11.3 36.7 11.3Z" fill="#F4B54F" opacity="0.9" />
        <path d="M11.3 36.7C11.3 36.7 14.5 29.5 19 29C18.5 33.5 11.3 36.7 11.3 36.7Z" fill="#F4B54F" opacity="0.9" />
      </g>
      <circle cx="24" cy="24" r="7.5" fill="#155D59" stroke="#FFF5E4" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="4" fill="#8B5E3C" />
      <circle cx="24" cy="24" r="1.5" fill="#F4B54F" />
    </svg>
  );
};

export const KarunLogo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  variant = 'dark',
}) => {
  const textColor =
    variant === 'light'
      ? 'text-[#FFF5E4]'
      : variant === 'cream'
      ? 'text-[#287F7B]'
      : 'text-[#155D59]';

  const subColor =
    variant === 'light'
      ? 'text-[#F4B54F]'
      : variant === 'cream'
      ? 'text-[#8B5E3C]'
      : 'text-[#287F7B]';

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <img
        src="/karun-logo.jpg"
        alt="Karun Cafe Logo"
        referrerPolicy="no-referrer"
        className="w-10 h-10 rounded-full object-cover border border-[#287F7B]/20 shadow-xs transition-transform duration-300 group-hover:scale-105"
      />
      {!iconOnly && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-serif-display text-2xl font-bold tracking-[0.16em] uppercase ${textColor}`}
          >
            Karun Cafe
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.25em] font-medium ${subColor}`}
          >
            Civic Center Park · Denver
          </span>
        </div>
      )}
    </div>
  );
};
