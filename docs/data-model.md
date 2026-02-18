# CampusMatch Data Model (MVP)

Date: February 17, 2026

This model targets Supabase/Postgres for MVP. It covers user verification, profiles, matching, messaging, safety, and subscriptions.

## Conventions

- Primary keys: `uuid` unless noted.
- Timestamps: `timestamptz` with `default now()`.
- User identity: app `users.id` should mirror `auth.users.id`.
- PII minimization: no exact dorm/location fields; no exact schedule times.

## Enums

- `school_status`: `live`, `coming_soon`
- `user_status`: `unverified`, `verified_incomplete`, `active`, `paused`, `banned`
- `living_situation`: `dorm`, `off_campus`, `commuter`
- `relationship_intent`: `serious`, `dating_with_intention`, `casual`, `not_sure`, `friends_first`
- `dating_pace`: `slow`, `normal`, `fast`
- `time_commitment`: `once_weekly`, `two_to_three_weekly`, `flexible`
- `moderation_state`: `pending`, `approved`, `rejected`
- `match_status`: `active`, `unmatched`, `blocked`
- `message_type`: `text`, `plan_card`, `social_card`
- `report_category`: `harassment`, `hate`, `sexual_content`, `spam_scam`, `fake_profile`, `underage`, `safety_threat`
- `report_status`: `open`, `in_review`, `resolved`, `dismissed`
- `enforcement_action`: `warn`, `remove_content`, `temp_ban`, `perm_ban`
- `subscription_status`: `trial`, `active`, `past_due`, `canceled`, `expired`

## Core Tables

### `schools`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `name` | `text` | not null, unique |
| `city` | `text` | not null |
| `state` | `text` | not null |
| `region` | `text` | not null, default `northeast` |
| `status` | `school_status` | not null, default `coming_soon` |
| `created_at` | `timestamptz` | not null |

### `school_domains`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `school_id` | `uuid` | FK -> `schools.id` (on delete cascade) |
| `domain` | `text` | not null, unique (e.g. `rutgers.edu`) |
| `is_primary` | `boolean` | not null, default `false` |
| `created_at` | `timestamptz` | not null |

### `users`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK, matches `auth.users.id` |
| `email` | `text` | not null, unique |
| `school_id` | `uuid` | FK -> `schools.id` |
| `status` | `user_status` | not null, default `unverified` |
| `age_confirmed` | `boolean` | not null, default `false` |
| `is_selfie_verified` | `boolean` | not null, default `false` |
| `created_at` | `timestamptz` | not null |
| `last_active_at` | `timestamptz` | nullable |
| `paused_at` | `timestamptz` | nullable |
| `banned_at` | `timestamptz` | nullable |

### `email_verification_codes`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `users.id` (on delete cascade) |
| `school_domain_id` | `uuid` | FK -> `school_domains.id` |
| `code_hash` | `text` | not null |
| `expires_at` | `timestamptz` | not null |
| `attempt_count` | `integer` | not null, default `0` |
| `max_attempts` | `integer` | not null, default `5` |
| `consumed_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | not null |

### `school_waitlist_requests`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `school_name` | `text` | not null |
| `email_domain` | `text` | nullable |
| `contact_email` | `text` | nullable |
| `created_at` | `timestamptz` | not null |

## Profile Tables

### `profiles`

| Column | Type | Constraints / Notes |
|---|---|---|
| `user_id` | `uuid` | PK, FK -> `users.id` (on delete cascade) |
| `display_name` | `text` | not null (first name only by policy) |
| `last_initial` | `text` | nullable |
| `grad_year` | `smallint` | not null |
| `living_situation` | `living_situation` | not null |
| `study_social_score` | `smallint` | not null, check `between 1 and 5` |
| `early_late_score` | `smallint` | not null, check `between 1 and 5` |
| `relationship_intent` | `relationship_intent` | not null |
| `dating_pace` | `dating_pace` | not null |
| `time_commitment` | `time_commitment` | not null |
| `major_category` | `text` | nullable |
| `pronouns` | `text` | nullable |
| `is_discoverable` | `boolean` | not null, default `true` |
| `completed_at` | `timestamptz` | nullable |
| `updated_at` | `timestamptz` | not null |

### `profile_prompts`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `profiles.user_id` (on delete cascade) |
| `prompt_key` | `text` | not null (`first_date`, `study_spot`, `green_flag`) |
| `answer` | `text` | not null, char length limit in app/db |
| `position` | `smallint` | not null, check `between 1 and 3` |
| `created_at` | `timestamptz` | not null |

Unique: (`user_id`, `prompt_key`), (`user_id`, `position`)

### `interests`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `integer` | PK, generated identity |
| `slug` | `text` | not null, unique |
| `label` | `text` | not null, unique |
| `is_active` | `boolean` | not null, default `true` |

### `profile_interests`

| Column | Type | Constraints / Notes |
|---|---|---|
| `user_id` | `uuid` | FK -> `profiles.user_id` (on delete cascade) |
| `interest_id` | `integer` | FK -> `interests.id` |
| `created_at` | `timestamptz` | not null |

Primary key: (`user_id`, `interest_id`)

### `availability_blocks`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `integer` | PK, generated identity |
| `block_key` | `text` | not null, unique (`weekday_morning`, `weekend_evening`, etc.) |
| `label` | `text` | not null |
| `sort_order` | `smallint` | not null |
| `is_active` | `boolean` | not null, default `true` |

### `profile_availability_blocks`

| Column | Type | Constraints / Notes |
|---|---|---|
| `user_id` | `uuid` | FK -> `profiles.user_id` (on delete cascade) |
| `block_id` | `integer` | FK -> `availability_blocks.id` |
| `created_at` | `timestamptz` | not null |

Primary key: (`user_id`, `block_id`)

### `photos`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `profiles.user_id` (on delete cascade) |
| `storage_path` | `text` | not null |
| `display_order` | `smallint` | not null, check `between 1 and 6` |
| `moderation_state` | `moderation_state` | not null, default `pending` |
| `width` | `integer` | nullable |
| `height` | `integer` | nullable |
| `created_at` | `timestamptz` | not null |
| `deleted_at` | `timestamptz` | nullable |

Recommended unique index: (`user_id`, `display_order`) where `deleted_at is null`

## Matching and Messaging Tables

### `likes`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `from_user_id` | `uuid` | FK -> `users.id` (on delete cascade) |
| `to_user_id` | `uuid` | FK -> `users.id` (on delete cascade) |
| `created_at` | `timestamptz` | not null |

Unique: (`from_user_id`, `to_user_id`), check `from_user_id <> to_user_id`

### `passes`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `from_user_id` | `uuid` | FK -> `users.id` |
| `to_user_id` | `uuid` | FK -> `users.id` |
| `created_at` | `timestamptz` | not null |
| `expires_at` | `timestamptz` | nullable (for resurfacing logic) |

### `matches`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_a_id` | `uuid` | FK -> `users.id` |
| `user_b_id` | `uuid` | FK -> `users.id` |
| `status` | `match_status` | not null, default `active` |
| `created_at` | `timestamptz` | not null |
| `ended_at` | `timestamptz` | nullable |
| `ended_reason` | `text` | nullable |

Unique pair index should enforce one match per unordered user pair.

### `messages`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `match_id` | `uuid` | FK -> `matches.id` (on delete cascade) |
| `sender_id` | `uuid` | FK -> `users.id` |
| `message_type` | `message_type` | not null, default `text` |
| `body` | `text` | nullable for structured cards |
| `metadata` | `jsonb` | not null, default `{}` |
| `moderation_state` | `moderation_state` | not null, default `approved` |
| `created_at` | `timestamptz` | not null |

### `match_plan_cards`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `match_id` | `uuid` | FK -> `matches.id` (on delete cascade) |
| `sender_id` | `uuid` | FK -> `users.id` |
| `template_key` | `text` | not null (`coffee_between_classes`, `study_date`, `walk_food`) |
| `suggested_window` | `text` | not null |
| `note` | `text` | nullable |
| `created_at` | `timestamptz` | not null |

## Safety and Compliance Tables

### `blocks`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `blocker_user_id` | `uuid` | FK -> `users.id` |
| `blocked_user_id` | `uuid` | FK -> `users.id` |
| `reason` | `text` | nullable |
| `created_at` | `timestamptz` | not null |

Unique: (`blocker_user_id`, `blocked_user_id`), check `blocker_user_id <> blocked_user_id`

### `reports`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `reporter_user_id` | `uuid` | FK -> `users.id` |
| `reported_user_id` | `uuid` | FK -> `users.id` |
| `match_id` | `uuid` | FK -> `matches.id`, nullable |
| `message_id` | `uuid` | FK -> `messages.id`, nullable |
| `category` | `report_category` | not null |
| `notes` | `text` | nullable |
| `status` | `report_status` | not null, default `open` |
| `severity` | `smallint` | not null, check `between 1 and 5` |
| `created_at` | `timestamptz` | not null |
| `resolved_at` | `timestamptz` | nullable |
| `resolved_by_user_id` | `uuid` | FK -> `users.id`, nullable |

### `enforcement_actions`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `users.id` |
| `report_id` | `uuid` | FK -> `reports.id`, nullable |
| `moderator_user_id` | `uuid` | FK -> `users.id` |
| `action` | `enforcement_action` | not null |
| `reason` | `text` | not null |
| `starts_at` | `timestamptz` | not null |
| `ends_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | not null |

### `contact_hashes`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `users.id` (on delete cascade) |
| `contact_hash` | `text` | not null |
| `created_at` | `timestamptz` | not null |

Unique: (`user_id`, `contact_hash`)

## Revenue and Analytics Tables

### `subscriptions`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `users.id` |
| `provider` | `text` | not null (`apple`, `google`) |
| `external_subscription_id` | `text` | not null |
| `plan_code` | `text` | not null (`monthly`, `semester`) |
| `status` | `subscription_status` | not null |
| `current_period_end` | `timestamptz` | nullable |
| `canceled_at` | `timestamptz` | nullable |
| `created_at` | `timestamptz` | not null |
| `updated_at` | `timestamptz` | not null |

### `analytics_events`

| Column | Type | Constraints / Notes |
|---|---|---|
| `id` | `bigint` | PK, generated identity |
| `user_id` | `uuid` | FK -> `users.id`, nullable |
| `school_id` | `uuid` | FK -> `schools.id`, nullable |
| `event_name` | `text` | not null |
| `event_properties` | `jsonb` | not null, default `{}` |
| `session_id` | `uuid` | nullable |
| `created_at` | `timestamptz` | not null |

## Relationship Summary

- One `school` has many `school_domains` and many `users`.
- One `user` has one `profile`.
- One `user` has many `photos`, `profile_prompts`, `likes` sent/received, `passes`, `messages`, `reports`, and `blocks`.
- Many-to-many:
  - `profiles` <-> `interests` via `profile_interests`
  - `profiles` <-> `availability_blocks` via `profile_availability_blocks`
- One `match` connects two users and has many `messages` and `match_plan_cards`.
- One `report` may reference one `match` and one `message`, and may produce zero or more `enforcement_actions`.
- One `user` may have many `subscriptions` over time.

## Key Constraints to Enforce

- Discovery eligibility check:
  - `users.status = 'active'`
  - minimum 2 approved photos
  - minimum 5 interests
  - required profile fields completed
- Block/banned precedence:
  - blocked users and banned users never appear in discovery or chat.
- Privacy:
  - do not store public exact location/dorm fields in profile tables.
- Match uniqueness:
  - enforce one active match per user pair.
