# YUHU - Software Development Life Cycle (SDLC)

## Evolutionary Model Approach

YUHU follows an **Evolutionary Model** combining iterative and incremental development. We develop module by module, validate each with users, then move to the next.

---

## Development Phases

### Phase 0: Setup & Foundation (Week 1-2)
**Goal:** Set up development environment and foundational infrastructure

**Tasks:**
- Initialize Expo project with TypeScript
- Set up Supabase project and configure database
- Configure authentication (Supabase Auth)
- Set up version control (Git/GitHub)
- Configure CI/CD pipeline
- Set up development, staging, production environments

**Deliverables:**
- Working Expo app with navigation
- Supabase project configured
- Authentication flow skeleton

**Validation:**
- App runs on iOS and Android simulators
- Can register and login users
- Database connection working

---

### Module 1: Authentication & User Management (Week 3-4)
**Goal:** Complete user registration, login, and profile management

**Features:**
- Email/password registration
- Email verification (OTP)
- Login with biometrics
- Password reset
- User profile creation and editing
- Role assignment (Student, Coordinator, Head, Admin)

**Technical Implementation:**
- Supabase Auth for authentication
- Expo SecureStore for token storage
- React Navigation with auth flow
- Profile screen with image upload

**Testing:**
- Unit tests for auth functions
- Integration tests for Supabase Auth
- Manual testing on real devices

**Validation Criteria:**
- ✅ Users can register and verify email
- ✅ Users can login and stay logged in
- ✅ Users can update profile and upload picture
- ✅ Biometric login works on iOS/Android

**Move to Module 2 only after validation**

---

### Module 2: Clubs & Councils Structure (Week 5-6)
**Goal:** Build club discovery, joining, and management

**Features:**
- Display list of councils and clubs
- Club detail pages with info, members, coordinators
- Join/leave club functionality
- Club recommendations based on user course/interests
- Coordinator role: manage club members

**Technical Implementation:**
- Database schema: councils, clubs, memberships tables
- API endpoints: GET clubs, POST join, DELETE leave
- Club list and detail screens
- Search and filter functionality

**Testing:**
- Unit tests for club operations
- Integration tests with database
- UI tests for club screens

**Validation Criteria:**
- ✅ Users can browse and search clubs
- ✅ Users can join and leave clubs
- ✅ Coordinators can see member lists
- ✅ Club pages display correctly

**Move to Module 3 only after validation**

---

### Module 3: Announcements & Feed (Week 7-8)
**Goal:** Enable verified announcements with approval workflow

**Features:**
- Announcement creation by Coordinators/Heads
- Approval workflow: Coordinator → Council Head → Admin
- Announcement feed with filters (club, date)
- Push notifications for verified announcements
- Audit trail for all announcement actions

**Technical Implementation:**
- Database schema: announcements table with status field
- Approval workflow state machine
- Push notification integration (Expo Notifications)
- Feed screen with infinite scroll
- Notification permissions handling

**Testing:**
- Unit tests for approval workflow logic
- Integration tests for push notifications
- End-to-end tests for announcement lifecycle

**Validation Criteria:**
- ✅ Coordinators can create announcements
- ✅ Approval workflow works correctly
- ✅ Students receive push notifications
- ✅ Feed displays announcements chronologically
- ✅ Audit trail logs all actions

**Move to Module 4 only after validation**

---

### Module 4: Events Management (Week 9-11)
**Goal:** Complete event creation, approval, RSVP, and attendance

**Features:**
- Event creation form with all details
- Event approval workflow
- Event feed with filters
- RSVP functionality
- Calendar sync (Google/Apple)
- Event reminders
- Attendance tracking via QR code
- Event photo gallery

**Technical Implementation:**
- Database schema: events, rsvps, attendance tables
- Event approval workflow (reuse from Module 3)
- Calendar API integration
- QR code generation and scanning
- Media upload for event photos

**Testing:**
- Unit tests for event operations
- Integration tests for calendar sync
- QR code scanning tests
- UI tests for event screens

**Validation Criteria:**
- ✅ Coordinators can create and manage events
- ✅ Approval workflow works
- ✅ Students can RSVP and see events
- ✅ Calendar sync works
- ✅ Attendance tracking functional
- ✅ Event reminders sent correctly

**Move to Module 5 only after validation**

---

### Module 5: Dashboard & Navigation (Week 12-13)
**Goal:** Build personalized dashboards for all user roles

**Features:**
- Student dashboard: joined clubs, upcoming events, notifications
- Quick actions: RSVP, message, view club
- Event calendar view
- Navigation refinements

**Technical Implementation:**
- Dashboard API aggregating user data
- Calendar view component
- Bottom tab navigation
- Pull-to-refresh and loading states

**Testing:**
- Unit tests for dashboard data fetching
- UI tests for dashboard interactions
- Performance tests for data loading

**Validation Criteria:**
- ✅ Dashboard loads quickly with correct data
- ✅ Quick actions work seamlessly
- ✅ Calendar view displays events
- ✅ Navigation is intuitive

**Move to Module 6 only after validation**

---

### Module 6: Messaging & Chat (Week 14-16)
**Goal:** Implement end-to-end encrypted real-time chat

**Features:**
- Direct messages between users
- Group chats for clubs
- End-to-end encryption (RSA + AES-GCM)
- Real-time message delivery
- Media sharing (images, documents)
- Message search
- Mute/leave chat

**Technical Implementation:**
- Supabase Realtime for WebSocket connections
- Encryption implementation using @noble/curves and @noble/ciphers
- Key generation and secure storage
- Chat UI with message bubbles
- File upload and preview

**Testing:**
- Unit tests for encryption/decryption
- Integration tests for Supabase Realtime
- End-to-end tests for message flow
- Security audit for encryption

**Validation Criteria:**
- ✅ Messages delivered in real-time (<1s)
- ✅ E2E encryption working correctly
- ✅ No plaintext messages stored in database
- ✅ Media sharing functional
- ✅ Search works
- ✅ Push notifications for new messages

**Move to Module 7 only after validation**

---

### Module 7: Admin Dashboard (Week 17-18)
**Goal:** Build analytics and management tools for administrators

**Features:**
- Engagement analytics (active users, club activity, event attendance)
- Audit logs viewer
- User management (verify roles, suspend users)
- Report generation (CSV, PDF)
- Real-time system health monitoring

**Technical Implementation:**
- Analytics database views and queries
- Admin-only API endpoints with RBAC
- Charts and graphs (Victory Native or Recharts)
- Export functionality
- Admin dashboard UI

**Testing:**
- Unit tests for analytics queries
- RBAC tests to ensure only admins can access
- Report generation tests

**Validation Criteria:**
- ✅ Analytics display correct data
- ✅ Audit logs complete and searchable
- ✅ User management operations work
- ✅ Reports export successfully
- ✅ Only admins can access dashboard

**Move to Module 8 only after validation**

---

### Module 8: Polish & Optimization (Week 19-20)
**Goal:** Refine UI/UX, optimize performance, fix bugs

**Tasks:**
- UI polish: animations, micro-interactions
- Performance optimization: lazy loading, caching
- Accessibility improvements
- Dark mode refinement
- Bug fixes from user feedback
- Onboarding flow improvements

**Testing:**
- Performance profiling
- Accessibility audit
- User acceptance testing (UAT)
- Load testing

**Validation Criteria:**
- ✅ App feels smooth and polished
- ✅ No critical bugs
- ✅ Accessibility standards met
- ✅ Performance metrics hit targets

---

### Module 9: Web App (Week 21-23)
**Goal:** Launch responsive web version

**Features:**
- All core features available on web
- Responsive design for desktop and mobile browsers
- PWA capabilities (installable, offline support)

**Technical Implementation:**
- Expo Web configuration
- Responsive layout adjustments
- Web-specific optimizations

**Testing:**
- Cross-browser testing
- Responsive design tests
- PWA functionality tests

**Validation Criteria:**
- ✅ Web app works on Chrome, Safari, Firefox
- ✅ Responsive on all screen sizes
- ✅ Core features functional

---

## Deployment Strategy

### Development Environment
- Expo Go for rapid testing
- Supabase development project
- Local testing on team devices

### Staging Environment
- EAS Build for internal testing
- Supabase staging project
- TestFlight (iOS) and Internal Testing (Android)
- Beta testers (20-30 students and coordinators)

### Production Environment
- EAS Build for production
- App Store and Google Play submission
- Supabase production project
- Monitoring and analytics setup

---

## Quality Assurance

### Testing Strategy
- **Unit Tests:** 70%+ code coverage
- **Integration Tests:** All API endpoints
- **E2E Tests:** Critical user flows
- **Manual Testing:** Every module before validation
- **Security Audits:** Encryption, RBAC, data protection
- **Performance Testing:** Load, stress, scalability

### Code Review Process
- All PRs require review from at least one team member
- Automated linting and formatting checks
- Automated tests must pass before merge

### Bug Tracking
- Use GitHub Issues for bug tracking
- Prioritize bugs: Critical, High, Medium, Low
- Sprint planning to address bugs

---

## Risk Management

### Technical Risks
- **Real-time chat performance:** Mitigate with load testing and optimization
- **E2E encryption complexity:** Mitigate with thorough testing and security review
- **Push notification reliability:** Mitigate with fallback mechanisms and monitoring

### Timeline Risks
- **Scope creep:** Stick to module-by-module approach, no new features mid-module
- **Dependency delays:** Choose well-supported libraries, have backups

### Adoption Risks
- **Low user engagement:** Continuous user feedback, iterate quickly
- **Technical issues at launch:** Staged rollout, monitoring, quick hotfix capability

---

## Success Criteria

Each module must pass validation before moving to next. Final release criteria:
- All 9 modules validated and deployed
- 70%+ code coverage
- Zero critical bugs
- Performance targets met
- Security audit passed
- User acceptance testing successful

---

**End of SDLC Document**
