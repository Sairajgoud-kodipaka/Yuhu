# API_Spec.md — Yuhu API Specification

Version: 1.0
Status: Developer Documentation
Organization: Yuhu (Codexp)

---

# 1. Overview

This document defines all API endpoints required for the Yuhu MVP. It covers authentication, announcements, clubs, elections, chat, and admin actions.

Yuhu uses **one backend provider** depending on deployment:

* **Primary:** Supabase (PostgreSQL + Realtime)
* **Alternate:** Firebase (Firestore + Functions)

APIs are designed in a **"service abstraction"** format so the frontend does not worry whether Supabase or Firebase is running underneath.

---

# 2. Base URL

### Supabase

```
https://<project-id>.supabase.co
```

### Firebase

```
https://firestore.googleapis.com/v1/projects/<project-id>/databases/(default)/documents/
```

Front-end consumes APIs via SDK calls (preferred) or custom REST where required.

---

# 3. Authentication API

Using Supabase Auth or Firebase Auth.

## 3.1 Login (Email OTP)

**POST** `/auth/v1/token?grant_type=email`

* email

Response:

```
{ "status": "otp_sent" }
```

## 3.2 Verify OTP

**POST** `/auth/v1/token?grant_type=magiclink`

* email
* token

Response:

```
{ "access_token": "...", "user": { ... } }
```

## 3.3 Get Current User

SDK: `supabase.auth.getUser()`

Response:

```
{ id, email, role, department, year }
```

---

# 4. User API

## 4.1 Update User Profile

**PATCH** `/rpc/update_user_profile`
Payload:

```
{
  "name": "...",
  "department": "CSE",
  "year": 2
}
```

## 4.2 Fetch User

**GET** `/rest/v1/users?id=eq.<user_id>`

---

# 5. Announcements API

Stored in `announcements` table / collection.

## 5.1 Create Announcement (Admin Only)

**POST** `/rest/v1/announcements`

```
{
  "title": "...",
  "description": "...",
  "club_id": 12,
  "created_by": "<admin_id>",
  "image_url": "optional"
}
```

## 5.2 Fetch All Announcements

**GET** `/rest/v1/announcements?order=created_at.desc`

## 5.3 Fetch Announcements by Club

**GET** `/rest/v1/announcements?club_id=eq.<id>`

## 5.4 Realtime Subscription

Supabase client:

```
supabase.channel('announcements')
  .on('postgres_changes', { event: '*', table: 'announcements' }, callback)
  .subscribe()
```

---

# 6. Clubs API

## 6.1 Fetch Clubs

**GET** `/rest/v1/clubs?order=name.asc`

## 6.2 Join / Follow Club

**POST** `/rest/v1/club_members`

```
{ "club_id": 5, "user_id": "..." }
```

## 6.3 Fetch Club Details

**GET** `/rest/v1/clubs?id=eq.<club_id>`

## 6.4 Fetch Club Members

**GET** `/rest/v1/club_members?club_id=eq.<club_id>`

---

# 7. Election API

## 7.1 Create Election (Admin)

**POST** `/rest/v1/elections`

```
{
  "title": "Department President Election",
  "description": "...",
  "department": "CSE",
  "end_time": "2025-11-15T18:00:00Z"
}
```

## 7.2 Add Candidate

**POST** `/rest/v1/candidates`

```
{
  "election_id": 1,
  "name": "John Doe",
  "manifesto": "...",
  "image_url": "optional"
}
```

## 7.3 Fetch Election List

**GET** `/rest/v1/elections?order=created_at.desc`

## 7.4 Fetch Candidates

**GET** `/rest/v1/candidates?election_id=eq.<id>`

## 7.5 Cast Vote

**POST** `/rest/v1/votes`

```
{
  "election_id": 1,
  "candidate_id": 9,
  "hashed_user": "hashed(<user_id>)"
}
```

Security:

* RLS checks prevent double voting.

## 7.6 Fetch Results

**GET** `/rpc/get_results?election_id=<id>`
Response:

```
[
  { "candidate_id": 9, "votes": 120 },
  { "candidate_id": 3, "votes": 85 }
]
```

---

# 8. Chat API

Chats use realtime subscriptions.

## 8.1 Send Message

**POST** `/rest/v1/chat_messages`

```
{
  "club_id": 5,
  "sender_id": "...",
  "content": "This is a message"
}
```

## 8.2 Fetch Messages

**GET** `/rest/v1/chat_messages?club_id=eq.<id>&order=created_at.asc`

## 8.3 Subscribe to Realtime Messages

```
supabase.channel('chat-club-5')
  .on('postgres_changes', { table: 'chat_messages', event: 'INSERT' }, callback)
  .subscribe()
```

---

# 9. Admin APIs

## 9.1 Assign Club Leader

**POST** `/rpc/assign_club_leader`

```
{
  "club_id": 4,
  "user_id": "abcd-1234"
}
```

## 9.2 Create Club

**POST** `/rest/v1/clubs`

```
{
  "name": "Coding Club",
  "description": "..."
}
```

## 9.3 Create Push Notification

Handled via:

* Expo Push `https://exp.host/--/api/v2/push/send`
  or
* OneSignal API

Payload example:

```
{
  "to": "ExponentPushToken[...]",
  "title": "New Announcement",
  "body": "Cultural fest registrations open!"
}
```

---

# 10. Error Codes

| Code | Meaning         | Reason                       |
| ---- | --------------- | ---------------------------- |
| 401  | Unauthorized    | Missing/invalid token        |
| 403  | Forbidden       | Role not allowed             |
| 409  | Conflict        | Duplicate vote or membership |
| 422  | Invalid Payload | Missing fields               |
| 500  | Server Error    | Unexpected backend failure   |

---

# 11. Future API Extensions

* Polling system
* Multi-club chat rooms
* Event registration analytics
* Creator publishing APIs
* Marketplace services

---

# 12. Summary

This API Spec defines the complete interface for the Yuhu MVP. It provides endpoints for announcements, elections, clubs, chat, profiles, and admin workflows in a clean and scalable manner.

SDK-based usage (Supabase/Firebase) is preferred for reliability and rapid development.

---

*End of API_Spec.md*
