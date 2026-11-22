import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {initRuntimeSecurity} from './lib/security';

// Initialize client-side runtime security guards (Anti-Clickjacking, immutable ledgers)
initRuntimeSecurity();

// Remove static index.html SEO fallbacks so React 19 native head hoisting owns
// a single <title>, <meta>, and <link rel="canonical"> per route with zero duplicates.
document.head.querySelectorAll('[data-seo-fallback]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
