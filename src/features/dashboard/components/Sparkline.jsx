// src/features/dashboard/components/Sparkline.jsx
import { useMemo } from 'react';

export function Sparkline({ data, color = '#2563eb' }) {
    const points = useMemo(() => {
        const w = 80, h = 28, pad = 3;
        const min = Math.min(...data);
        const max = Math.max(...data);

        const sx = (i) => pad + (i / (data.length - 1)) * (w - pad * 2);
        const sy = (v) => max === min ? h / 2 : h - pad - ((v - min) / (max - min)) * (h - pad * 2);

        return data.map((v, i) => `${sx(i)},${sy(v)}`).join(' ');
    }, [data]);

    return (
        <svg width={80} height={28} viewBox="0 0 80 28" aria-hidden="true">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}