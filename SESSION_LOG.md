# Session Log — Fiona.ink

## 2026-07-19/20 — AIF-30 deploy unblock

### Decisions
- Deleted 3 misconfigured Render services (`fiona-ink-backend` x2 on Node runtime, `Fiona.ink` on Python but stale/pre-render.yaml) and rebuilt clean via Render's Blueprint flow reading `render.yaml`, instead of patching in place — Render doesn't allow changing a service's runtime type post-creation.
- Rewired the public booking form (`Contact.jsx`) from Formspree to the real FastAPI backend (`POST /api/bookings`) — this is the actual fix for "booking form saves nothing," not just the deploy.
- `fiona.ink` domain is owned by a third party, not purchasable. Bought `fionatats.ink` instead ($2.99 first-year promo via Vercel, auto-renew on, likely renews ~$20-35/yr). Billable to Fiona per Dan.

### Pivots / discoveries
- Neon + Render account/service already existed per 7/18 Linear comment — the scheduled reminder telling Dan to create them was stale. Real blockers were config bugs, not missing setup.
- Root cause of both failed Render deploys: `fiona-ink-backend` was created as a **Node** service despite being a Python/FastAPI app — explains the npm ENOENT error. Unpinned Python version (grabbed 3.14) also broke the pip install on an earlier attempt (`grpcio-status==1.71.2` had no prebuilt wheel).
- Booking form was never actually connected to the custom backend/Neon DB at all — it posted to Formspree the whole time. Everything built (Neon, Render, SMS notify code) was unused until this session's fix.
- No dedicated Render MCP connector exists in the registry — Render dashboard steps stay manual for now.

### New tools / skills / automations
- None new; used existing Linear, Vercel, and Notion connectors already live in this workspace.

### Blocked / needs Dan
- Attach `fionatats.ink` to the `frontend` Vercel project (Settings → Domains) once nameserver propagation finishes.
- Update backend `CORS_ORIGINS` (in `render.yaml`, currently `https://fiona.ink,https://www.fiona.ink`) to the new domain — not yet pushed.
- Rename Neon DB `fionas_ass` → something real (original AIF-30 ask, still open).
- Run a real end-to-end booking test once CORS is updated and domain is live.
