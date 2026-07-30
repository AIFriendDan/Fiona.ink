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
- Rename Neon DB `fionas_ass` → something real (original AIF-30 ask, still open).

## 2026-07-20 (cont.) — domain, real booking test, SMS gap found, expense reminders started

### Decisions
- `fiona.ink` is owned by a third party, not purchasable — bought `fionatats.ink` instead ($2.99 first-yr promo via Vercel, auto-renew on). Logged to Notion Business Expenses tracker, billable to Fiona per Dan.
- CORS_ORIGINS updated in render.yaml from `fiona.ink` to `fionatats.ink`/`www.fionatats.ink`, pushed and confirmed live.

### Pivots / discoveries
- End-to-end booking flow confirmed fully working 2026-07-20: real submission through fionatats.ink → backend → Neon DB, verified via direct API check (not just the success toast).
- SMS notification to Fiona has never actually fired. `notify_new_booking()` needs `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/`TWILIO_FROM_NUMBER`/`FIONA_PHONE_NUMBER` — none are set on Render. They *were* set once (per 2026-07-05 archived notes, Dan added them directly in the Render dashboard), but got wiped when the broken Render services were deleted and rebuilt via Blueprint earlier this session — Blueprint only restores what's explicitly in render.yaml.
- Existing HCiHY Twilio number (+1 805 765 3711) is the **official manned business/answering-bot line** — confirmed by Dan, do not reuse for Fiona's booking alerts. Needs a **separate, dedicated Twilio number** for Fiona.
- Site also has fake placeholder content beyond stock photos: testimonials (Alex Chen/Sarah Morrison/Marcus Johnson — none real), fake contact email (`fiona.ink@example.com`), fake phone number. Not yet fixed — needs real photos/testimonials/contact info from Dan or Fiona.
- No Twilio MCP connector available (registry only has a docs-search Twilio connector, no account/provisioning access) — number purchase + A2P 10DLC registration has to happen manually in Twilio console.
- Started a separate ask: monthly "safety number" + staggered T-7/T-3/T-1 renewal reminders across all HCiHY/AiFriendDan recurring expenses (domains, Slack Pro, Formspree, Twilio). Most amounts are logged as TBD in the Notion expense tracker — blocked on Dan pulling real renewal prices from card statements/registrar dashboards before this can be built accurately.

### Blocked / needs Dan
- **Twilio for Fiona**: buy a dedicated number in the Twilio console (separate from the HCiHY answering-bot line), complete A2P 10DLC registration if needed, get Account SID + Auth Token + new number, and get Fiona's real cell number — then these 4 values get set as Render secrets to turn SMS notifications on.
- **Expense reminder system**: need real renewal $ amounts for `guestplot.com`, `aifrienddan.com`, `hcihytech.com`, `leilanisclassycleaning.com`, and Slack Pro (all currently TBD) before the monthly obligation number and reminder schedule can be built.
- Rename Neon DB `fionas_ass` → something real (still open, carried over).
- Real photos, real testimonials, real contact email/phone to replace placeholder content on fionatats.ink.
