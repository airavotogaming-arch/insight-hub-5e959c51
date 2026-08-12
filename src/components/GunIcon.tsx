import type { GunSkin } from "@/game/guns";

/** flat 2D preview of each purchasable gun, drawn from the skin palette */
export function GunIcon({ skin, size = 64 }: { skin: GunSkin; size?: number }) {
  const { body, bodyDark, accent, trim } = skin.css;
  const common = { width: size, height: size * 0.62, viewBox: "0 0 100 62" } as const;

  if (skin.shape === "pistol" || skin.shape === "ranger") {
    return (
      <svg {...common} fill="none" aria-hidden="true">
        <rect x="10" y="14" width="72" height="14" rx="4" fill={body} />
        <rect x="16" y="17" width="34" height="7" rx="3" fill={accent} />
        <rect x="70" y="17" width="12" height="8" rx="2" fill={bodyDark} />
        <rect x="82" y="18" width="10" height="6" rx="3" fill={skin.shape === "ranger" ? accent : bodyDark} />
        <path d="M20 28h26l-6 26h-14z" fill={bodyDark} />
        <path d="M24 32h14l-4 17h-9z" fill={trim} />
        <path d="M46 28h16v6H46z" fill={bodyDark} />
        <path d="M44 34c6 0 10 4 10 9" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <rect x="60" y="10" width="4" height="5" rx="1" fill={trim} />
      </svg>
    );
  }

  if (skin.shape === "raygun") {
    return (
      <svg {...common} fill="none" aria-hidden="true">
        <rect x="14" y="10" width="26" height="20" rx="6" fill={bodyDark} />
        <rect x="20" y="16" width="4" height="8" rx="2" fill={trim} />
        <rect x="27" y="16" width="4" height="8" rx="2" fill={accent} />
        <rect x="36" y="12" width="42" height="16" rx="7" fill={body} />
        <rect x="44" y="17" width="24" height="3" rx="1.5" fill={trim} />
        <rect x="76" y="14" width="14" height="7" rx="3.5" fill={accent} />
        <circle cx="56" cy="36" r="6" fill={trim} />
        <circle cx="68" cy="36" r="6" fill={accent} />
        <path d="M18 30h20l-6 24H20z" fill={body} />
        <path d="M24 34h7l-3 16h-6z" fill={accent} />
        <path d="M40 32c6 1 9 5 9 10" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (skin.shape === "smg") {
    return (
      <svg {...common} fill="none" aria-hidden="true">
        <rect x="30" y="18" width="46" height="16" rx="4" fill={body} />
        <rect x="4" y="21" width="26" height="10" rx="2" fill={body} />
        <rect x="28" y="20" width="4" height="12" rx="1" fill={trim} />
        <rect x="46" y="8" width="16" height="10" rx="3" fill={bodyDark} />
        <rect x="50" y="10" width="8" height="3" rx="1.5" fill={accent} />
        <rect x="36" y="15" width="10" height="4" rx="1" fill={accent} />
        <rect x="76" y="20" width="16" height="14" rx="3" fill={trim} />
        <path d="M44 34h16l-4 20H46z" fill={bodyDark} />
        <rect x="60" y="34" width="12" height="18" rx="3" fill={trim} />
        <path d="M42 36c5 1 8 5 8 9" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" aria-hidden="true">
      <rect x="24" y="14" width="44" height="18" rx="7" fill={body} />
      <rect x="30" y="18" width="24" height="5" rx="2.5" fill={trim} />
      <rect x="64" y="16" width="22" height="14" rx="7" fill={accent} />
      <circle cx="88" cy="23" r="9" fill={accent} />
      <circle cx="88" cy="23" r="4" fill={bodyDark} />
      <circle cx="34" cy="26" r="8" fill={accent} />
      <circle cx="34" cy="26" r="3" fill={trim} />
      <path d="M30 32h20l-6 22H32z" fill={body} />
      <path d="M34 36h9l-3 14h-8z" fill={accent} />
      <path d="M48 34c6 1 9 5 9 10" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
