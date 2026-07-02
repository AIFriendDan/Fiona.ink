# Fiona.ink backend deploy blockers

These block the booking form from actually saving/notifying anyone. Check a box (change `[ ]` to `[x]`) and commit once done — the daily health-check routine reads this file and stops nagging about completed items.

- [ ] **Neon connection string** — Create a Postgres database/branch in Neon, grab the connection string, share it so it can be set as `DATABASE_URL` on Render.
- [ ] **Render account + web service** — Create a Render account, new Web Service pointed at the `backend/` folder of this repo.
- [ ] **Admin login for Fiona's dashboard** — Decide on an admin email + password (or approve Claude generating one) for `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Once all three are checked, the backend can be deployed and `REACT_APP_BACKEND_URL` pointed at it on Vercel.
