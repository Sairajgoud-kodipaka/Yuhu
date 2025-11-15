# DB_Schema.md — Yuhu Database Schema

Version: 1.0
Status: Developer Documentation
Organization: Yuhu (Codexp)

---

# 1. Overview

This document specifies the PostgreSQL schema (Supabase-ready) designed for Yuhu MVP. It includes tables, fields, primary/foreign keys, indexes, example SQL `CREATE TABLE` statements, and Row-Level Security (RLS) policy notes for core tables (announcements, votes, chat_messages).

The schema focuses on security (RLS), scalability (indexes), and auditability (timestamps and soft deletes).

---

# 2. Naming Conventions

* Tables: singular (e.g., `user`, `club`, `announcement`)
* PK: `id` (UUID)
* FKs: `<table>_id` (UUID)
* Timestamps: `created_at`, `updated_at`
* Soft delete: `deleted_at` (nullable timestamp)

---

# 3. Core Tables & Definitions

## 3.1 users

Stores authenticated user profiles.

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  department text,
  year integer,
  role text DEFAULT 'student', -- student, club_leader, committee, president, admin
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);
```

Indexes:

* `CREATE INDEX idx_users_email ON users(email);`

RLS: allow users to read their own profile; admins can read all.

---

## 3.2 clubs

Club metadata.

```sql
CREATE TABLE clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_tag text, -- e.g., CSEA
  description text,
  leader_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);
```

Indexes:

* `CREATE INDEX idx_clubs_name ON clubs(name);`

---

## 3.3 club_members

Membership and roles inside clubs.

```sql
CREATE TABLE club_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text DEFAULT 'member', -- member, committee, leader
  joined_at timestamptz DEFAULT now(),
  removed_at timestamptz
);
```

Indexes:

* `CREATE INDEX idx_club_members_club ON club_members(club_id);`
* Unique constraint: `(club_id, user_id)` to prevent duplicate membership.

RLS: members can view club member list; non-members cannot (if desired).

---

## 3.4 announcements

Official announcements (campus-wide or club-specific).

```sql
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  club_id uuid REFERENCES clubs(id), -- NULL => campus-wide
  created_by uuid REFERENCES users(id),
  is_verified boolean DEFAULT false,
  pinned boolean DEFAULT false,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);
```

Indexes:

* `CREATE INDEX idx_announcements_club_created_at ON announcements(club_id, created_at DESC);`
* `CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);`

RLS (recommended):

* INSERT: only users with roles `club_leader`, `president`, or `admin` or club committee (validated via club_members) can insert for a given club.
* UPDATE/DELETE: only the creator or admins.
* SELECT: public read for campus members; limit if club-private.

---

## 3.5 elections

Elections metadata.

```sql
CREATE TABLE elections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  department text, -- target audience
  created_by uuid REFERENCES users(id),
  start_time timestamptz,
  end_time timestamptz,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);
```

Indexes:

* `CREATE INDEX idx_elections_end_time ON elections(end_time);`

---

## 3.6 candidates

Candidates contesting in elections.

```sql
CREATE TABLE candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id uuid REFERENCES elections(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id), -- optional if internal student
  name text NOT NULL,
  manifesto text,
  image_url text,
  created_at timestamptz DEFAULT now()
);
```

Indexes:

* `CREATE INDEX idx_candidates_election ON candidates(election_id);`

---

## 3.7 votes

Stores votes in a way that preserves anonymity but enables audits.

```sql
CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id uuid REFERENCES elections(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES candidates(id),
  hashed_voter text NOT NULL, -- e.g., hash(user_id || salt)
  created_at timestamptz DEFAULT now()
);
```

Constraints & Indexes:

* `CREATE UNIQUE INDEX ux_votes_election_hashedvoter ON votes(election_id, hashed_voter);` -- prevents double voting
* `CREATE INDEX idx_votes_candidate ON votes(candidate_id);`

RLS & Security:

* Only allow INSERT via server-side function that validates eligibility and writes hashed_voter; disallow reading of `hashed_voter` except by admins/audit roles.
* For counting, use aggregate queries `COUNT(*) WHERE candidate_id = X`.

---

## 3.8 chat_messages

Realtime messages for club chats (encrypted payloads recommended).

```sql
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id),
  body text, -- encrypted/text
  is_encrypted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

Indexes:

* `CREATE INDEX idx_chat_club_created_at ON chat_messages(club_id, created_at DESC);`

RLS:

* INSERT: only members of club
* SELECT: only members of club

Encryption note:

* For true E2E, store ciphertext in `body` and keep decryption keys client-side or via user-managed keys. For MVP, server-side encryption with strict access and delete policies is acceptable.

---

## 3.9 notifications

Push token registry and notification history.

```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  push_token text,
  provider text,
  last_seen_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

Index:

* `CREATE INDEX idx_notifications_user ON notifications(user_id);`

---

## 3.10 media / storage

Metadata for uploaded media.

```sql
CREATE TABLE media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  uploaded_by uuid REFERENCES users(id),
  size_bytes bigint,
  content_type text,
  created_at timestamptz DEFAULT now()
);
```

---

# 4. Example Queries

* Fetch latest campus announcements:

```sql
SELECT * FROM announcements WHERE club_id IS NULL AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 20;
```

* Fetch club announcements:

```sql
SELECT * FROM announcements WHERE club_id = 'club-uuid' AND deleted_at IS NULL ORDER BY created_at DESC;
```

* Count votes per candidate:

```sql
SELECT candidate_id, COUNT(*) AS votes FROM votes WHERE election_id = 'election-uuid' GROUP BY candidate_id ORDER BY votes DESC;
```

---

# 5. Row Level Security (RLS) — Notes & Example Policies

RLS should be enabled for critical tables and enforced via policies using Supabase.

### 5.1 announcements

* `INSERT`: allow if `auth.role IN ('admin','president') OR (auth.role = 'club_leader' AND user is leader of the club)`
* `SELECT`: allow all authenticated users for public announcements; for private clubs limit to members
* `UPDATE/DELETE`: allow creator or admin

### 5.2 votes

* `INSERT`: only via server-side RPC `cast_vote(election_id, candidate_id)` which checks:

  * election is active
  * user has not already voted (check hashed voter)
  * user is eligible (department check)
* `SELECT`: deny access to `hashed_voter` for non-admins

### 5.3 chat_messages

* `INSERT/SELECT`: only members of the club (check `club_members`)

---

# 6. Migration & Seed Data

* Provide seed SQL for initial campus: 5 clubs, 20 announcements, 1 election with 3 candidates, 100 dummy users.
* Use migrations with `sqitch`/`flyway` or Supabase migrations.

---

# 7. Backups & Retention

* Daily DB backups (automated by Supabase)
* Retain backups for 30 days initially
* Provide admin endpoints to export election logs for audit (CSV)

---

# 8. Scaling & Performance Notes

* Partition large tables (chat_messages, votes) if growth > millions rows
* Use indexes on `created_at` and FK fields
* Consider read replicas for analytics queries
* Purge old chat messages or archive to cheaper storage if needed

---

# 9. Privacy Considerations

* Store minimal PII
* Hash votes
* Allow account deletion flow (GDPR-style)
* Only admins can access sensitive logs with audit trail

---

# 10. Summary

This DB schema is optimized for the Yuhu MVP and future growth. It enforces role-based access, protects election integrity, supports realtime chats, and keeps data minimal and auditable.

Use this as the canonical schema for initial development and adjust as real usage patterns emerge.

---

*End of DB_Schema.md*
