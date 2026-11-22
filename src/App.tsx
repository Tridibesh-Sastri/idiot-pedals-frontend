import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers: Provide application-wide state for Authentication, Cart, and Notifications
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Lenis Smooth Scroll Synchronizer (desktop-only, lazily loaded)
import { SmoothScroll } from './components/SmoothScroll';

// Common Global Layout Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LoadingState } from './components/common/AsyncState';

// Primary public landing & catalog views stay eagerly loaded for immediate first paint
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductPage';

// Secondary & private routes are code-split so initial JS stays lean for mobile LCP/INP
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage').then((m) => ({ default: m.ShippingPolicyPage })));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage').then((m) => ({ default: m.RefundPolicyPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage })));
const VerifyPhonePage = lazy(() => import('./pages/VerifyPhonePage').then((m) => ({ default: m.VerifyPhonePage })));
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage').then((m) => ({ default: m.AuthCallbackPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrdersPage = lazy(() => import('./pages/OrdersPage').then((m) => ({ default: m.OrdersPage })));
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage').then((m) => ({ default: m.OrderDetailPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })));

const RouteFallback: React.FC = () => (
  <div className="bg-[#FFF8F1] text-[#2A1A12] pt-28 pb-20 min-h-screen px-4">
    <div className="max-w-3xl mx-auto">
      <LoadingState message="Loading…" />
    </div>
  </div>
);

/**
 * Root Application Component with Light Editorial UI
 * (white / warm paper + neon orange — absorbed from the landing hero)
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <SmoothScroll>
              {/* Resets window scroll position smoothly when route changes */}
              <ScrollToTop />

              {/* Main Application Shell with warm cream and molten orange accents */}
              <div className="min-h-screen bg-[#FFF8F1] text-[#2A1A12] selection:bg-[#FF5E1E] selection:text-white flex flex-col font-sans">
                
                {/* Dynamic Global Navbar */}
                <Navbar />

                {/* Main Routing Viewport */}
                <main className="flex-grow">
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      {/* Public marketing and catalog routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/products/:id" element={<ProductDetailPage />} />
                      {/* Legacy single-product route kept working */}
                      <Route path="/product" element={<Navigate to="/products" replace />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />

                      {/* Public legal & policy routes (no auth required) */}
                      <Route path="/shipping" element={<ShippingPolicyPage />} />
                      <Route path="/refund" element={<RefundPolicyPage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/terms" element={<TermsPage />} />

                      {/* Authentication & Verification routes */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/verify-email" element={<VerifyEmailPage />} />
                      <Route path="/verify-phone" element={<VerifyPhonePage />} />
                      {/* Google OAuth lands here once the backend has set the session cookie. */}
                      <Route path="/auth/callback" element={<AuthCallbackPage />} />

                      {/* Customer Orders & Checkout routes */}
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/orders/:id" element={<OrderDetailPage />} />
                      <Route path="/account" element={<AccountPage />} />

                      {/* Catch-all fallback: redirect any unknown URL to HomePage */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </main>

                {/* Global Overlays: Floating Toast Notifications */}
                <CartDrawer />
                <ToastContainer />

                {/* Global Brand Footer */}
                <Footer />
              </div>
            </SmoothScroll>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
