import React from 'react';
import { KREDITFIN_PATHS } from './kreditfinLogoPaths';

export interface KreditFinLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  /**
   * 'desktop' (or 'full'): Includes emblem + reditfin + tagline + gradient underline bar (matching Kredifin_Lead_form_Desktp (1).png)
   * 'mobile' (or 'compact'): Emblem + reditfin only, no tagline, no underline bar (matching Kreditfin_Lead_form_Mb.png)
   * 'icon': Emblem only
   */
  variant?: 'desktop' | 'mobile' | 'full' | 'compact' | 'icon';
  showTagline?: boolean;
  height?: number | string;
}

// Exact geometric vectors for KreditFin 3D ribbon 'K'
const GREEN_STEM = 'M 11 47.4 L 11 23.5 A 7.5 7.5 0 0 1 26 23.5 L 26 32.4 L 11 47.4 Z';
const BLUE_ARM = 'M 26 32.4 L 43.2 15.2 A 7.5 7.5 0 0 1 53.8 25.8 L 37.6 42.0 L 26 36.0 Z';
const NAVY_BODY = 'M 11 47.4 L 26 32.4 L 37.6 42.0 L 53.8 58.2 A 7.5 7.5 0 0 1 43.2 68.8 L 26 51.6 L 26 60.5 A 7.5 7.5 0 0 1 11 60.5 Z';
const FOLD_SHADOW = 'M 11 47.4 L 26 32.4 L 27 34.0 L 12 49.0 Z';

/**
 * Official KreditFin Brand Identity:
 * - Desktop: K Ribbon Emblem + 'reditfin' + 'SMART CREDIT. BETTER FUTURE.' + Gradient Bar (Kredifin_Lead_form_Desktp (1).png)
 * - Mobile: K Ribbon Emblem + 'reditfin' without tagline/bar (Kreditfin_Lead_form_Mb.png)
 * - K Emblem:
 *    * Upper green vertical stem with rounded top cap
 *    * Upper blue diagonal arm with rounded tip
 *    * Lower navy diagonal arm with rounded tip
 *    * Lower navy stem tab with precision circular eyelet aperture
 *    * Crisp 3D ribbon fold line
 * - First 'i' (kredit) has vibrant lime-green dot
 * - Second 'i' (fin) has vibrant electric cyan/blue dot
 */
export const KreditFinLogo: React.FC<KreditFinLogoProps> = ({
  className = '',
  theme = 'light',
  variant = 'compact',
  showTagline,
  height,
}) => {
  const isDark = theme === 'dark';
  const isDesktop = variant === 'desktop' || variant === 'full';
  const hasTagline = showTagline !== undefined ? showTagline : isDesktop;

  // Default height based on variant
  const defaultHeight = isDesktop ? 46 : variant === 'compact' || variant === 'mobile' ? 36 : 32;
  const effectiveHeight = height ?? defaultHeight;

  const uid = React.useId().replace(/:/g, '_');
  const greenId = `kf_g_${uid}`;
  const blueId = `kf_b_${uid}`;
  const navyId = `kf_n_${uid}`;
  const dotGId = `kf_dg_${uid}`;
  const dotBId = `kf_db_${uid}`;
  const barId = `kf_bar_${uid}`;
  const maskId = `kf_m_${uid}`;

  const navyStops = isDark ? (
    <>
      <stop offset="0%" stopColor="#475569" />
      <stop offset="50%" stopColor="#334155" />
      <stop offset="100%" stopColor="#1e293b" />
    </>
  ) : (
    <>
      <stop offset="0%" stopColor="#1e293b" />
      <stop offset="50%" stopColor="#0f172a" />
      <stop offset="100%" stopColor="#020617" />
    </>
  );

  const wordmarkColor = isDark ? '#ffffff' : '#040d21';
  const tagColor = isDark ? '#cbd5e1' : '#040d21';

  // Mobile viewBox: 6 8 325 68
  // Desktop viewBox: 6 8 325 84
  const viewBox = hasTagline ? '6 8 325 84' : '6 8 325 68';

  return (
    <div
      className={`inline-flex items-center select-none shrink-0 ${className}`}
      style={{ height: effectiveHeight }}
    >
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto object-contain shrink-0"
        style={{ height: effectiveHeight, maxHeight: effectiveHeight }}
        aria-label="KreditFin Logo"
      >
        <defs>
          {/* Green stem gradient */}
          <linearGradient id={greenId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          {/* Blue upper arm gradient */}
          <linearGradient id={blueId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066ff" />
            <stop offset="50%" stopColor="#0099ff" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>

          {/* Navy lower body gradient */}
          <linearGradient id={navyId} x1="0%" y1="0%" x2="100%" y2="100%">
            {navyStops}
          </linearGradient>

          {/* Green dot for first 'i' in kredit */}
          <linearGradient id={dotGId} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Blue dot for second 'i' in fin */}
          <linearGradient id={dotBId} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0091ff" />
            <stop offset="100%" stopColor="#0055ff" />
          </linearGradient>

          {/* Accent underline bar gradient */}
          <linearGradient id={barId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="30%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0091ff" />
          </linearGradient>

          {/* Circular aperture punch-hole mask in bottom stem tab */}
          <mask id={maskId}>
            <rect width="400" height="120" fill="white" />
            <circle cx="18.5" cy="60.5" r="3.4" fill="black" />
          </mask>
        </defs>

        {/* 1. Upper Blue Diagonal Arm */}
        <path d={BLUE_ARM} fill={`url(#${blueId})`} />

        {/* 2. Upper Green Vertical Stem */}
        <path d={GREEN_STEM} fill={`url(#${greenId})`} />

        {/* 3. Lower Navy Section with punch-hole */}
        <path d={NAVY_BODY} fill={`url(#${navyId})`} mask={`url(#${maskId})`} />

        {/* 4. 3D Ribbon Fold Crease */}
        <path d={FOLD_SHADOW} fill="#000000" opacity={0.3} />

        {/* 5. Wordmark 'reditfin' */}
        <path d={KREDITFIN_PATHS.reditfin} fill={wordmarkColor} />

        {/* 6. Lime-green dot on first 'i' in kredit */}
        <path d={KREDITFIN_PATHS.greenDot} fill={`url(#${dotGId})`} />

        {/* 7. Electric cyan/blue dot on second 'i' in fin */}
        <path d={KREDITFIN_PATHS.blueDot} fill={`url(#${dotBId})`} />

        {/* 8. Desktop Tagline & Gradient Underline Bar */}
        {hasTagline && (
          <>
            <path d={KREDITFIN_PATHS.tagline} fill={tagColor} />
            <rect
              x={KREDITFIN_PATHS.tagX}
              y={85}
              width={KREDITFIN_PATHS.tagWidth}
              height={2.5}
              rx={1.25}
              fill={`url(#${barId})`}
            />
          </>
        )}
      </svg>
    </div>
  );
};
