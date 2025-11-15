# Data_Privacy_and_Security.md — Yuhu Data Privacy & Security Document

Version: 1.0
Status: For Campus Approval & Compliance
Organization: Yuhu (Codexp)

---

# 1. Introduction

This document explains how **Yuhu** handles security, data protection, privacy compliance, and safeguarding of student and campus information.

Yuhu is designed to be:

* **Safe** for students
* **Transparent** for administrators
* **Compliant** with institutional expectations
* **Open-source**, offering complete visibility into the platform’s codebase

---

# 2. Data Principles

Yuhu follows strict data governance principles:

### **2.1 Minimal Data Collection**

Yuhu only collects the essential information needed for campus functionality:

* Name
* College email or ID
* Department & year
* Club membership data
* Votes (hashed, anonymized)

No unnecessary personal data is collected.

### **2.2 Student Ownership**

Students always retain full ownership of their personal data.

### **2.3 Transparency**

All roles, permissions, and communication sources are clearly displayed.
Users can always see which account posted or verified information.

### **2.4 Encryption by Default**

All sensitive communication is protected using:

* Transport encryption (HTTPS/TLS)
* End-to-end encryption (for community chats)

---

# 3. Types of Data Stored

| Data Type         | Stored?  | Storage Type  | Notes                 |
| ----------------- | -------- | ------------- | --------------------- |
| Name              | Yes      | Auth DB       | Needed for identity   |
| College Email     | Yes      | Auth DB       | Used for verification |
| Phone Number      | Optional | Auth DB       | Only if OTP used      |
| Department / Year | Yes      | DB            | For targeting & clubs |
| Club Membership   | Yes      | DB            | Access control        |
| Announcements     | Yes      | DB            | Public information    |
| Chat Messages     | Yes      | Encrypted DB  | Protected by E2E      |
| Votes             | Yes      | Hashed        | No personal link      |
| Media Uploads     | Yes      | Cloud Storage | Images only           |

Yuhu **does NOT** store:

* Plain-text passwords
* Financial details
* Location data
* Device metadata (only anonymous analytics)

---

# 4. Communication Security

## 4.1 Announcements

* Stored securely in managed databases (Supabase/Firebase)
* Only authorized roles can publish
* Clearly labeled with "Verified" badge

## 4.2 Community & Club Chat

Club and committee conversations use:

* **End-to-End Encryption (E2EE)** for message data
* **Role-based message permissions**

Messages are encrypted and cannot be accessed by:

* Other students
* Unauthorized staff
* Even Yuhu developers

## 4.3 Elections (Critical Security Zone)

Voting is handled with maximum integrity:

* Votes are stored **hashed & anonymized**
* No mapping is stored from student → vote
* Double voting is prevented using:

  * Device check
  * User ID check
  * Server-side verification
* Election results are tamper-proof

Auditable logs are available to campus authorities.

---

# 5. Access Control & Permissions

Yuhu uses a **Role-Based Access Control (RBAC)** system.

## Roles

* **Campus President** — full announcement & election creation permissions
* **Club Presidents** — club announcements & member management
* **Committee** — club-level communication
* **Students** — read-only & interaction-based permissions

All actions require explicit verification.

---

# 6. Infrastructure Security

Depending on campus setup, Yuhu uses **Supabase** or **Firebase**, both of which provide:

### ✓ Managed authentication

### ✓ Built-in encryption at rest

### ✓ HTTPS enforced APIs

### ✓ Database Rules / Row Level Security (RLS)

### ✓ Audit logging

### ✓ DDoS protection

Additionally:

* JWT tokens are used for secure session management
* Passwords are never stored (OAuth or OTP-based)

---

# 7. Data Sharing Policy

Yuhu follows a strict "No Third-Party Sharing" policy.

We **never** share data with:

* Advertisers
* Data brokers
* External vendors
* Unauthorized individuals

Data is only accessible to:

* Verified campus admins (limited view)
* The student themselves
* Yuhu backend systems (automated processes)

Open-source transparency ensures no hidden data flow.

---

# 8. Data Retention

* Messages and announcements are stored until removed by admins
* Votes are automatically anonymized and stored only for audit
* User accounts can be deleted upon request (full wipe)

---

# 9. Student Safety

Yuhu includes built-in safety measures:

* Harassment/fraud reporting tools
* Role-level moderation
* Removal of abusive users by campus admins
* No direct messaging between strangers (chat is controlled)

---

# 10. Compliance

Yuhu aligns with:

* Indian IT Act guidelines
* Basic GDPR principles (consent, right to delete, transparency)
* Industry-standard encryption practices
* Campus-level privacy policies

---

# 11. Open-Source Transparency

Yuhu is fully open-source under the **Codexp** organization.

Anyone—including campus authorities—may review:

* Code implementation
* Security mechanisms
* Permission logic
* Database rules

This ensures full accountability.

---

# 12. Risk Management

| Risk                     | Mitigation                             |
| ------------------------ | -------------------------------------- |
| Unauthorized role access | Strict RBAC + verification             |
| Data breach              | DB encryption + HTTPS + token rules    |
| Election tampering       | Hashed votes + logs + integrity checks |
| Server downtime          | Auto-retries + scalable backend        |
| Miscommunication         | Verified badge for official content    |

---

# 13. Summary

Yuhu is designed with a **security-first approach**, ensuring that:

* Student data is protected
* Communication is authentic
* Elections are transparent
* Chats are encrypted
* Admin access is controlled
* No third-party has access to campus information

Yuhu commits to building a safe, modern, and transparent platform for every student and campus partner.

---

*End of Data_Privacy_and_Security.md*
