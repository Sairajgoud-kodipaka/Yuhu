# YUHU - Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This SRS document specifies the functional and non-functional requirements for YUHU, a campus communication and club management platform.

### 1.2 Scope
YUHU provides verified communication, event management, and governance tools for university students, club coordinators, council heads, and administrators.

### 1.3 Definitions and Acronyms
- **E2EE:** End-to-End Encryption
- **RBAC:** Role-Based Access Control
- **RSVP:** Répondez s'il vous plaît (event response)
- **MVP:** Minimum Viable Product
- **SRS:** Software Requirements Specification

---

## 2. System Overview

### 2.1 System Context
YUHU operates as a mobile-first platform (iOS, Android, Web) connecting students, clubs, and administration within a university ecosystem.

### 2.2 User Classes
1. **Student:** Regular user, club member
2. **Club Coordinator:** Manages club, posts announcements, creates events
3. **Council Head:** Oversees domain clubs, approves events
4. **Admin:** Full system access, analytics, user management

---

## 3. Functional Requirements

### 3.1 User Authentication & Registration

**FR-1.1:** System shall allow users to register with college email or student ID  
**FR-1.2:** System shall verify email via OTP or verification link  
**FR-1.3:** System shall assign default role as "Student" upon registration  
**FR-1.4:** System shall support role elevation to Coordinator/Head/Admin via approval workflow  
**FR-1.5:** System shall support password reset via email  
**FR-1.6:** System shall support biometric login (fingerprint, face ID) on mobile  

### 3.2 Profile Management

**FR-2.1:** Users shall create profiles with name, course, year, interests  
**FR-2.2:** Users shall upload profile pictures  
**FR-2.3:** Users shall edit profile information  
**FR-2.4:** Users shall view other users' public profiles  
**FR-2.5:** Users shall set privacy preferences for profile visibility  

### 3.3 Clubs & Councils

**FR-3.1:** System shall display list of all clubs organized by domain councils  
**FR-3.2:** Students shall join or leave clubs  
**FR-3.3:** System shall show club details: description, members, coordinators, events  
**FR-3.4:** Coordinators shall manage club member lists  
**FR-3.5:** System shall recommend clubs based on user course and interests  
**FR-3.6:** Council Heads shall create new clubs under their domain  

### 3.4 Announcements

**FR-4.1:** Coordinators/Heads shall post announcements to club or council  
**FR-4.2:** Announcements shall require approval from Council Head or Admin  
**FR-4.3:** System shall display announcements in chronological feed  
**FR-4.4:** Students shall receive push notifications for verified announcements  
**FR-4.5:** System shall log all announcement actions (posted, approved, edited, deleted)  
**FR-4.6:** Users shall filter announcements by club, date, type  

### 3.5 Events Management

**FR-5.1:** Coordinators shall create events with title, description, date, venue, RSVP limit  
**FR-5.2:** Events shall undergo approval workflow: Coordinator → Council Head → Admin  
**FR-5.3:** Approved events shall appear in event feed  
**FR-5.4:** Students shall RSVP to events  
**FR-5.5:** System shall sync events to device calendar (Google, Apple)  
**FR-5.6:** Coordinators shall take attendance via QR code or manual check-in  
**FR-5.7:** Coordinators shall upload event photos to event gallery  
**FR-5.8:** System shall send event reminders 24 hours and 1 hour before event  

### 3.6 Messaging & Chat

**FR-6.1:** Users shall send direct messages to other users  
**FR-6.2:** Coordinators shall create group chats for club members  
**FR-6.3:** Messages shall be encrypted end-to-end  
**FR-6.4:** Users shall receive real-time push notifications for new messages  
**FR-6.5:** Users shall search message history  
**FR-6.6:** Users shall share media (images, videos, documents) in chats  
**FR-6.7:** Users shall mute or leave group chats  

### 3.7 Dashboard

**FR-7.1:** Students shall view personalized dashboard with joined clubs, upcoming events, notifications  
**FR-7.2:** Dashboard shall display quick actions: RSVP, message coordinator, view club  
**FR-7.3:** Dashboard shall show event calendar view  
**FR-7.4:** Dashboard shall highlight urgent announcements  

### 3.8 Admin Dashboard

**FR-8.1:** Admins shall view engagement analytics: active users, club activity, event attendance  
**FR-8.2:** Admins shall view audit logs of all actions (posts, approvals, deletions)  
**FR-8.3:** Admins shall verify and elevate user roles  
**FR-8.4:** Admins shall suspend or ban users  
**FR-8.5:** Admins shall export reports (CSV, PDF) for regulatory submissions  
**FR-8.6:** Admins shall view real-time system health and notifications  

### 3.9 Notifications

**FR-9.1:** System shall send push notifications for announcements, events, messages, approvals  
**FR-9.2:** Users shall customize notification preferences (all, important only, mute)  
**FR-9.3:** Notifications shall include deep links to relevant screens  
**FR-9.4:** System shall show in-app notification badge counts  

### 3.10 Search & Discovery

**FR-10.1:** Users shall search for clubs, events, users  
**FR-10.2:** Search results shall be filterable by type, date, domain  
**FR-10.3:** System shall provide autocomplete suggestions  

---

## 4. Non-Functional Requirements

### 4.1 Performance

**NFR-1.1:** App shall load main screen in < 2 seconds on 4G connection  
**NFR-1.2:** Real-time messages shall be delivered in < 1 second  
**NFR-1.3:** System shall support 4000 concurrent users  
**NFR-1.4:** API response time shall be < 500ms for 95% of requests  

### 4.2 Security

**NFR-2.1:** All user passwords shall be hashed using bcrypt with salt  
**NFR-2.2:** All chat messages shall be end-to-end encrypted using RSA + AES-GCM  
**NFR-2.3:** System shall implement RBAC for all operations  
**NFR-2.4:** Sensitive data shall be stored in Expo SecureStore  
**NFR-2.5:** API endpoints shall require authentication tokens (JWT)  
**NFR-2.6:** System shall log all security-critical actions  
**NFR-2.7:** System shall comply with GDPR and data privacy regulations  

### 4.3 Reliability

**NFR-3.1:** System shall have 99.5% uptime  
**NFR-3.2:** System shall implement automatic failover for database  
**NFR-3.3:** System shall backup data daily  
**NFR-3.4:** System shall recover from failures within 5 minutes  

### 4.4 Scalability

**NFR-4.1:** Database schema shall support horizontal scaling  
**NFR-4.2:** System shall handle 10,000+ users without performance degradation  
**NFR-4.3:** System architecture shall support microservices for future features  

### 4.5 Usability

**NFR-5.1:** App UI shall follow Material Design (Android) and Human Interface Guidelines (iOS)  
**NFR-5.2:** App shall support dark mode  
**NFR-5.3:** App shall be accessible (WCAG 2.1 AA compliance)  
**NFR-5.4:** Onboarding shall require < 5 steps  
**NFR-5.5:** Key actions (RSVP, message) shall be achievable in < 3 taps  

### 4.6 Compatibility

**NFR-6.1:** iOS app shall support iOS 13 and above  
**NFR-6.2:** Android app shall support Android 8 (API 26) and above  
**NFR-6.3:** Web app shall support latest 2 versions of Chrome, Safari, Firefox  
**NFR-6.4:** App shall work on screen sizes from 4.7" to 13"  

### 4.7 Maintainability

**NFR-7.1:** Code shall follow Airbnb JavaScript/React style guide  
**NFR-7.2:** Code coverage shall be > 70%  
**NFR-7.3:** All APIs shall be documented using OpenAPI/Swagger  
**NFR-7.4:** System shall use semantic versioning  

---

## 5. External Interface Requirements

### 5.1 User Interfaces
- Mobile apps: iOS, Android (React Native)
- Web app: Responsive design for desktop and mobile browsers
- Dark mode support

### 5.2 Hardware Interfaces
- Device camera (for profile pictures, event photos)
- Device storage (for offline data caching)
- Biometric sensors (fingerprint, Face ID)

### 5.3 Software Interfaces
- Supabase PostgreSQL (database)
- Supabase Auth (authentication)
- Supabase Realtime (chat)
- Expo Push Notifications
- Google Calendar API / Apple Calendar API
- Firebase Cloud Messaging (Android push)
- Apple Push Notification Service (iOS push)

### 5.4 Communication Interfaces
- HTTPS for all API calls
- WebSocket for real-time chat
- REST API for CRUD operations

---

## 6. System Features Priority

### Must Have (MVP)
- User authentication and role management
- Clubs and councils structure
- Announcements with approval workflow
- Event creation and RSVP
- Basic dashboard
- Push notifications

### Should Have (Phase 2)
- End-to-end encrypted chat
- Event attendance tracking
- Admin analytics dashboard
- Web app

### Could Have (Phase 3)
- Voting and elections
- Gamification (badges, points)
- Multi-language support
- Advanced search and filters

### Won't Have (Future)
- Video calling
- E-commerce (merchandise sales)
- Alumni network

---

## 7. Data Requirements

### 7.1 Database Entities

**Users:** id, email, name, course, year, role, profile_pic, created_at, updated_at  
**Clubs:** id, name, description, domain_id, coordinator_ids, member_ids, created_at  
**Councils:** id, name, head_id, club_ids  
**Announcements:** id, club_id, author_id, content, status, approved_by, created_at  
**Events:** id, club_id, title, description, date, venue, rsvp_limit, attendees, status, created_at  
**Messages:** id, sender_id, recipient_id, chat_id, content_encrypted, iv, auth_tag, created_at  
**Chats:** id, type (dm/group), participant_ids, created_at  

### 7.2 Data Retention
- User data: Retained until account deletion + 30 days
- Messages: Retained for 1 year
- Audit logs: Retained for 3 years
- Analytics: Aggregated and anonymized after 6 months

---

## 8. Approval

**Prepared By:** Raj, Sairaj  
**Reviewed By:** [To be filled]  
**Approved By:** [To be filled]  
**Date:** [To be filled]

---

**End of SRS**
