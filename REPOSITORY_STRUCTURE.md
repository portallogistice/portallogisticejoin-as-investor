
src/
│
├── 📂 app/                          # App-level setup (was index.js)
│   ├── App.jsx                      # Main app with routes
│   ├── providers.jsx                # All providers wrapper
│   └── routes.jsx                   # Route definitions with lazy loading
│
├── 📂 features/                     # ⭐ FEATURE-BASED MODULES
│   │
│   ├── 📂 auth/                     # Authentication feature
│   │   ├── api/
│   │   │   ├── login.js             # API calls
│   │   │   └── refreshToken.js
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── OTPVerification.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useLogin.js
│   │   ├── stores/
│   │   │   └── authStore.js         # Zustand / Context
│   │   ├── pages/
│   │   │   └── LoginPage.jsx
│   │   └── index.js                 # Public API of feature
│   │
│   ├── 📂 contracts/                # Contract management feature
│   │   ├── api/
│   │   │   ├── getContracts.js
│   │   │   ├── createContract.js
│   │   │   └── signContract.js
│   │   ├── components/
│   │   │   ├── ContractCard.jsx
│   │   │   ├── ContractForm.jsx
│   │   │   └── ContractStatusBadge.jsx
│   │   ├── hooks/
│   │   │   ├── useContracts.js
│   │   │   └── useContractSigning.js
│   │   ├── pages/
│   │   │   ├── ContractsPage.jsx
│   │   │   └── ContractDetailPage.jsx
│   │   └── index.js
│   │
│   ├── 📂 payments/
│   ├── 📂 notifications/
│   ├── 📂 profile/
│   ├── 📂 admin/                    # Admin feature (can be sub-features)
│   │   ├── users/
│   │   ├── contracts/
│   │   ├── analytics/
│   │   └── ...
│   │
│   └── 📂 dashboard/                # Shared dashboard shell
│       ├── components/
│       │   ├── DashboardLayout.jsx
│       │   ├── DashboardSidebar.jsx
│       │   ├── DashboardHeader.jsx
│       │   └── DashboardFooter.jsx
│       └── hooks/
│           └── useDashboard.js
│
├── 📂 components/                   # 🧱 Pure UI primitives (NO business logic)
│   ├── ui/                          # Buttons, inputs, modals, tables
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   └── index.js                 # Barrel export
│   └── layout/                      # Layout primitives
│       ├── Sidebar.jsx
│       ├── Header.jsx
│       └── Footer.jsx
│
├── 📂 hooks/                        # 🔗 Shared custom hooks
│   ├── useApi.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   ├── useTheme.js
│   └── useRTL.js
│
├── 📂 lib/                          # 🔧 Utilities & config (NO components)
│   ├── api.js                       # Axios instance + interceptors
│   ├── i18n.js                      # i18next config
│   ├── constants.js
│   ├── utils.js                     # Pure helper functions
│   └── config.js                    # App config
│
├── 📂 stores/                       # 🏪 Global state (Zustand recommended)
│   ├── useAuthStore.js
│   ├── useThemeStore.js
│   └── useNotificationStore.js
│
├── 📂 styles/                       # 🎨 Global styles only
│   ├── index.css                    # Tailwind directives + base
│   ├── variables.css                # CSS variables (colors, spacing)
│   └── animations.css               # Global animations
│
├── 📂 types/                        # 📝 Shared TypeScript types (if migrating)
│   └── index.ts
│
└── main.jsx                         # Entry point










































# Portal Logistics - Repository Structure & Documentation

## 📚 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Repository Structure](#repository-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Key Dependencies](#key-dependencies)
7. [How It Works](#how-it-works)
8. [Authentication Flow](#authentication-flow)
9. [API Integration](#api-integration)
10. [Project Setup](#project-setup)

---

## 🎯 Project Overview

**Portal Logistics** (بوابة تساهيل) is a full-stack bilingual web application for managing logistics contracts with digital signature capabilities through Nafath authentication. It's designed for the Saudi Arabian market and enables users to create, sign, and manage selling and rental contracts.

### Key Purpose
- **Contract Management**: Create, sign, and manage logistics contracts
- **Digital Authentication**: Secure signing using Nafath (Saudi Arabia's national digital identity)
- **Admin Dashboard**: Comprehensive management tools for administrators
- **Bilingual Support**: Full Arabic/English interface with RTL/LTR support

### Target Users
- **End Users**: Individuals managing logistics contracts
- **Administrators**: Staff managing users, contracts, and approvals

---

## 🛠 Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI Framework |
| **React Router DOM** | 7.6.3 | Client-side routing |
| **Bootstrap** | 5.3.7 | CSS Framework |
| **Axios** | 1.10.0 | HTTP client for API calls |
| **i18next** | 25.3.1 | Internationalization (i18n) |
| **react-i18next** | 15.6.0 | i18n React integration |
| **FontAwesome** | 6.5.1 | Icons library |
| **React Notifications Component** | 4.0.1 | Toast notifications |
| **React Loader Spinner** | 6.1.6 | Loading spinners |
| **React International Phone** | 4.5.0 | Phone input component |
| **libphonenumber-js** | 1.12.9 | Phone number validation |

### Backend Technologies
| Technology | Purpose |
|------------|---------|
| **Laravel (PHP)** | RESTful API Backend |
| **Laravel Passport** | OAuth2 Authentication |
| **MySQL** | Database |

### API Configuration
```
Base URL: https://shellafood.com/api/v1
```

---

## 📁 Repository Structure

```
portallogisticejoin-as-investor/
│
├── 📄 package.json                 # Frontend dependencies
├── 📄 package-lock.json            # Dependency lock file
├── 📄 public/                      # Static assets
│   ├── index.html                  # Main HTML file
│   ├── fontawesome.css             # FontAwesome CSS
│   ├── assets/                     # Images and media
│   ├── files/                      # File storage
│   └── webfonts/                   # Font files
│
├── 📂 src/                         # React Frontend Source
│   ├── index.js                    # Entry point
│   ├── config.js                   # API & env configuration
│   │
│   ├── 📂 Pages/                   # Page Components
│   │   ├── LoginPage.js            # Login page
│   │   ├── TsahelPage.js           # Landing page
│   │   ├── UserDashboard.js        # User dashboard layout
│   │   ├── AdminDashboard.js       # Admin dashboard layout
│   │   ├── Dashboard/              # User dashboard pages
│   │   │   ├── OverviewPage.js
│   │   │   ├── ContractsPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── PaymentsPage.js
│   │   │   ├── TasksPage.js
│   │   │   ├── AnalyticsPage.js
│   │   │   └── NotificationsPage.js
│   │   └── Admin/                  # Admin dashboard pages
│   │       ├── AdminInvestmentsPage.js
│   │       ├── AdminInvoicesPage.js
│   │       ├── ContractsPage.js
│   │       ├── AdminOverviewPage.js
│   │       ├── AdminStatisticsPage.js
│   │       ├── AdminPaymentsPage.js
│   │       ├── AdminAnalyticsPage.js
│   │       ├── AdminDocumentsPage.js
│   │       ├── AdminActivityPage.js
│   │       └── AdminSettingsPage.js
│   │
│   ├── 📂 Components/              # Reusable Components
│   │   ├── DashboardLayout.js      # Main dashboard layout wrapper
│   │   ├── DashboardSidebar.js     # User sidebar navigation
│   │   ├── AdminLayout.js          # Admin layout wrapper
│   │   ├── AdminSidebar.js         # Admin sidebar navigation
│   │   ├── ContractForm.js         # Contract creation form
│   │   ├── ContractManagement.js   # Contract management UI
│   │   ├── UserManagement.js       # User management for admins
│   │   ├── NotificationBell.js     # Notification icon/dropdown
│   │   ├── NotificationDialog.js   # Notification modal
│   │   ├── ProfileCompletionModal.js # Profile setup modal
│   │   ├── DocumentPreviewDialog.js # Document preview
│   │   ├── DocumentProcessingDialog.js # Document processing modal
│   │   ├── DocumentResultDialog.js # Document result display
│   │   ├── PaymentReceiptUploadModal.js # Payment receipt upload
│   │   ├── ProtectedRoute.js       # Route protection HOC
│   │   ├── PaymentsRouteGuard.js   # Payments access guard
│   │   ├── RejectionDialog.js      # Rejection notification
│   │   ├── RefusalNotificationDialog.js # Refusal notification
│   │   ├── RealTimeNotificationHandler.js # Real-time updates
│   │   ├── DataComparisonModal.js  # Data comparison UI
│   │   ├── ActionRequiredCard.js   # Action card component
│   │   ├── AccountDetailsCollapsible.js # Collapsible details
│   │   ├── CountdownTimer.js       # Countdown display
│   │   ├── DashboardFooter.js      # Footer component
│   │   ├── Admin/                  # Admin-specific components
│   │   │   └── [admin components]
│   │
│   ├── 📂 Context/                 # React Context API
│   │   └── AuthContext.js          # Authentication context (uses cookies)
│   │
│   ├── 📂 api/                     # API Service Layer
│   │   └── dashboardApi.js         # API calls wrapper
│   │
│   ├── 📂 hooks/                   # Custom React Hooks
│   │   └── useContractEligibility.js # Contract eligibility logic
│   │
│   ├── 📂 Handlers/                # Business Logic Handlers
│   │   └── GeneralMethods.js       # Utility methods
│   │
│   ├── 📂 Css/                     # Stylesheets
│   │   ├── index.css               # Global styles
│   │   ├── style.css               # Main styles
│   │   ├── login.css               # Login page styles
│   │   ├── dashboard.css           # Dashboard styles
│   │   ├── dashboard-layout.css    # Dashboard layout
│   │   ├── dashboard-sidebar.css   # Sidebar styles
│   │   ├── admin-dashboard.css     # Admin dashboard styles
│   │   ├── admin-layout.css        # Admin layout styles
│   │   ├── admin-sidebar.css       # Admin sidebar styles
│   │   ├── pages/                  # Page-specific styles
│   │   │   ├── common.css
│   │   │   ├── overview-page.css
│   │   │   ├── contracts-page.css
│   │   │   ├── profile-page.css
│   │   │   ├── payments-page.css
│   │   │   ├── tasks-page.css
│   │   │   ├── analytics-page.css
│   │   │   ├── admin-contracts-page.css
│   │   │   └── [other page styles]
│   │
│   ├── 📂 i18n/                    # Internationalization
│   │   └── [i18n configuration and translations]
│   │
│   ├── 📂 data/                    # Static data
│   │   └── [mock data, constants]
│   │
│   ├── 📂 utils/                   # Utility functions
│   │   └── [helper functions]
│   │
│   ├── 📂 Utitlities/              # Additional utilities
│   │   └── [additional helpers]
│   │
│   └── 📂 CustomComponents/        # Custom UI components
│       └── [custom components]
│
├── 📂 products-api/                # Laravel Backend
│   ├── app/                        # Application logic
│   │   ├── Http/                   # HTTP layer
│   │   │   ├── Controllers/        # API Controllers
│   │   │   └── Requests/           # Form validation
│   │   ├── Models/                 # Database models
│   │   └── Providers/              # Service providers
│   │
│   ├── routes/                     # API routes
│   │   └── api.php                 # API route definitions
│   │
│   ├── database/                   # Database files
│   │   ├── migrations/             # Database migrations
│   │   └── seeders/                # Database seeders
│   │
│   ├── config/                     # Configuration files
│   │   ├── app.php
│   │   ├── database.php
│   │   ├── auth.php
│   │   └── [other configs]
│   │
│   ├── resources/                  # Resource files
│   ├── public/                     # Public assets
│   ├── storage/                    # File storage
│   ├── tests/                      # Test files
│   ├── bootstrap/                  # Bootstrap files
│   ├── package.json                # Backend dependencies
│   └── composer.json               # PHP dependencies
│
├── 📂 tools/                       # Development tools
│   ├── create_user_11236305067.php # User creation script
│   ├── scan_api_candidates.py      # API scanning tool
│   ├── scan_notfound_signature.py  # Signature scanner
│   ├── scan_path_usage.py          # Path usage analyzer
│   └── ngrok/                      # Ngrok tunneling
│
├── 📄 .env                         # Environment variables
├── 📄 README.md                    # Project readme
├── 📄 deploy.sh                    # Deployment script
└── 📄 [Documentation files]        # Various documentation

```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App (Root)
│
├── Routes (React Router)
│   ├── Public Routes
│   │   ├── /                       → TsahelPage (Landing)
│   │   └── /login                  → LoginPage
│   │
│   └── Protected Routes
│       ├── User Routes
│       │   └── /dashboard/*        → DashboardLayout
│       │       ├── /overview       → OverviewPage
│       │       ├── /contracts      → ContractsPage
│       │       ├── /profile        → ProfilePage
│       │       ├── /payments       → PaymentsPage
│       │       ├── /tasks          → TasksPage
│       │       ├── /analytics      → AnalyticsPage
│       │       └── /notifications  → NotificationsPage
│       │
│       └── Admin Routes
│           └── /admin/*            → AdminLayout
│               ├── /overview       → AdminOverviewPage
│               ├── /statistics     → AdminStatisticsPage
│               ├── /contracts      → AdminContractsPage
│               ├── /payments       → AdminPaymentsPage
│               ├── /analytics      → AdminAnalyticsPage
│               ├── /documents      → AdminDocumentsPage
│               ├── /activity       → AdminActivityPage
│               └── /settings       → AdminSettingsPage
```

### State Management

**AuthContext** handles:
- User authentication status
- Current user/admin data
- Authentication tokens (stored in cookies)
- Login/logout operations
- OTP verification
- Password reset

### Key Components

| Component | Purpose |
|-----------|---------|
| **ProtectedRoute** | HOC for route protection based on auth |
| **PaymentsRouteGuard** | Access control for payments page |
| **DashboardLayout** | Main user dashboard wrapper |
| **AdminLayout** | Main admin dashboard wrapper |
| **ContractForm** | Contract creation and editing |
| **NotificationBell** | Real-time notifications |
| **RealTimeNotificationHandler** | Handles real-time updates |

---

## 🔧 Backend Architecture

### Laravel Structure

```
products-api/
├── app/Http/Controllers/
│   ├── AuthController          # Authentication endpoints
│   ├── ContractController      # Contract management
│   ├── UserController          # User management
│   ├── PaymentController       # Payment handling
│   ├── AdminController         # Admin operations
│   └── [Other controllers]
│
├── app/Models/
│   ├── User                    # User model
│   ├── Contract                # Contract model
│   ├── Payment                 # Payment model
│   ├── Admin                   # Admin model
│   └── [Other models]
│
├── routes/api.php              # API routes
│
├── database/migrations/        # Schema migrations
│
└── config/                     # Configuration
```

### API Endpoints Structure

```
Base URL: https://shellafood.com/api/v1/portallogistice/

Authentication:
  POST /login                    # User login
  POST /admin/login              # Admin login
  POST /logout                   # User logout
  POST /admin/logout             # Admin logout
  POST /send-otp                 # Send OTP to phone
  POST /reset-password           # Reset password with OTP

Contracts:
  GET /contracts                 # List user contracts
  POST /contracts                # Create contract
  GET /contracts/{id}            # Get contract details
  PUT /contracts/{id}            # Update contract
  DELETE /contracts/{id}         # Delete contract

Admin:
  GET /admin/contracts           # List all contracts (admin)
  PUT /admin/contracts/{id}      # Approve/deny contract
  GET /admin/users               # List all users
  POST /admin/users              # Create user
  PUT /admin/users/{id}          # Update user

Payments:
  GET /payments                  # List payments
  POST /payments                 # Create payment
  GET /payments/{id}             # Get payment details
```

---

## 📦 Key Dependencies

### Frontend Dependencies

**UI & Styling:**
- `bootstrap` - CSS framework
- `@fortawesome/fontawesome-free` - Icons
- `fontawesome` - Font awesome library

**State & Context:**
- `react` - React framework
- `react-dom` - React DOM rendering

**Routing:**
- `react-router-dom` - Client-side routing

**Internationalization:**
- `i18next` - i18n framework
- `react-i18next` - i18n React integration

**HTTP & Data:**
- `axios` - HTTP client for API calls

**UI Components:**
- `react-notifications-component` - Toast notifications
- `react-loader-spinner` - Loading spinners
- `react-international-phone` - Phone input
- `libphonenumber-js` - Phone validation

**Testing:**
- `@testing-library/react` - React testing
- `@testing-library/jest-dom` - Jest utilities
- `@testing-library/user-event` - User interaction testing

### Backend Dependencies (Laravel)
- `laravel/framework` - Laravel framework
- `laravel/passport` - OAuth2 authentication
- `laravel/tinker` - Tinker REPL
- MySQL driver
- JWT for token management

---

## 🔄 How It Works

### User Flow

1. **Landing Page** (`TsahelPage`)
   - User visits portal
   - Option to login or create account

2. **Authentication** (`LoginPage`)
   - User logs in with: email, phone, or national ID
   - Backend validates credentials
   - If first login, OTP is sent to phone
   - User verifies OTP or sets password

3. **User Dashboard** (`UserDashboard`)
   - After login, user enters dashboard
   - Profile completion modal shown if needed
   - Access to various dashboard pages

4. **Contract Management**
   - User creates contracts (selling/rental)
   - Contracts linked automatically
   - Contracts can be signed with Nafath
   - Track contract status (pending, approved, denied)

5. **Payments & Tasks**
   - View payments and payment history
   - Upload payment receipts
   - Track tasks and action items

### Admin Flow

1. **Admin Login** (`LoginPage` with admin flag)
   - Admin logs in with admin credentials
   - Redirected to admin dashboard

2. **Admin Dashboard** (`AdminDashboard`)
   - Overview with statistics
   - Access to management pages

3. **User Management**
   - View all users
   - Create/edit users
   - Activate/deactivate accounts
   - View user details

4. **Contract Management**
   - View all contracts
   - Approve/deny contracts
   - Track contract status
   - Generate reports

5. **Payments & Analytics**
   - View payment records
   - Analytics and statistics
   - Generate reports

---

## 🔐 Authentication Flow

### Storage Mechanism (Cookies)

The app uses **cookies** instead of localStorage for security:

```javascript
// Token storage in cookies
Cookie: portal_logistics_token=[auth_token]
Cookie: portal_logistics_user_type=[user|admin]
Cookie: portal_logistics_user=[user_data_json]
Cookie: portal_logistics_admin=[admin_data_json]

// Cookie expiration: 30 days
```

### Authentication Process

```
1. User/Admin enters credentials
   ↓
2. POST to /login or /admin/login
   ↓
3. Backend validates credentials
   ↓
4. If first login or requiresOTP:
   - Send OTP to phone
   - Return requiresOTP: true
   ↓
5. If first login:
   - User verifies OTP
   - POST /reset-password to set new password
   ↓
6. Backend generates auth token
   ↓
7. Token stored in cookie
   ↓
8. User/Admin redirected to dashboard
```

### API Request Headers

All authenticated requests include:
```
Authorization: Bearer [token]
Content-Type: application/json
Accept: application/json
X-LANG: [ar|en]
```

---

## 🌐 API Integration

### Service Layer (`src/api/dashboardApi.js`)

Centralized API calls using Axios:
- Authentication endpoints
- Contract endpoints
- User endpoints
- Admin endpoints
- Payment endpoints

### Error Handling

```javascript
// Errors include:
- 401: Unauthorized (token expired)
- 403: Forbidden (insufficient permissions)
- 404: Not found
- 422: Validation errors
- 5xx: Server errors
```

### Request/Response Flow

```
Component
   ↓
useAuth() / API Hook
   ↓
dashboardApi.js (Axios wrapper)
   ↓
Backend API
   ↓
Response with data
   ↓
State update / Re-render
```

---

## 📚 Internationalization (i18n)

### Supported Languages
- **Arabic (ar)** - RTL layout
- **English (en)** - LTR layout

### Implementation

```javascript
// i18next configuration
- Translations in /src/i18n/
- Language toggle in UI
- Stored in localStorage: i18nextLng
- RTL/LTR automatic based on language
```

---

## 🚀 Project Setup

### Installation

```bash
# Frontend setup
cd portallogisticejoin-as-investor
npm install

# Backend setup
cd products-api
composer install
npm install
```

### Environment Variables

```env
# Frontend (.env or config.js)
REACT_APP_API_BASE_URL=https://shellafood.com/api/v1

# Backend (.env)
APP_URL=https://shellafood.com
DB_HOST=localhost
DB_DATABASE=portal_logistics
DB_USERNAME=root
DB_PASSWORD=password
```

### Running the Application

```bash
# Frontend development
npm start                    # Runs on http://localhost:3000

# Frontend build
npm build                    # Production build

# Backend (Laravel)
php artisan serve           # Runs on http://localhost:8000
php artisan migrate         # Run migrations
```

---

## 🔍 Key Features Summary

### For End Users
✅ Multi-method authentication (email, phone, national ID)  
✅ OTP verification for quick access  
✅ Contract creation (selling & rental)  
✅ Contract linking and management  
✅ Digital signing with Nafath  
✅ Payment tracking  
✅ Document downloads  
✅ Real-time notifications  
✅ Bilingual interface (Arabic/English)  
✅ Responsive design (mobile & desktop)  

### For Administrators
✅ User management dashboard  
✅ Contract approval/denial workflow  
✅ Statistics and analytics  
✅ Payment tracking  
✅ Activity monitoring  
✅ User account management  
✅ Document management  
✅ Comprehensive reporting  

---

## 📝 Notes

- **Security**: Uses cookies for token storage (more secure than localStorage)
- **State Management**: React Context API for global auth state
- **Styling**: Bootstrap + Custom CSS for responsive design
- **API**: RESTful API with Bearer token authentication
- **Language**: Full i18n support with RTL/LTR layouts
- **Notifications**: Real-time notifications with WebSocket integration

---

## 🎓 Additional Resources

- Check `README.md` for project overview
- Review `APIS.MD` for API documentation
- See `ENDPOINTS.md` for endpoint listing
- Check individual documentation files for specific features

