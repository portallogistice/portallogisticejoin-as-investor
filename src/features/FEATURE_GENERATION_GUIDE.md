# Feature Generation Guide (AI-Ready)

This guide defines the standard structure and conventions for creating new features in `src/features`.

Use this document as input to any AI agent so generated files match this project.

---

## 1) Canonical Feature Folder Structure

Each feature should live under:

`src/features/<feature-name>/`

Recommended structure:

```text
src/features/<feature-name>/
├── api/
│   ├── get<Feature>.js
│   ├── create<Feature>.js
│   ├── update<Feature>.js
│   └── delete<Feature>.js
├── hooks/
│   ├── use<Feature>.js
│   ├── useCreate<Feature>.js
│   ├── useUpdate<Feature>.js
│   └── use<Feature>Form.js
├── components/
│   ├── <Feature>Card.jsx
│   ├── StatusBadge.jsx
│   ├── SummaryStrip.jsx
│   ├── LoadingState.jsx
│   └── EmptyState.jsx
├── modals/                 # optional
│   ├── ConfirmModal.jsx
│   └── <Feature>Modal.jsx
├── pages/
│   └── <Feature>Page.jsx
├── utils/
│   ├── constants.js
│   └── formatters.js
├── constants/              # optional (if large config maps)
│   └── constants.js
├── stores/                 # optional (zustand, if feature-local state needed)
│   └── <feature>Store.js
└── index.js
```

Notes:
- Keep files feature-scoped; avoid cross-feature coupling.
- Add folders only when needed (do not create empty unused folders unless explicitly requested).

---

## 2) Naming Conventions

- **Feature folder:** kebab-case (e.g. `contract-info`, `admin-users`).
- **React components/pages/modals:** PascalCase file names (e.g. `ContractsPage.jsx`).
- **Hooks:** `useSomething.js`.
- **API files:** verb-first (e.g. `getContracts.js`, `uploadReceipt.js`).
- **Utility files:** `constants.js`, `formatters.js`.
- **Barrel file:** always `index.js`.

---

## 3) Import and Export Rules

### Internal imports
- Prefer relative imports inside feature:
  - `../api/...`
  - `../hooks/...`
  - `../components/...`

### Feature barrel (`index.js`)
Export:
- primary page
- main hooks
- selected reusable components/constants

Example:

```js
export { default as ContractsPage } from './pages/ContractsPage';
export { useContracts } from './hooks/useContracts';
export { StatusBadge } from './components/StatusBadge';
```

---

## 4) API Layer Pattern

Place raw server calls in `api/`.

Guidelines:
- one function per API file when practical
- keep API functions pure (no UI logic)
- return normalized response shape if needed

Typical shape:

```js
import api from '../../../lib/api';

export async function getSomething(params) {
  const { data } = await api.get('/endpoint', { params });
  return data?.data ?? data;
}
```

---

## 5) Hooks Layer Pattern (React Query)

Hooks consume `api/` and expose UI-ready state.

Guidelines:
- query keys centralized/consistent
- use `useQuery` for reads, `useMutation` for writes
- keep side effects in hook callbacks, not components

Example:

```js
import { useQuery } from '@tanstack/react-query';
import { getSomething } from '../api/getSomething';

export const SOMETHING_QUERY_KEY = ['something'];

export function useSomething() {
  return useQuery({
    queryKey: SOMETHING_QUERY_KEY,
    queryFn: getSomething,
  });
}
```

---

## 6) UI Component Pattern

Component roles:
- `LoadingState`: loading skeleton/spinner
- `EmptyState`: no-data message
- `StatusBadge`: status visual mapping
- `<Feature>Card`: one item display
- `SummaryStrip`: top metrics summary

Guidelines:
- use Tailwind utility classes directly
- support dark mode (`dark:*`)
- ensure mobile-first responsiveness (`sm:`, `md:`, `lg:`)
- keep components presentation-focused; business logic stays in hooks

---

## 7) Page Composition Pattern

`pages/<Feature>Page.jsx` should:
1. Call feature hooks
2. Handle `loading`, `error`, `empty`
3. Compose components/modals
4. Keep layout and orchestration only

---

## 8) Required Quality Checklist

When generating a new feature, ensure:

- [ ] Has `index.js` barrel exports
- [ ] Has page component under `pages/`
- [ ] Has at least one data hook and API file
- [ ] Includes `LoadingState` and `EmptyState`
- [ ] Uses Tailwind responsive + dark classes
- [ ] No unresolved imports
- [ ] No mixed default/named export mistakes
- [ ] Lint passes for modified files
- [] all files are responsive

---

## 9) AI Prompt Template (Copy/Paste)

Use this prompt with any coding agent:

```text
Create a new feature in src/features/<feature-name> following project standards.

Requirements:
1) Create folders/files using this structure:
   - api/, hooks/, components/, pages/, utils/, index.js
   - add modals/ only if needed
2) Implement:
   - API functions in api/
   - React Query hooks in hooks/
   - Tailwind-based responsive components in components/
   - main page in pages/<Feature>Page.jsx
   - constants/formatters in utils/ when needed
3) Export public surface from index.js.
4) Use dark mode and mobile-first responsive classes.
5) Keep logic in hooks and API; keep UI components presentational.
6) After generation, run lint checks for changed files and fix issues.

Output:
- List of created files
- Short explanation of each file responsibility
- Any follow-up integration needed in src/index.js routes
```

---

## 10) Integration Reminder

After creating a feature, wire it into app routing if needed:
- usually in `src/index.js`
- import page from `src/features/<feature>/pages/<Feature>Page`
- add route under dashboard/admin layout as appropriate
