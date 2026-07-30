# Fiona.ink backend deploy blockers

These block the booking form from actually saving/notifying anyone. Check a box (change `[ ]` to `[x]`) and commit once done — the daily health-check routine reads this file and stops nagging about completed items.

- [x] **Neon connection string** — Create a Postgres database/branch in Neon, grab the connection string, share it so it can be set as `DATABASE_URL` on Render.
- [x] **Render account + web service** — Create a Render account, new Web Service pointed at the `backend/` folder of this repo. (Rebuilt clean 2026-07-19/20 via Blueprint after two prior services were misconfigured as Node runtime.)
- [x] **Admin login for Fiona's dashboard** — Decide on an admin email + password (or approve Claude generating one) for `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

All three done. Backend is live at fiona-ink-backend.onrender.com, `REACT_APP_BACKEND_URL` is set on Vercel, and a real test booking has been confirmed saving to the database (2026-07-20).

**New blocker found:** booking form was wired to Formspree instead of this backend — fixed 2026-07-20, now posts to `/api/bookings` directly.

**Still open:** SMS notification to Fiona doesn't fire — needs a dedicated Twilio number + A2P 10DLC registration + `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/`TWILIO_FROM_NUMBER`/`FIONA_PHONE_NUMBER` set on Render. See SESSION_LOG.md.
