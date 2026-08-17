import type { ReactNode } from "react";
import type { FitId } from "@/lib/fits";

export function TotemOverlays({ on }: { on: FitId[] }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {on.includes("cao") ? <Cao /> : null}
      {on.includes("zhang") ? <Zhang /> : null}
      {on.includes("que") ? <Que /> : null}
      {on.includes("jing") ? <Jing /> : null}
      {on.includes("beng") ? <Beng /> : null}
      {on.includes("pihong") ? <Pihong /> : null}
      {on.includes("majia") ? <Majia /> : null}
      {on.includes("nai") ? <Nai /> : null}
    </div>
  );
}

function Cao() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <ellipse cx="50" cy="54" rx="16" ry="6" fill="none" stroke="#6b8f3a" strokeWidth="2.6" />
      <circle cx="40" cy="52" r="2" fill="#c4a035" />
      <circle cx="50" cy="51" r="2.2" fill="#d4b84a" />
      <circle cx="60" cy="52" r="2" fill="#c4a035" />
    </svg>
  );
}

function Zhang() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <path d="M34 48h32l-2 9H36z" fill="#c23a2b" />
      <rect x="33" y="46" width="34" height="4" rx="1" fill="#8b1e16" />
      <text x="50" y="56" textAnchor="middle" fill="#f3ead3" fontSize="6" fontFamily="serif">
        涨
      </text>
    </svg>
  );
}

function Que() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <ellipse cx="66" cy="50" rx="6.5" ry="4" fill="#c9b896" />
      <circle cx="71" cy="49" r="2.2" fill="#b7a47a" />
      <path d="M73 49l3.5 1-3.5 1z" fill="#c23a2b" />
      <path d="M60 51q-5 3-3 7" fill="none" stroke="#8a7a58" strokeWidth="1" />
    </svg>
  );
}

function Jing() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <rect x="37" y="58" width="9" height="6" rx="2" fill="#1a1610" opacity="0.88" />
      <rect x="54" y="58" width="9" height="6" rx="2" fill="#1a1610" opacity="0.88" />
      <path d="M46 61h8" stroke="#1a1610" strokeWidth="1.1" />
    </svg>
  );
}

function Beng() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <path d="M38 55c8-3 16-3 24 0" fill="none" stroke="#f3ead3" strokeWidth="3" />
      <path d="M42 53l3 5M58 53l-3 5" stroke="#c23a2b" strokeWidth="0.8" />
    </svg>
  );
}

function Pihong() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <path
        d="M32 76q18 16 36 2"
        fill="none"
        stroke="#c23a2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M31 75l-3 12M69 77l3 12" stroke="#c23a2b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Majia() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <path d="M34 74l-3 20h38l-3-20-6 5H40z" fill="#c23a2b" opacity="0.9" />
      <path d="M50 78v12" stroke="#f3ead3" strokeWidth="1" />
      <circle cx="50" cy="83" r="1.1" fill="#d4b84a" />
      <circle cx="50" cy="88" r="1.1" fill="#d4b84a" />
    </svg>
  );
}

function Nai() {
  return (
    <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full">
      <rect x="24" y="86" width="7" height="13" rx="1" fill="#f3ead3" />
      <rect x="25.2" y="82" width="4.6" height="5" rx="1" fill="#c23a2b" />
      <path d="M25.5 99h4v2.5h-4z" fill="#d4b84a" />
    </svg>
  );
}

export function TotemStage({
  src,
  on,
  className,
  children,
}: {
  src: string;
  on: FitId[];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <img
        src={src}
        alt="牛来图腾"
        className="relative z-0 mx-auto h-auto w-full select-none object-contain drop-shadow-2xl"
        draggable={false}
        crossOrigin="anonymous"
      />
      <TotemOverlays on={on} />
      {children}
    </div>
  );
}
