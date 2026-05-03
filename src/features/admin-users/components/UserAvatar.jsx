import React from 'react';
import { getAvatarInitial } from '../utils/constants';

const PALETTE = [
  'bg-blue-500',
  'bg-violet-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-pink-500',
];

function colorFromId(id) {
  const n = parseInt(String(id).replace(/\D/g, '') || '0', 10);
  return PALETTE[n % PALETTE.length];
}

/**
 * Circular avatar with coloured background and initial fallback.
 * @param {{ user: object, size?: 'sm'|'md'|'lg' }} props
 */
export function UserAvatar({ user, size = 'md' }) {
  const initial = getAvatarInitial(user);
  const color = colorFromId(user?.id ?? 0);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-20 w-20 text-2xl',
  }[size];

  return (
    <span
      aria-hidden="true"
      className={[
        'inline-flex items-center justify-center rounded-full font-bold text-white shrink-0 select-none',
        sizeClasses,
        color,
      ].join(' ')}
    >
      {initial}
    </span>
  );
}
