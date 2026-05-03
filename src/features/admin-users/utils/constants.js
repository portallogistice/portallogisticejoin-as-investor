// ─── Query / pagination defaults ─────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 15;

// ─── Status helpers ───────────────────────────────────────────────────────────

/**
 * Returns true if the user row is considered "active".
 * Handles both boolean `is_active` and string `status` shapes from the API.
 */
export function isUserActive(user) {
  if (!user) return false;
  if (typeof user.is_active === 'boolean') return user.is_active;
  return user.status === 'active';
}

// ─── Name helpers ─────────────────────────────────────────────────────────────

/**
 * Derives the best display name from a user object.
 */
export function getFullName(user) {
  if (!user) return '—';
  const lastName = user.family_name ?? user.last_name;
  return (
    user.full_name ||
    [user.first_name, lastName].filter(Boolean).join(' ').trim() ||
    user.name ||
    '—'
  );
}

/**
 * Returns the uppercase initial character used for the avatar fallback.
 */
export function getAvatarInitial(user) {
  const name = getFullName(user);
  return (
    user?.first_name?.[0] ||
    user?.family_name?.[0] ||
    user?.name?.[0] ||
    name?.[0] ||
    '?'
  ).toUpperCase();
}

// ─── IBAN ─────────────────────────────────────────────────────────────────────

/**
 * Returns the IBAN without the SA prefix (used for the split input display).
 */
export function ibanWithoutPrefix(iban = '') {
  return String(iban).toUpperCase().startsWith('SA') ? iban.substring(2) : iban;
}
