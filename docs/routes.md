# CampusMatch Expo Router Map (MVP)

Date: February 17, 2026

This is the proposed Expo Router structure for MVP based on the product notes and current app direction.

## Access States

- `unauthenticated`: can only access auth/onboarding entry routes.
- `verified_incomplete`: can access profile-setup routes until minimum profile is complete.
- `active`: full app access (discovery, matches, chat, settings).
- `admin_moderator`: internal moderation routes only.

## Proposed Route Groups and Screens

```text
app/
  _layout.tsx
  (auth)/
    _layout.tsx
    welcome.tsx
    onboarding/
      supported-schools.tsx
      verify-email.tsx
      create-password.tsx
    login.tsx
    forgot-password.tsx

  (profile-setup)/
    _layout.tsx
    photos.tsx
    student-snapshot.tsx
    relationship-intent.tsx
    interests.tsx
    prompts.tsx
    review.tsx

  (tabs)/
    _layout.tsx
    discover.tsx
    matches.tsx
    chats.tsx
    profile.tsx

  chat/
    [matchId].tsx

  user/
    [userId].tsx

  settings/
    _layout.tsx
    index.tsx
    privacy.tsx
    notifications.tsx
    blocked-users.tsx
    subscription.tsx
    help.tsx
    support.tsx

  safety/
    report.tsx

  premium/
    paywall.tsx

  (modals)/
    _layout.tsx
    filters.tsx
    plan-template.tsx
    share-social.tsx

  (admin)/
    _layout.tsx
    login.tsx
    reports.tsx
    users/
      [userId].tsx
    enforcement.tsx
    analytics.tsx
```

## Screen Index

| Group | File | URL Path | Purpose | Access |
|---|---|---|---|---|
| `(auth)` | `app/(auth)/welcome.tsx` | `/welcome` | App intro and entry CTA | `unauthenticated` |
| `(auth)` | `app/(auth)/onboarding/supported-schools.tsx` | `/onboarding/supported-schools` | Choose supported school | `unauthenticated` |
| `(auth)` | `app/(auth)/onboarding/verify-email.tsx` | `/onboarding/verify-email` | .edu OTP verification | `unauthenticated` |
| `(auth)` | `app/(auth)/onboarding/create-password.tsx` | `/onboarding/create-password` | Credential setup | `unauthenticated` |
| `(auth)` | `app/(auth)/login.tsx` | `/login` | Existing user login | `unauthenticated` |
| `(profile-setup)` | `app/(profile-setup)/photos.tsx` | `/photos` | Upload 2-6 photos | `verified_incomplete` |
| `(profile-setup)` | `app/(profile-setup)/student-snapshot.tsx` | `/student-snapshot` | School context and lifestyle sliders | `verified_incomplete` |
| `(profile-setup)` | `app/(profile-setup)/relationship-intent.tsx` | `/relationship-intent` | Intent, pace, time commitment | `verified_incomplete` |
| `(profile-setup)` | `app/(profile-setup)/interests.tsx` | `/interests` | Select 5-15 interests | `verified_incomplete` |
| `(profile-setup)` | `app/(profile-setup)/prompts.tsx` | `/prompts` | Student prompt answers | `verified_incomplete` |
| `(profile-setup)` | `app/(profile-setup)/review.tsx` | `/review` | Final validation before activation | `verified_incomplete` |
| `(tabs)` | `app/(tabs)/discover.tsx` | `/discover` | Discovery feed (like/pass, reasons) | `active` |
| `(tabs)` | `app/(tabs)/matches.tsx` | `/matches` | Match confirmations and list | `active` |
| `(tabs)` | `app/(tabs)/chats.tsx` | `/chats` | Chat list | `active` |
| `(tabs)` | `app/(tabs)/profile.tsx` | `/profile` | My profile preview/edit entry | `active` |
| Standalone | `app/chat/[matchId].tsx` | `/chat/:matchId` | 1:1 conversation + plan CTA | `active` |
| Standalone | `app/user/[userId].tsx` | `/user/:userId` | Expanded profile card | `active` |
| `settings` | `app/settings/index.tsx` | `/settings` | Settings hub | `active` |
| `settings` | `app/settings/privacy.tsx` | `/settings/privacy` | Privacy controls | `active` |
| `settings` | `app/settings/blocked-users.tsx` | `/settings/blocked-users` | Manage blocked users | `active` |
| `settings` | `app/settings/subscription.tsx` | `/settings/subscription` | Subscription status and restore | `active` |
| `safety` | `app/safety/report.tsx` | `/safety/report` | Report flow | `active` |
| `premium` | `app/premium/paywall.tsx` | `/premium/paywall` | Premium upsell | `active` |
| `(modals)` | `app/(modals)/filters.tsx` | `/filters` | Discovery filters modal | `active` |
| `(modals)` | `app/(modals)/plan-template.tsx` | `/plan-template` | Plan card creation modal | `active` |
| `(modals)` | `app/(modals)/share-social.tsx` | `/share-social` | Share social handle modal | `active` |
| `(admin)` | `app/(admin)/reports.tsx` | `/reports` | Moderation queue | `admin_moderator` |
| `(admin)` | `app/(admin)/users/[userId].tsx` | `/users/:userId` | User review and enforcement context | `admin_moderator` |
| `(admin)` | `app/(admin)/enforcement.tsx` | `/enforcement` | Warn/ban actions with audit trail | `admin_moderator` |
| `(admin)` | `app/(admin)/analytics.tsx` | `/analytics` | Safety and growth monitoring | `admin_moderator` |

## Root Layout Responsibilities

- `app/_layout.tsx` should host a root `Stack` and redirect by access state:
  - `unauthenticated` -> `/welcome`
  - `verified_incomplete` -> first incomplete profile-setup screen
  - `active` -> `/discover`
- `(tabs)/_layout.tsx` should define the 4 main tabs: `discover`, `matches`, `chats`, `profile`.
- `(modals)/_layout.tsx` should set modal presentation for filters/plan/share flows.

## Current Repository Snapshot (for migration)

Already implemented today:

- `app/(auth)/welcome.tsx` (`/welcome`)
- `app/(tabs)/discover.tsx` (`/discover`)
- `app/(tabs)/index.tsx` (`/`) as a redirect-only shim to `/discover`
- `app/(tabs)/explore.tsx` (`/explore`)
- `app/(profile-setup)/photos.tsx` (`/photos`)
- `app/chat/[matchId].tsx` (`/chat/:matchId`)
- `app/onboarding/supported-schools.tsx` (`/onboarding/supported-schools`)
- `app/onboarding/verify-email.tsx` (`/onboarding/verify-email`)
- `app/modal.tsx` (`/modal`)

These can be incrementally moved to the route groups above as onboarding and messaging features are implemented.
