import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/main/style.scss';
import * as Sentry from '@sentry/react';
import { isAxiosError } from 'axios';
import App from '@pages/App/App';
import ErrorFallback from '@components/ErrorFallback/ErrorFallback';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  release: import.meta.env.VITE_SENTRY_RELEASE,
  environment: import.meta.env.MODE,
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
  ],
  denyUrls: [
    /^chrome-extension:\/\//i,
    /^moz-extension:\/\//i,
    /^safari-(web-)?extension:\/\//i,
  ],
  beforeSend(event, hint) {
    const error = hint.originalException;
    if (isAxiosError(error) && error.response) return null;
    return event;
  },
});

createRoot(document.getElementById('root')!, {
  onUncaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>,
)
