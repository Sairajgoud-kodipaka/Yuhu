# Architecture.md — Yuhu System Architecture

Version: 1.0
Status: Developer Documentation
Organization: Yuhu (Codexp)

---

# 1. Overview

This document describes the complete system architecture for **Yuhu**, covering the mobile app, backend services, data flow, real-time communication, authentication, security layers, and deployment structure.

The architecture is designed for:

* **Long-term scalability**
* **Low-cost launch (free-tier friendly)**
* **Fast development (MVP in 48 hours)**
* **Future extensibility**
* **Open-source contribution**

---

# 2. High-Level Architecture Diagram (Text Form)

```
         ┌────────────────────────────┐
         │     React Native App       │
         │       (Expo Managed)       │
         └──────────────┬─────────────┘
                        │
                API / Auth Calls
                        │
     ┌──────────────────┴──────────────────┐
     │                                     │
┌────────────┐                     ┌────────────────┐
│ Supabase    │                     │ Firebase (ALT) │
│ PostgreSQL  │<---- Realtime ---->│ Firestore DB   │
│ Auth        │                    │ Auth            │
│ Storage     │                    │ Storage         │
└────────────┘                     └────────────────┘
     │                                     │
     │                                     │
     └──────────────┬──────────────────────┘
                    │
           Notifications Service
       (Expo Push / OneSignal / FCM)
```

---

# 3. Frontend Architecture (React Native + Expo)

## 3.1 Project Structure

```
Yuhu-App/
 ├── app/
 │   ├── screens/
 │   ├── components/
 │   ├── hooks/
 │   ├── context/
 │   ├── navigation/
 │   └── services/
 ├── assets/
 ├── utils/
 ├── config/
 ├── package.json
 └── App.tsx
```

## 3.2 UI Framework

* React Native (Expo)
* Expo Router or React Navigation
* Zustand/Jotai for state management

## 3.3 Key Client Modules

* `useAuth()` — login, logout, session management
* `useAnnouncements()` — fetch & subscribe
* `useElections()` — list, vote, results
* `useClubs()` — follow, unfollow, details
* `useChat()` — realtime messaging
* `api.ts` — wrapper around Supabase/Firebase SDK

---

# 4. Backend Architecture

Yuhu supports **two backend configurations:**

* **Primary (Recommended): Supabase**
* **Alternate: Firebase**

Both are fully compatible with the MVP.

---

# 5. Supabase Architecture (Primary)

Supabase provides:

* PostgreSQL database
* Row-Level Security (RLS)
* Auth (email, OTP)
* Realtime (via replication)
* Storage buckets

## 5.1 Supabase Schema (High-level)

* `users`
* `clubs`
* `announcements`
* `elections`
* `candidates`
* `votes`
* `chat_messages`

(See DB_Schema.md for full schema)

## 5.2 Realtime

Supabase provides WebSocket-based realtime listeners for:

* Announcements
* Chat messages
* Election results (optional)

## 5.3 Row-Level Security (Critical)

* Protects per-user and per-role data access
* Ensures only club admins can post club announcements
* Protects votes from unauthorized access

---

# 6. Firebase Architecture (Alternate)

## 6.1 Firestore Collections

* /users
* /clubs
* /announcements
* /elections
* /votes
* /messages

## 6.2 Firebase Security Rules

Used for role gating & read/write permissions.

## 6.3 Cloud Functions (Optional for later)

Used for:

* Scheduled notifications
* Vote validation
* Advanced admin workflows

---

# 7. Authentication Architecture

## 7.1 Auth Methods

* **Primary:** Email login (college email)
* **Optional:** Phone login using OTP

## 7.2 Session Management

* Managed by Supabase/Firebase SDK
* JWT tokens stored securely

## 7.3 Role Assignment

Roles are stored in DB:

* student
* club_leader
* committee
* president
* admin

---

# 8. Announcement System Architecture

```
Admin → Create Announcement → Store in DB → Trigger Notification → Students Fetch Feed
```

## Features

* Campus-wide visibility (if president)
* Club-specific visibility (if club leader)
* Realtime updates
* CDN-backed images via storage bucket

---

# 9. Election System Architecture

### Data Flow

```
Student → View Election → Select Candidate → Hash Vote → Store Vote → Update Results
```

### Security Layers

* Votes stored hashed
* No mapping between vote and user
* One vote per user enforced via DB rules
* Results computed via DB aggregation

---

# 10. Club & Community Architecture

## 10.1 Club Pages

* Stored in `clubs` table
* Each club has:

  * name
  * description
  * leader
  * committee
  * followers

## 10.2 Chat System

```
RN App <— WebSocket —> Supabase Realtime / Firestore Streams
```

* Messages stored encrypted
* Delivered instantly to clients
* Club-level grouping

---

# 11. Notifications Architecture

## Providers Supported

* Expo Push Notifications (default)
* OneSignal (recommended for scale)
* Firebase Cloud Messaging (FCM)

## Trigger Points

* New announcement
* New election
* Voting reminders
* Result declarations

---

# 12. Deployment Architecture

## 12.1 App

* Expo build → Android .apk/.aab

## 12.2 Backend

* Supabase hosted (free tier initially)
* Firebase hosted (if used)

## 12.3 Web Admin Panel (Optional Future)

* Vercel / Netlify deployment
* GitHub integration

---

# 13. Logging & Monitoring

## Tools Used

* Supabase logs
* Firebase analytics
* Sentry (optional)

Tracked events:

* Sign-in
* Announcement viewed
* Vote cast
* Club joined

---

# 14. Future Architecture Additions

* Microservices for elections
* Server-side aggregation for analytics
* Redis caching
* Webhooks for campus systems
* Multi-campus isolation (sharded DB)
* AI summarization engine

---

# 15. Summary

The Yuhu architecture is designed to be:

* **Simple for MVP**
* **Secure for elections**
* **Realtime for communication**
* **Scalable for entire campuses**
* **Open-source friendly for contributions**

This architecture supports rapid development while maintaining a long-term scalable foundation.

---

*End of Architecture.md*
