import React from 'react';
import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const SECTIONS: PolicySection[] = [
  {
    title: 'Who We Are',
    body: (
      <p>
        <strong className="text-[#2A1A12]">idiotpedals.shop</strong> is operated by IDIOT Pedals,
        located in Bardhaman (Burdwan), West Bengal, 713104, India.
      </p>
    ),
  },
  {
    title: 'Information We Collect',
    body: (
      <p>
        When you sign in, place an order, or reach out for support, we collect your name, email
        address, phone/WhatsApp number, shipping/billing address, and order details. Card, UPI, and
        netbanking details are processed securely by{' '}
        <strong className="text-[#2A1A12]">Razorpay</strong> and are never stored on our servers.
      </p>
    ),
  },
  {
    title: 'How We Use Your Information',
    body: (
      <p>
        We use your information to verify and fulfill your orders, share dispatch and tracking
        updates, coordinate cancellations, exchanges, or warranty support, and keep your player
        account secure.
      </p>
    ),
  },
  {
    title: 'Third-Party Service Providers',
    body: (
      <p>
        Order information is shared strictly with essential service providers required to complete
        your purchase—such as Razorpay for payment processing, delivery providers for order
        fulfillment, and transactional email services.
      </p>
    ),
  },
  {
    title: 'Security & Cookies',
    body: (
      <p>
        All traffic on <strong className="text-[#2A1A12]">idiotpedals.shop</strong> is encrypted via
        HTTPS, and login sessions use secure{' '}
        <code className="px-1.5 py-0.5 rounded bg-[#FFF1E6] border border-[#F0D3B8] text-xs font-mono-tech text-[#2A1A12]">
          HttpOnly
        </code>{' '}
        cookies.
      </p>
    ),
  },
  {
    title: 'Privacy & Grievance Contact',
    body: (
      <p>
        For data access, correction, or privacy inquiries, contact us by{' '}
        <strong className="text-[#2A1A12]">phone/WhatsApp at +91 79085 85003</strong> or{' '}
        <strong className="text-[#2A1A12]">email idiotpedals@gmail.com</strong>.
      </p>
    ),
  },
];

export const PrivacyPolicyPage: React.FC = () => (
  <PolicyLayout
    seoTitle="Privacy Policy"
    seoDescription="Read how IDIOT Pedals (idiotpedals.shop) collects, uses, and protects your order, account, and payment data with HTTPS encryption and Razorpay checkout."
    canonicalPath="/privacy"
    badge="Privacy & Data Protection"
    heading="Privacy Policy"
    intro="How IDIOT Pedals handles your contact details, shipping addresses, and order records safely and transparently."
    sections={SECTIONS}
    locationText="Bardhaman (Burdwan), West Bengal, 713104, India"
  />
);

export default PrivacyPolicyPage;
