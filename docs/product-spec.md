# CampusMatch Product Spec (MVP)

Date: February 17, 2026

## Product Summary

CampusMatch is a college-only dating app designed for verified students at supported schools. The core promise is better matches through three signals that matter in student life: schedule overlap, relationship intent, and campus lifestyle compatibility. The MVP focuses on safe, high-density campus communities rather than broad geographic reach.

## Problem and Opportunity

Existing dating apps create low-quality matches for students because they ignore campus constraints (class schedules, commuting, social rhythms) and intent alignment (serious vs casual). This leads to low message conversion, awkward on-campus encounters, and poor trust. CampusMatch addresses this with verified school access, student-first profile fields, and compatibility scoring that emphasizes realistic availability and intent.

## Target Users

- Primary: 18+ undergraduate and graduate students at supported Northeast US campuses.
- Early launch profile: medium-to-large schools where match density can be sustained.
- User mindset: wants intentional dating, safer campus interactions, and clearer compatibility before chatting.

## Product Principles and Non-Negotiables

- College-only access via supported school email verification.
- 18+ requirement enforced during onboarding.
- Privacy-safe by default: no exact location, no dorm names, no exact schedule display.
- Same-school discovery first for density and safety.
- Mature, intentional interaction model (button-based like/pass in MVP).

## MVP Scope

### In Scope

- Supported schools gating with live/coming-soon campuses.
- `.edu` email OTP verification before discovery and matching.
- Profile setup with:
  - 2-6 photos
  - student snapshot (school, grad year, living situation, lifestyle sliders)
  - relationship intent (intent, pace, time commitment)
  - 5-15 interests
  - short prompts
  - generalized availability blocks
- Discovery feed ranked by compatibility with reasons shown.
- Matching via private likes and mutual match creation.
- Text chat for matches.
- Plan button with student templates (for example: coffee between classes, study date).
- Safety controls: block, report, unmatch, pause profile.
- Basic moderation queue with admin enforcement actions.
- Analytics events for activation, matching, messaging, and safety.

### Out of Scope (Post-MVP)

- Cross-campus matching by default.
- Media messages (images/video in chat).
- Fully automated moderation workflows.
- Event-based matching and advanced recommendation ML.
- Full premium feature set (incognito, boosts, advanced filters).

## Core User Flows

1. Onboarding and verification
   - User selects school from supported list.
   - User verifies ownership of school email via OTP (time-limited, rate-limited).
   - User creates account and completes profile minimum requirements.
   - User enters discovery only after verification and minimum profile completion.

2. Discovery and matching
   - Feed prioritizes same-school candidates and compatibility score.
   - User can like/pass; likes are private unless mutual.
   - On mutual like, match is created and chat becomes available.
   - User can apply filters (intent, graduation year range, distance bucket, living situation).

3. Messaging and planning
   - Matched users send text messages.
   - Plan templates insert suggested meet windows based on overlap blocks.
   - Social handle sharing is opt-in and per match.

4. Safety and moderation
   - User can block/report/unmatch from profile or chat.
   - Reports capture category and context for moderation queue.
   - Moderators can warn, remove content, temporary ban, or permanent ban with audit trail.

## Compatibility Model (MVP)

Compatibility is displayed as a rounded percentage (0-100) and explained in plain language. Inputs:

- Time overlap: generalized availability block overlap.
- Shared interests: tag overlap and top common interests.
- Relationship intent alignment: intent, pace, and time commitment (high weight or hard filter if user requires same intent).
- Lifestyle fit: study/social and early/late preference alignment.
- Optional location proximity bucket: broad walk/commuter buckets only.

Hard filters: supported school, 18+, blocked/banned exclusion, and optional same-intent-only toggle.

## Data and Privacy Requirements

- First-name display by default; avoid exposing last names.
- School and grad year visible as core context.
- No exact location fields in public profile.
- No exact schedule display; only generalized overlap outputs.
- Contact upload uses hashed identifiers for "hide contacts" behavior.
- Account deletion must remove public profile visibility quickly and process retention/deletion policy requirements.

## Success Metrics (Day-One Instrumentation)

- Activation rate: verified + minimum profile completed.
- Match rate: matches per active user per week.
- Message start rate: % of matches with at least one message within 24 hours.
- Plan usage rate: % of chats sending a plan template.
- Safety metrics: report rate, median time-to-action, repeat offender rate.
- Retention: D1/D7 by campus and onboarding completion stage.

## Monetization Approach

Free tier remains fully usable for core value (matching and messaging). Monetization in/after MVP should focus on quality and control, not paywalling communication:

- Free: daily like limits + standard filters.
- Premium (phased): higher like limits, advanced filters/sorting, incognito mode, peak-hour boost.
- Packaging: monthly subscription and semester discount options.

## Launch Plan

- Wave 1: 8-12 Northeast campuses with high population and social density.
- Campus-by-campus rollout to maintain healthy match pools.
- Ambassador support to seed early adoption.
- Exit criteria before expansion:
  - Stable activation and message-start rates
  - Moderation SLA met
  - No privacy regressions in profile/discovery surfaces
