# Contribution_Guide.md — Yuhu Open Source Contribution Guide

Version: 1.0
Status: Public Developer Document
Organization: Yuhu (Codexp)

---

# 1. Introduction

Welcome to the **Yuhu Open Source Repository** under the **Codexp** organization.
We are excited to have contributors from campuses, clubs, and the global developer community.

This guide explains how to contribute to Yuhu, follow the coding standards, raise PRs, report issues, and join the development workflow.

---

# 2. Code of Conduct

All contributors must follow:

* Respectful communication
* No harassment or toxicity
* Constructive feedback
* Zero tolerance for plagiarism
* Follow GitHub community guidelines

Violations may result in removal from contributions.

---

# 3. How to Contribute

Contributions are accepted for:

* Bug fixes
* UI improvements
* New features (approved first)
* Documentation updates
* Testing & QA
* Performance improvements

**Do NOT build large features without discussion with maintainers.**

---

# 4. Tech Stack

### Mobile App

* React Native (Expo)
* TypeScript
* Zustand/Jotai for state
* Supabase/Firebase for backend

### Backend

* Supabase (Postgres + Auth + Storage)
* Firebase (alternative)

### Tools

* GitHub Projects
* GitHub Issues
* Prettier / ESLint
* Husky (optional)

---

# 5. Repository Structure

```
/yuhu-app
  /app
    /screens
    /components
    /navigation
    /context
    /services
  /assets
  /utils
  README.md
  CONTRIBUTING.md
```

---

# 6. Branching Strategy

We follow a simple and clean branching model:

### **Main Branches**

* `main` → stable production builds
* `dev` → active development

### **Feature Branches**

```
feature/<feature-name>
bugfix/<bug-name>
docs/<doc-name>
```

Examples:

* `feature/election-results-ui`
* `bugfix/chat-scroll-top`
* `docs/update-readme`

---

# 7. Workflow

## Step 1: Fork the Repo

```
- Fork repository → Clone → Add upstream
```

## Step 2: Create Branch

```
git checkout -b feature/my-feature
```

## Step 3: Write Clean, Documented Code

* Follow existing file structure
* Use TypeScript
* Use Expo APIs when possible

## Step 4: Run Lint & Prettier

```
npm run lint
npm run format
```

## Step 5: Commit Convention

We use **Conventional Commits**:

```
feat: added club follow logic
fix: updated election vote bug
docs: improved API README
style: formatted home feed
refactor: optimized chat state
```

## Step 6: Push Branch

```
git push origin feature/my-feature
```

## Step 7: Open Pull Request (PR)

Include:

* What you changed
* Why
* Screenshots (if UI)
* Testing steps

Maintainers (Abhinav, Sairaj) will review.

---

# 8. Pull Request (PR) Guidelines

PRs must:

* Be small & focused
* Pass linting
* Include before/after screenshots for UI
* Have descriptive titles
* Link to relevant issues

Avoid:

* Huge PRs with multiple changes
* Unnecessary redesigns
* Breaking existing functionality

---

# 9. Issue Reporting

Use GitHub Issues template.

Include:

* Issue title
* Steps to reproduce
* Expected behavior
* Screenshots
* Device information

Tag issues appropriately:

* `bug`
* `feature-request`
* `documentation`
* `ui-ux`
* `good-first-issue`

---

# 10. Coding Standards

### TypeScript

* Strict typing
* No `any` without explanation

### UI Components

* Use consistent spacing, colors
* Follow design tokens (ThemeContext)

### State Management

* Keep global state minimal
* Use hooks for business logic

### Networking

* All API calls in `/services` folder
* No direct DB calls inside UI components

---

# 11. Testing

(Testing is optional for MVP, but contributors should follow basics.)

### Manual Checklist

* App starts without crashes
* Navigation flows correct
* Voting works (no double votes)
* Announcements load
* Clubs follow/unfollow
* Chats sync properly

---

# 12. Security Rules

Contributors must follow:

* Never hardcode keys or tokens
* No sensitive credentials in commits
* Use `.env` and `.gitignore`
* Follow Supabase RLS policies strictly

---

# 13. Contribution Rewards (Campus Level)

Contributors from campus receive:

* Open-source badges
* Recognition on campus
* Eligibility to become committee developers
* Priority access for Yuhu creator role

---

# 14. Getting Help

Ping maintainers:

* **@Abhinav-Codexp**
* **@Sairaj-Codexp**

Or use:

* GitHub Discussions
* Discord/Club Channel (coming soon)

---

# 15. Summary

This contribution guide ensures that Yuhu remains:

* Clean
* Scalable
* Developer-friendly
* Open-source driven
* Campus-led

We welcome contributions from beginners, students, and experienced developers alike.

📚 **Happy contributing!**

---

*End of Contribution_Guide.md*
