# NextIF Ambassador Platform - Ambassador Frontend

The ambassador portal for the NextIF Ambassador Program. This React-based web application provides ambassadors with tools to manage their tasks, view announcements, submit reports, track progress, and communicate with administrators.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
nextif-ambassadors-frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API client configuration
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   │   ├── AmbassadorDashboard.tsx
│   │   ├── ComplaintsPage.tsx
│   │   ├── InboxPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   ├── TaskDetailsPage.tsx
│   │   └── TasksPage.tsx
│   ├── routes/         # Route definitions
│   ├── store/          # Zustand store
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Setup Steps

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5174`

## 🏃 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check code quality.

## 🎨 Features

### 🔐 Authentication

- **First-time login** for new ambassadors (email + phone number)
- **Standard login** with email and password
- **Password reset** flow
- **JWT-based authentication** with automatic token management
- **Protected routes** with role-based access control

### 📊 Dashboard

- **Weekly progress overview** with percentage-based progress bar
- **Task completion statistics** (mandatory and bonus tasks)
- **Points earned** and ranking
- **Recent announcements** and notifications
- **Quick access** to pending tasks
- **Performance metrics** and achievements

### 📋 Task Management

- **View all available tasks** (mandatory and bonus)
- **Filter tasks** by status (pending, completed, approved, rejected)
- **Task details** with requirements and deadlines
- **Submit tasks** with file uploads and/or links
- **Track submission status** (pending, approved, rejected)
- **View admin feedback** on submissions
- **Progress tracking** up to 200% (100% mandatory + 100% bonus)

### 📝 Task Submission

- **File upload** via Cloudinary
- **Link submission** for online content
- **Multiple file support** for comprehensive submissions
- **Preview submissions** before final submit
- **Edit submissions** if rejected
- **View submission history**

### 📬 Inbox

- **View notifications** from administrators
- **Read announcements** and updates
- **Mark notifications as read**
- **Filter notifications** by type
- **Search notifications**

### 🎫 Complaints

- **Submit complaints** to administrators
- **Track complaint status** (pending, in-progress, resolved)
- **View admin responses**
- **Edit pending complaints**
- **Delete complaints**
- **Complaint history**

### 📈 Reports

- **Weekly activity reports**
- **Task completion reports**
- **Points earned breakdown**
- **Performance analytics**
- **Export reports** (if implemented)

### 👤 Profile Management

- **View and edit profile**
- **Change password**
- **Update contact information**
- **View account statistics**
- **Profile picture upload**

## 🎯 Key Pages

### Login Page (`/login`)

- Email and password authentication
- Redirect to first-time login if needed
- Remember me functionality
- Password reset link

### Dashboard (`/dashboard`)

- Weekly progress bar (0-200%)
- Task completion overview
- Points earned and ranking
- Recent announcements
- Quick action buttons
- Performance metrics

### Tasks Page (`/tasks`)

- List of all available tasks
- Filter by status and type
- Task cards with details
- Quick submit button
- Progress indicators

### Task Details Page (`/tasks/:id`)

- Full task description
- Requirements and deadline
- Submission form
- File upload interface
- Link submission field
- Previous submissions (if any)
- Admin feedback display

### Inbox Page (`/inbox`)

- Notification list
- Announcement cards
- Read/unread indicators
- Search and filter
- Mark as read functionality

### Complaints Page (`/complaints`)

- Submit new complaint form
- Complaint list with status
- View admin responses
- Edit/delete pending complaints
- Filter by status

### Reports Page (`/reports`)

- Weekly activity summary
- Task completion charts
- Points breakdown
- Performance trends
- Export functionality

### Profile Page (`/profile`)

- View ambassador details
- Edit profile information
- Change password
- Account statistics
- Profile picture management

## 🔒 Authentication Flow

### First-Time Login

1. Ambassador enters email and phone number
2. System validates credentials
3. Ambassador is prompted to set a new password
4. Redirect to dashboard after successful setup

### Standard Login

1. Ambassador enters email and password
2. JWT token is received and stored
3. User is redirected to dashboard
4. Token is included in all API requests

### Forced Password Reset

1. If admin forces password reset, ambassador is redirected on login
2. Ambassador must set a new password
3. After reset, normal access is restored

### Password Reset

1. Ambassador requests password reset
2. Reset link/token is sent via email
3. Ambassador enters new password
4. Password is updated and user can log in

## 📊 Progress Tracking System

### Weekly Progress Bar

- **0-100%**: Mandatory tasks completion
- **100-200%**: Bonus tasks completion
- **Visual indicator**: Color-coded progress bar
  - Red/Orange: Below 50%
  - Yellow: 50-80%
  - Green: 80-100%
  - Blue/Purple: Above 100% (bonus)

### Point System

- Each task has a point value
- Mandatory tasks contribute to base 100%
- Bonus tasks add extra points (up to 100% more)
- Points are calculated weekly
- Leaderboard ranking based on total points

## 🎨 UI/UX Features

- **Modern, clean design** with Tailwind CSS v4
- **Smooth animations** using Framer Motion
- **Responsive layout** for all screen sizes (mobile-first)
- **Accessible components** following WCAG guidelines
- **Loading states** for async operations
- **Error handling** with user-friendly messages
- **Toast notifications** for user feedback
- **Modal dialogs** for confirmations
- **Form validation** with real-time feedback
- **Dark mode support** (if implemented)

## 🛠️ State Management

### Zustand Store

The application uses Zustand for global state management:

```typescript
interface AuthState {
  user: Ambassador | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // ... other auth methods
}
```

State is persisted to localStorage for session management.

## 🌐 API Integration

### Axios Configuration

- Base URL configured via environment variables
- Automatic JWT token injection
- Request/response interceptors
- Error handling and retry logic

### API Client Example

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📤 File Upload

### Cloudinary Integration

- Direct upload to Cloudinary
- Image and document support
- Progress tracking
- Error handling
- Preview functionality
- Multiple file uploads
- File size validation

### Supported File Types

- Images: JPG, PNG, GIF, WebP
- Documents: PDF, DOC, DOCX
- Other: As configured in Cloudinary

## 🎯 Routing

### Protected Routes

All routes except `/login` and `/unauthorized` are protected and require authentication.

### Route Structure

```
/login                 - Login page
/reset-password       - Password reset page
/dashboard            - Ambassador dashboard
/tasks                - Tasks list
/tasks/:id            - Task details and submission
/inbox                - Notifications and announcements
/complaints           - Complaints management
/reports              - Activity reports
/profile              - Ambassador profile
/unauthorized         - Unauthorized access page
```

## 🧩 Reusable Components

### Button

Customizable button component with variants (primary, secondary, danger, etc.)

### Input

Form input component with validation and error display

### Layout

Main application layout with navigation sidebar and header

### ProtectedRoute

Route wrapper for authentication and authorization checks

### ProgressBar

Visual progress indicator for task completion (0-200%)

### TaskCard

Card component for displaying task information

### NotificationCard

Card component for displaying notifications and announcements

## 📝 Environment Variables

| Variable                        | Description              | Required |
| ------------------------------- | ------------------------ | -------- |
| `VITE_API_BASE_URL`             | Backend API base URL     | Yes      |
| `VITE_CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name    | Yes      |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes      |

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Hosting

The `dist/` folder can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- GitHub Pages

### Environment Variables

Ensure all environment variables are configured in your hosting platform.

## 🐛 Troubleshooting

### Common Issues

**Issue**: API requests fail with CORS error

- **Solution**: Ensure backend CORS is configured to allow requests from the frontend URL

**Issue**: Authentication token not persisting

- **Solution**: Check localStorage permissions and browser settings

**Issue**: Cloudinary uploads fail

- **Solution**: Verify Cloudinary credentials and upload preset configuration

**Issue**: Progress bar not updating

- **Solution**: Ensure task submissions are being properly tracked and API is returning correct data

**Issue**: Build fails with TypeScript errors

- **Solution**: Run `npm run build` to see detailed error messages and fix type issues

## 🎯 User Workflow

### Typical Weekly Workflow

1. **Login** to the ambassador portal
2. **View dashboard** to see weekly progress
3. **Check inbox** for new announcements
4. **Browse tasks** to see available assignments
5. **Submit tasks** with required files/links
6. **Track progress** on the dashboard
7. **View feedback** from administrators
8. **Submit reports** at end of week
9. **Check ranking** and points earned

## 🤝 Contributing

1. Follow React best practices and hooks guidelines
2. Use TypeScript for type safety
3. Follow the existing component structure
4. Use Tailwind CSS for styling (avoid inline styles)
5. Add proper error handling and loading states
6. Test all features before committing
7. Ensure mobile responsiveness

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for NextIF Ambassador Program**
