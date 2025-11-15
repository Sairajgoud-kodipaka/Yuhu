# Screen_Flow.md — Yuhu Screen Flow and Wireframes

Version: 1.0
Status: MVP (48-hour)

---

# 1. Purpose

This document describes the mobile screen flows, core screens, primary navigation, and interaction notes for the Yuhu MVP. It's optimized for a fast React Native (Expo) implementation and clear handoff to designers and frontend engineers.

---

# 2. Top-level Navigation

Use a **bottom tab bar** with 4 tabs + a floating action where appropriate:

* Home (Announcements & Feed) — default
* Clubs (Club listing & pages)
* Elections (Active elections & results)
* Profile (User settings, Admin toggles)

Floating Action Button (FAB): Quick Create (Admin only) — Create Announcement / Create Election

---

# 3. Screen List (Primary)

1. Splash / Onboarding
2. Login / Signup (College email verification)
3. Home Feed (Announcements)
4. Announcement Detail (Full content + push CTA)
5. Clubs List
6. Club Page (Info + follow + club announcement list + Join button)
7. Club Chat (basic real-time chat)
8. Elections List
9. Election Detail (Candidates + Vote CTA)
10. Vote Confirmation
11. Results Page (Live results)
12. Profile / Settings
13. Admin Panel (Mobile view) — Create Announcement, Create Election, Assign Roles
14. Notifications Center (simple list)

---

# 4. Screen Flow Diagrams (Plain text)

## 4.1 New User Flow

Splash -> Onboarding -> Login/Signup -> Home Feed

If user role = admin: show Admin FAB

## 4.2 Announcement Flow

Home Feed -> Tap Announcement -> Announcement Detail -> (CTA) Push: "Follow Club" or "Register" -> Back

Admin: FAB -> Create Announcement -> Preview -> Publish -> Push Notification -> Announcement visible in Home Feed

## 4.3 Club Flow

Clubs Tab -> Clubs List -> Tap Club -> Club Page
From Club Page:

* Tap "Follow" -> Club added to user profile -> personalized feed filter
* Tap "Open Chat" (if member) -> Club Chat
* If Admin: FAB -> Create Club Announcement

## 4.4 Election Flow

Elections Tab -> Election List -> Tap Election -> Election Detail
Election Detail -> Tap Candidate -> Confirm Vote -> Success screen -> Return to Election
Admin: Create Election -> Add Candidates -> Publish -> Notify Users

## 4.5 Chat Flow

Club Page -> Open Chat -> Messages stream in real-time -> Input field to send message -> Auto-scroll
Message sent -> Broadcast to members (via Supabase/Firestore realtime)

---

# 5. Screen Wireframes (Text + layout guidance)

> Keep wireframes minimal for devs. Use standard mobile sizes (iPhone 12/13/14 viewport). Provide assets after MVP if needed.

## 5.1 Splash / Onboarding

* Full-screen logo
* Quick 1–2 slides: What is Yuhu / Why install
* CTA: "Get Started"

## 5.2 Login / Signup

* Header: "Sign in to Yuhu"
* Input: College email (required) + Continue button
* Optional: Phone OTP fallback
* Small footer: "By continuing you agree..."

## 5.3 Home Feed

* Top: Campus name + search icon + notifications bell
* Feed List: Card per Announcement (Club Badge, Title, short text, time)
* FAB (admin): Create
* Empty state: "No announcements yet — Be the first to post"

## 5.4 Announcement Detail

* Title
* Club + Verified badge
* Time
* Body (text) and 1 image (optional)
* CTA: "Register" (if event) or "Follow Club"

## 5.5 Clubs List

* Search bar
* Grid/List of Clubs (logo/avatar, name, short tagline, follow button)

## 5.6 Club Page

* Header with Club name + role badge
* About section
* Tabs: Announcements | Members | Chat
* Follow/Join button prominently placed

## 5.7 Club Chat

* Messages list (date separators) -> sender name, message text
* Input bar pinned to bottom with text field + send button
* Simple loading and retry UI for failed sends

## 5.8 Elections List

* Card per election -> Title, status (Open/Closed), countdown

## 5.9 Election Detail

* Election description
* Candidate cards (photo, name, manifesto snippet)
* Vote button (CTA) disabled if already voted

## 5.10 Vote Confirmation / Results

* Success modal (Vote received)
* Results: Simple bar/number list showing % & votes

## 5.11 Profile / Settings

* User details (read-only for MVP)
* Followed clubs list
* Role (if admin) with link to Admin Panel
* Sign out button

## 5.12 Admin Panel (Mobile)

* Simple forms: Create Announcement (title, body, club tag, image)
* Create Election (title, candidates, deadline)
* Role assignment (manual by email)

---

# 6. Component Library (Atomic)

* AppHeader (campus name + search + bell)
* AnnouncementCard
* ClubCard
* CandidateCard
* BottomTabs
* FAB
* PrimaryButton / SecondaryButton
* InputField / OTPInput
* Modal (confirmation)
* Toast (success/error)

---

# 7. UX Notes & Interaction Rules

* Use optimistic UI for chat messages (show locally then confirm)
* CTA must be large and clearly labelled (e.g., "Cast Vote")
* For critical actions (voting), show confirmation modal to prevent accidental taps
* Use haptics on iOS/Android for key actions (vote cast, announcement published)
* Reduce friction: keep login to single input (college email) and fallback OTP only if needed
* Show empty-state CTAs encouraging users to follow clubs or join elections

---

# 8. Accessibility & Localization

* Ensure text scales with system font-size
* All buttons must have accessible labels
* Color contrast ratio 4.5:1 for body text
* Provide simple localization keys (EN first; plan for local languages later)

---

# 9. Error States & Edge Cases

* No network: show cached announcements and a retry button
* Vote conflict (double submit): server rejects and UI shows "Vote not counted — Try again"
* Realtime disconnect: show "Reconnecting..." banner
* Unauthorized admin action: show clear error and contact admin flow

---

# 10. Handoff Checklist for Designers & Developers

* Export all icons as SVG + 2x PNG
* Provide color tokens (primary, secondary, bg, surface)
* Provide spacing/token guide
* Provide sample data seed (20 announcements, 5 clubs, 1 election)
* Provide API spec endpoints and example payloads (link to API_Spec.md when ready)

---

# 11. Appendix: Quick Navigation Map (linear)

Splash -> Login -> Home -> (Clubs / Elections / Profile)
From Home -> Announcement -> Club -> Chat
From Elections -> Election Detail -> Vote -> Results

---

*End of Screen_Flow.md*
