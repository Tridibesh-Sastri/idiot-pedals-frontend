import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {initRuntimeSecurity} from './lib/security';

// Initialize client-side runtime security guards (Anti-Clickjacking, immutable ledgers)
initRuntimeSecurity();

// Remove static index.html SEO fallbacks or build-time prerendered SEO tags
// before React 19 mounts so native head hoisting never leaves duplicate tags.
if (document.documentElement.dataset.prerendered === 'true') {
  document
    .querySelectorAll(
      'head title, head meta[name="description"], head meta[name="robots"], head link[rel="canonical"], head meta[property^="og:"], head meta[name^="twitter:"]'
    )
    .forEach((el) => el.remove());
} else {
  document.head.querySelectorAll('[data-seo-fallback]').forEach((el) => el.remove());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
