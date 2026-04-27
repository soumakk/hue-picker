import React from "react";

export default function Header() {
  return (
    <div className=" mb-5">
      <div className="flex items-center gap-3">
        <HueLogo />
        <div>
          <h1 className="text-xl text-neutral-900 font-medium">Hue Picker</h1>
          <p className="text-sm text-neutral-500">
            Pick, adjust and explore colors{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HueLogo() {
  return (
    <div className="relative h-10 w-10 rounded-full overflow-hidden">
      {/* Animated gradient */}
      <div className="absolute inset-0 animate-gradient-flow" />

      {/* Soft lighting */}
      <div
        className="absolute inset-0"
        style={{
          background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(0,0,0,0.15), transparent 70%)
            `,
        }}
      />
    </div>
  );
}
