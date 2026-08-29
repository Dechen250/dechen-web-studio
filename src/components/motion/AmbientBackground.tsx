/**
 * 3D rain of brand letters behind DWS surfaces.
 * Motion lives in globals.css so reduced-motion can kill it in one place.
 */

const BRAND = "DECHENWEBSTUDIO";

type Drop = {
  ch: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
  z: string;
  rx: string;
  ry: string;
  drift: string;
  opacity: string;
  far: boolean;
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDrops(count: number): Drop[] {
  const rand = mulberry32(250626);
  return Array.from({ length: count }, (_, index) => {
    const depth = rand();
    const far = depth > 0.55;
    const size = 1.1 + (1 - depth) * 3.4;
    return {
      ch: BRAND[index % BRAND.length],
      left: `${rand() * 100}%`,
      size: `${size}rem`,
      duration: `${10 + rand() * 14}s`,
      delay: `${-rand() * 22}s`,
      z: `${Math.round((depth - 0.45) * -520)}px`,
      rx: `${Math.round((rand() - 0.5) * 70)}deg`,
      ry: `${Math.round((rand() - 0.5) * 90)}deg`,
      drift: `${Math.round((rand() - 0.5) * 18)}vw`,
      opacity: far ? "0.1" : "0.2",
      far,
    };
  });
}

const drops = buildDrops(48);

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="dws-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="dws-ambient__wash" />
      <div className="dws-rain">
        {drops.map((drop, index) => (
          <span
            key={`${drop.ch}-${index}`}
            className={
              drop.far ? "dws-rain-letter dws-rain-letter--far" : "dws-rain-letter"
            }
            style={{
              left: drop.left,
              fontSize: drop.size,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
              ["--z" as string]: drop.z,
              ["--rx" as string]: drop.rx,
              ["--ry" as string]: drop.ry,
              ["--drift" as string]: drop.drift,
              ["--op" as string]: drop.opacity,
            }}
          >
            {drop.ch}
          </span>
        ))}
      </div>
      <div className="dws-orb-slot dws-orb-slot--hero">
        <div className="dws-orb dws-orb--hero" />
      </div>
      <div className="dws-orb-slot dws-orb-slot--left">
        <div className="dws-orb dws-orb--left" />
      </div>
      <div className="dws-orb-slot dws-orb-slot--right">
        <div className="dws-orb dws-orb--right" />
      </div>
      <div className="dws-orb-slot dws-orb-slot--core">
        <div className="dws-orb dws-orb--core" />
      </div>
      <div className="dws-ambient__vignette" />
    </div>
  );
}
