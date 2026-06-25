# Fix react-router-dom vulnerability

Update `react-router-dom` from 6.30.1 to the latest patched 6.x release (6.30.2+), which fixes the XSS-via-open-redirect advisories (GHSA-2w69-qvjg-hvjx, GHSA-9jcx-v3wj-wh4m, GHSA-2j2x-hqr9-3h42) without any breaking API changes.

## Steps
1. Bump `react-router-dom` to `^6.30.2` (latest 6.x) via `bun add`. This also pulls in patched `react-router` / `@remix-run/router`.
2. Let the dev server rebuild and verify the app still loads (routing is used across `App.tsx`, `Agendar.tsx`, painel pages, etc. — no API changes expected).
3. Mark the supply-chain findings as fixed.

## Notes
- Staying on v6 avoids the v7 migration (Data APIs, changed types, framework mode). All current usage (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`) is unchanged in 6.30.2.
- No application code changes required.
