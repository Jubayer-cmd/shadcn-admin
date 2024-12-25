import { createBrowserRouter } from 'react-router-dom'
import NotFoundError from './pages/errors/not-found-error.jsx'
import MaintenanceError from './pages/errors/maintenance-error.jsx'
import UnauthorisedError from './pages/errors/unauthorised-error.jsx'
import GeneralErrors from './pages/errors/general-error.jsx'
import SignIn from './pages/auth/sign-in.jsx'
import SignIn2 from './pages/auth/sign-in-2.jsx'
import SignUp from './pages/auth/sign-up.jsx'
import ForgotPassword from './pages/auth/forgot-password.jsx'
import Otp from './pages/auth/otp.jsx'
import Dashboard from './pages/dashboard/index.jsx'
import Tasks from './pages/tasks/index.jsx'
import ComingSoon from './components/coming-soon.jsx'
import SettingsProfile from './pages/settings/profile/index.jsx'
import SettingsAccount from './pages/settings/account/index.jsx'
import SettingsAppearance from './pages/settings/appearance/index.jsx'
import SettingsNotifications from './pages/settings/notifications/index.jsx'
import SettingsDisplay from './pages/settings/display/index.jsx'
import ErrorExample from './pages/settings/error-example/index.jsx'
import { ProtectedRoute, PublicRoute } from './lib/PrivatePublicRoutes.jsx'

const lazyImport = (path) => async () => {
  const module = await import(path)
  return { Component: module.default }
}

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    lazy: lazyImport('./pages/auth/sign-in.jsx'),
    element: <SignIn />,
  },
  {
    path: '/sign-in-2',
    lazy: lazyImport('./pages/auth/sign-in-2.jsx'),
    element: (
      <PublicRoute>
        <SignIn2 />
      </PublicRoute>
    ),
  },
  {
    path: '/sign-up',
    lazy: lazyImport('./pages/auth/sign-up.jsx'),
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    lazy: lazyImport('./pages/auth/forgot-password.jsx'),
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/otp',
    lazy: lazyImport('./pages/auth/otp.jsx'),
    element: (
      <PublicRoute>
        <Otp />
      </PublicRoute>
    ),
  },

  // Main routes
  {
    path: '/',
    lazy: lazyImport('./components/app-shell.jsx'),
    errorElement: <GeneralErrors />,
    children: [
      {
        index: true,
        lazy: lazyImport('./pages/dashboard/index.jsx'),
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tasks',
        lazy: lazyImport('./pages/tasks/index.jsx'),
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        lazy: lazyImport('@/components/coming-soon'),
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ),
      },
      {
        path: 'analysis',
        lazy: lazyImport('@/components/coming-soon'),
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        lazy: lazyImport('./pages/settings/index.jsx'),
        errorElement: <GeneralErrors />,
        children: [
          {
            index: true,
            lazy: lazyImport('./pages/settings/profile/index.jsx'),
            element: (
              <ProtectedRoute>
                <SettingsProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: 'account',
            lazy: lazyImport('./pages/settings/account/index.jsx'),
            element: (
              <ProtectedRoute>
                <SettingsAccount />
              </ProtectedRoute>
            ),
          },
          {
            path: 'appearance',
            lazy: lazyImport('./pages/settings/appearance/index.jsx'),
            element: (
              <ProtectedRoute>
                <SettingsAppearance />
              </ProtectedRoute>
            ),
          },
          {
            path: 'notifications',
            lazy: lazyImport('./pages/settings/notifications/index.jsx'),
            element: (
              <ProtectedRoute>
                <SettingsNotifications />
              </ProtectedRoute>
            ),
          },
          {
            path: 'display',
            lazy: lazyImport('./pages/settings/display/index.jsx'),
            element: (
              <ProtectedRoute>
                <SettingsDisplay />
              </ProtectedRoute>
            ),
          },
          {
            path: 'error-example',
            lazy: lazyImport('./pages/settings/error-example/index.jsx'),
            errorElement: <GeneralErrors className='h-[50svh]' minimal />,
            element: (
              <ProtectedRoute>
                <ErrorExample />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', element: <GeneralErrors /> },
  { path: '/404', element: <NotFoundError /> },
  { path: '/503', element: <MaintenanceError /> },
  { path: '/401', element: <UnauthorisedError /> },

  // Fallback 404 route
  { path: '*', element: <NotFoundError /> },
])

export default router
