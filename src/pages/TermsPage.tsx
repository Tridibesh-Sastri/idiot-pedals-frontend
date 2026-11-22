import React from 'react';
import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const SECTIONS: PolicySection[] = [
  {
    title: 'Storefront & Pricing',
    body: (
      <p>
        All guitar effects pedals on <strong className="text-[#2A1A12]">idiotpedals.shop</strong>{' '}
        are listed in <strong className="text-[#2A1A12]">Indian Rupees (INR)</strong> inclusive of
        applicable taxes.
      </p>
    ),
  },
  {
    title: 'Orders & Payments',
    body: (
      <p>
        Orders are confirmed upon successful payment authorization via{' '}
        <strong className="text-[#2A1A12]">Razorpay</strong>. We reserve the right to cancel any
        order in case of stock discrepancies or pricing errors, with a full refund issued.
      </p>
    ),
  },
  {
    title: 'Power & Proper Usage',
    body: (
      <p>
        All IDIOT Pedals units operate on a standard{' '}
        <strong className="text-[#2A1A12]">9V DC center-negative (2.1mm barrel)</strong>{' '}
        pedalboard power supply. Damage caused by reverse-polarity adapters, AC power supplies, or
        over-voltage power sources is not covered under warranty.
      </p>
    ),
  },
  {
    title: 'Intellectual Property',
    body: (
      <p>
        All circuit designs, enclosure graphics, brand names, audio demos, and 3D assets on{' '}
        <strong className="text-[#2A1A12]">idiotpedals.shop</strong> are the property of IDIOT
        Pedals.
      </p>
    ),
  },
  {
    title: 'Governing Law & Contact',
    body: (
      <p>
        These terms are governed by the laws of India, subject to the jurisdiction of courts in West
        Bengal, India. For any questions, contact us by{' '}
        <strong className="text-[#2A1A12]">phone/WhatsApp (+91 79085 85003)</strong> or{' '}
        <strong className="text-[#2A1A12]">email (idiotpedals@gmail.com)</strong>.
      </p>
    ),
  },
];

export const TermsPage: React.FC = () => (
  <PolicyLayout
    seoTitle="Terms & Conditions"
    seoDescription="Review IDIOT Pedals storefront terms, INR tax-inclusive pricing, Razorpay payment authorization, 9V DC center-negative power guidelines, and Indian governing law."
    canonicalPath="/terms"
    badge="Terms of Use"
    heading="Terms & Conditions"
    intro="Storefront terms, payment authorization, proper 9V DC center-negative pedal usage, and governing law for purchases on idiotpedals.shop."
    sections={SECTIONS}
  />
);

export default TermsPage;
