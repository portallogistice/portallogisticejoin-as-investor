// src/features/dashboard/components/ProgressRing.jsx
export function ProgressRing({ pct, size = 110, stroke = 10, color = '#2563eb' }) {
    const safePct = Math.max(0, Math.min(Number.isFinite(pct) ? pct : 0, 100));
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (safePct / 100) * circ;

    return (
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    className="dark:stroke-slate-600/60"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="text-xl font-extrabold text-gray-900 max-[480px]:text-base dark:text-slate-100">{safePct}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">مُستلَم</span>
            </div>
        </div>
    );
}