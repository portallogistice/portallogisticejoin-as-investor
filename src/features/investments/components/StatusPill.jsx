import { STATUS_CONFIG } from '../utils/constants';

export function StatusPill({ status, className = '', wrap = false }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const lineClamp = wrap ? 'whitespace-normal text-center leading-tight' : 'whitespace-nowrap truncate';

    return (
        <span
            className={`inline-flex max-w-full items-center justify-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border ${lineClamp} ${config.className} ${className}`.trim()}
        >
            {config.label}
        </span>
    );
}