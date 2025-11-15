# Yuhu — MVP Scope Document
Version: 1.0  
Status: Approved  
Timeline: 48 Hours

This document defines the exact features, flows, and technical scope needed to ship the **Yuhu MVP** fast while ensuring long-term scalability.

---

# 1. MVP Objective

Deliver a **functional, stable, campus-ready** version of Yuhu focused on:
- Elections
- Official announcements
- Club/community channels
- Verification system
- Push notifications
- User onboarding
- Basic admin panel

The MVP must be **production usable** for:
- Launching BS (First Department) campus elections  
- Announcing results  
- Onboarding first clubs  
- Publishing initial events  

---

# 2. MVP Deliverables (High-Level)

### ✔️ Mobile App (React Native + Expo)
### ✔️ Backend (Supabase/Firebase)
### ✔️ Authentication (Email / Phone)
### ✔️ Voting System (Simple, Secure)
### ✔️ Announcement Feed
### ✔️ Club Channels (Basic Chat)
### ✔️ Push Notifications
### ✔️ Admin Panel (Minimal)
### ✔️ Basic Analytics (Page views, signups)
### ✔️ GitHub Open Source Repo Setup

---

# 3. MVP Features (Detailed and Final)

---

## 3.1 Authentication (Critical)
**Included**
- Email login (college email preferred)
- Phone login (OTP optional if time permits)
- User role: Student (default)
- Admin role: Campus President (manual assign in DB)
- Club roles: Club Leader, Committee (assign in DB)

**Not Included**
- Social logins (Google, GitHub) – optional later
- Multi-device sync (basic only)

---

## 3.2 Home Feed — Official Announcements
**Included**
- Announcements list (title + description)
- Tag: Club / Department
- “Official Verified” badge
- Timestamp
- Push notification on publish

**Admin Features Included**
- Create announcement
- Attach one image

**Not Included**
- Comments
- Likes/Reactions
- Rich text formatting
- Pin posts

---

## 3.3 Campus Election Module (Hero Feature)
**Included**
- Election list page
- Candidate list
- Cast vote (1 device = 1 vote logic)
- Confirmation screen
- Display results in % and numbers

**Security**
- Use Supabase Row Level Security / Firebase Rules
- Store votes hashed (no plain ID mapping)
- Prevent double voting

**Not Included**
- Multi-phase elections
- Scrutineer dashboard
- Notifications for each vote

---

## 3.4 Club Pages
**Included**
- Club list page
- Club description
- Follow/Unfollow option
- View club announcements only

**Not Included**
- Club-level analytics
- Full community chat
- Moderation panel

---

## 3.5 Community Chat (Basic Version)
**Included**
- Only for Club Leaders & Committee initially
- One channel per club
- Simple text chat
- Realtime (Supabase Realtime / Firestore stream)
- Auto-scroll to latest message

**Not Included**
- Threads
- Emojis
- Media sharing
- File upload
- Read receipts

---

## 3.6 User Profile (Simple)
**Included**
- Name
- Department
- Year
- Followed clubs

**Not Included**
- Profile photo upload
- Bio
- Achievements, badges
- Creator features

---

## 3.7 Push Notifications
**Included**
- Announcement push
- Election push

**Not Included**
- Segmented notifications  
- Scheduled notifications

---

## 3.8 Admin Panel (Bare Minimum)
**Included (Web or Mobile Admin Mode)**
- Create announcement  
- Create election  
- Add candidate  
- View votes count  
- Add/assign club leaders manually  

**Not Included**
- Full web dashboard  
- Bulk uploads  
- Analytics  

---

# 4. Technical Scope

---

## 4.1 Frontend (React Native + Expo)
**Included**
- Expo project setup  
- Navigation setup  
- Screens:  
  - Login  
  - Home Feed  
  - Club List  
  - Club Page  
  - Election List  
  - Vote Page  
  - Results Page  
  - Profile  
  - Settings  
- API integration  
- State management (Zustand/Jotai/light Redux)  

**Not Included**
- Deep linking  
- OTA updates  
- Advanced animations  

---

## 4.2 Backend (Supabase/Firebase)
Choose 1 for MVP:
- Supabase (Postgres + Realtime)
- Firebase (Firestore + Cloud Functions)

**Included**
- Auth  
- Realtime DB  
- Row-level security  
- Collections/Tables:  
  - users  
  - clubs  
  - announcements  
  - elections  
  - candidates  
  - votes  
  - chat_messages  

**Not Included**
- Analytics events  
- Detailed logging  

---

# 5. Execution Timeline (48 Hour Plan)

---

## Day 1 — Build & Infra
**8 hours total**

### Backend (3 hours)
✔ Setup Supabase/Firebase  
✔ Create schema  
✔ Add seed data  
✔ Security rules  

### Frontend (5 hours)
✔ Login  
✔ Navigation  
✔ Home feed  
✔ Club pages basics  

---

## Day 2 — Elections, Chat & Admin
**8 hours total**

### Elections (3 hours)
✔ Candidate list  
✔ Voting  
✔ Results  

### Community Chat Basic (2 hours)
✔ 1 channel per club  
✔ Realtime messages  

### Admin Features (2 hours)
✔ Create announcement  
✔ Create election  

### Testing + Polish (1 hour)
✔ Fix flows  
✔ Final deployment  

---

# 6. Out of Scope (Important)

❌ Full creator system  
❌ Weekly learning sessions  
❌ Newsletter system  
❌ Voice channels  
❌ Large community servers  
❌ Achievements & gamification  
❌ AI summaries  
❌ Marketplace  

These will come Post-MVP.

---

# 7. Success Criteria for MVP

### Technical Success
- App builds with no crashes  
- Realtime updates functional  
- All votes counted correctly  
- Notifications working  

### Functional Success
- At least 70% of BS Department installs app  
- At least 200+ election votes  
- First 5 clubs onboarded  
- First 10 announcements made  

---

# 8. Approval
- Owner: Codexp / Yuhu  
- Founders: Abhinav & Sairaj  
- Status: Approved for execution  
