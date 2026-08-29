/**
 * Fixed ambient glow for DWS surfaces. Motion lives in globals.css
 * (`dws-orb-drift` / `dws-orb-pulse`) so reduced-motion can kill it in one place.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="dws-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="dws-ambient__wash" />
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
