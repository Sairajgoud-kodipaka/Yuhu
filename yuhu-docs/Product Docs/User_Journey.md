# User_Journey.md — Yuhu User Journey Map

Version: 1.0
Status: MVP

---

# 1. Purpose

This document outlines the complete user journey for Yuhu, covering first-time experience, engagement loops, admin workflows, and election flows. It ensures clarity for UI/UX, development, and marketing teams.

---

# 2. User Personas

## 2.1 Student (Primary User)

* Wants official, clear updates
* Wants to know about events, elections, clubs
* Uses mobile daily, quick interactions

## 2.2 Club Leader / Committee

* Wants structured communication
* Announces events
* Manages club members

## 2.3 Campus President / Admin

* Posts official verified announcements
* Creates elections
* Monitors results
* Manages club leaders

---

# 3. High-Level Journey Overview

**Discover → Install → Signup → Explore → Follow Clubs → Receive Updates → Vote → Engage in Communities**

Admin flow:
**Login → Admin Panel → Post Announcement → Publish Election → Review Results**

---

# 4. Detailed User Journey Stages

## 4.1 Stage 1: Awareness

**Trigger points:**

* Campus elections promoted via posters, reels
* Club members telling students “Vote on Yuhu”
* Social media promos
* Peer recommendations

**User Action:** Downloads Yuhu from Play Store/Test build.

---

## 4.2 Stage 2: First App Open

**Screens encountered:**

* Splash Screen
* Onboarding Slides

**Emotional Goal:** “This looks official and trustworthy.”

**Design cues:** Verified badge, campus name, clean UI.

---

## 4.3 Stage 3: Signup & Identity Verification

**Flow:**
Onboarding → Login with College Email → Success → Home Feed

**Outcome:** User becomes a verified student.

**Key UX Needs:**

* Zero friction
* One-field login (email)
* Clear success feedback

---

## 4.4 Stage 4: Home Feed Exploration

**User sees:**

* Latest announcements
* Event cards
* Notices from official clubs

**Actions:**

* Taps announcement → views details
* Follows clubs
* Enables notifications

**Purpose:** Immediate value from day one.

---

## 4.5 Stage 5: Club Discovery & Engagement

**Flow:**
Home → Clubs Tab → Club Page → Follow / Join → Club Chat

**Motivations:**

* Find relevant communities
* Participate in events
* Connect with peers

**Outcomes:**

* User feels part of campus culture
* Regular engagement increases

---

## 4.6 Stage 6: Voting Journey (Hero Flow)

**Flow:**
Home / Elections Tab → Election Detail → Candidate List → Vote → Confirmation

### Steps:

1. Student taps "Elections"
2. Views active election
3. Reads manifesto snippets
4. Selects candidate
5. Confirms vote
6. Success screen (with haptic feedback)
7. Redirect to results page after voting closes

**User Feeling:** “My vote is counted and secure.”

---

## 4.7 Stage 7: Post-Vote Engagement

**After voting:**

* Receives push notifications
* Watches results update in real-time

**Retention trigger:** Students reopen app daily to track results.

---

## 4.8 Stage 8: Long-Term Engagement

**Features keeping users active:**

* Daily announcements
* Club updates
* Event reminders
* Realtime chat
* Saturday 20-min learning sessions
* Yuhu Creator notes & roadmaps

**Loop:**
Notifications → Open App → Engage → Return

---

# 5. Admin Journey

## 5.1 Admin Onboarding

* Assigned admin role in DB (pre-launch)
* Logs in and sees Admin FAB

## 5.2 Admin Actions

**Core actions:**

* Create announcement
* Publish event update
* Create election
* Add candidates
* Declare results (auto/live)

**Flow:**
FAB → Create → Preview → Publish → Notify users

---

# 6. Emotional Journey Map (Student)

| Stage      | Emotion         | Risk                   | Mitigation                      |
| ---------- | --------------- | ---------------------- | ------------------------------- |
| Discover   | Curious         | Trust issue            | Show verified campus + clean UI |
| Signup     | Neutral         | Friction               | One-field login                 |
| First Feed | Impressed       | Confusion              | "Verified" badges, clear layout |
| Clubs      | Excited         | Overload               | Smart suggestions               |
| Voting     | Confident       | Fear of incorrect vote | Confirmation popup              |
| Results    | High engagement | Server failure         | Stress test + caching           |

---

# 7. Engagement Loops

## Loop 1: Announcement → Notification → Open App → Feed → Repeat

## Loop 2: Elections → Vote → Results → Share → Social Boost

## Loop 3: Clubs → Chat → Events → Community Growth

## Loop 4: Creators → Notes → Likes → Weekly sessions

These loops ensure retention beyond elections.

---

# 8. Blocking Points & Solutions

| Problem                | Solution                           |
| ---------------------- | ---------------------------------- |
| Students won’t install | Election-first strategy            |
| Information overload   | Personalized feeds                 |
| Low chat engagement    | Only committees first (controlled) |
| Admin misuse           | Role-based permissions             |

---

# 9. Completion Definition

A user has fully engaged when:

* They follow 3+ clubs
* Participate in at least 1 election
* Read 5 announcements
* Enable notifications
* Join 1 community chat

---

# 10. Future Journey Enhancements

* Creator onboarding
* Gamification loop (badges, levels)
* Personalized newsletter
* Marketplace
* Internship & opportunity feed

---

*End of User_Journey.md*
