# AGENTS.md, CampusMatch Codex instructions

## Project stack
- Expo Router app in TypeScript.
- UI: React Native, no new UI libraries unless explicitly approved.
- Backend: Supabase (Auth, Postgres, RLS, Storage, Realtime).

## Product rules, non negotiables
- College only dating app.
- Supported schools gating, users must have a supported school email domain to activate discovery.
- 18+ only. Add age gating during onboarding.
- Privacy: do not expose exact location or exact schedule blocks publicly.
- Safety required: block and report. Blocking must immediately hide users from discovery, matches, and chat.

## Data and security rules
- Use Row Level Security on all user data tables.
- Client uses Supabase publishable key only, never use service role key in the app.
- Enforce integrity server side where possible (constraints, views, RPC, Edge Functions), not only in the client.
- Prevent duplicate matches using an ordered pair (user_a < user_b) and unique constraint.

## Development workflow
- Keep changes small and focused. One feature per branch.
- List every file created or modified.
- Prefer minimal diffs over rewrites.
- Do not add dependencies unless I approve first.
- Add clear error handling, loading states, and empty states for screens you touch.
- Keep code style consistent with the existing repo.

## Navigation and folders
- Use Expo Router route groups:
  - app/(auth) for sign in and sign up
  - app/(onboarding) for onboarding steps
  - app/(tabs) for the main app (discovery, matches, chat, profile/settings)
- Reusable UI goes in components/.
- App wide constants go in constants/.
- Hooks go in hooks/.
- Supabase client lives in lib/supabase.ts.

## Deliverables format
When you implement something:
1) Brief plan, 5 to 10 bullets max.
2) Files changed (created/edited) with paths.
3) Code changes.
4) Any SQL migration in a single block, plus any RLS policies in a single block.
5) How to test manually in Expo Go.

## Out of scope unless I ask
- Payment or premium features.
- Advanced matchmaking algorithms.
- Background jobs beyond basic notifications.
- Full moderation dashboard.
