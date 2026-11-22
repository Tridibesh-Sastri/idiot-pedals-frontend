import React from 'react';
import { Link } from 'react-router-dom';
import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const SECTIONS: PolicySection[] = [
  {
    title: 'Order Processing & Dispatch',
    body: (
      <p>
        Every pedal is bench-tested, packed, and dispatched within{' '}
        <strong className="text-[#2A1A12]">1–3 business days</strong> (excluding Sundays and public
        holidays) from our workshop in Bardhaman (Burdwan), West Bengal, India.
      </p>
    ),
  },
  {
    title: 'Shipping Cost',
    body: (
      <p>
        We offer <strong className="text-[#2A1A12]">free insured doorstep delivery across India</strong>{' '}
        on all pedal orders.
      </p>
    ),
  },
  {
    title: 'Estimated Delivery Time',
    body: (
      <p>
        Orders are shipped via trusted insured courier services across India and typically arrive
        within <strong className="text-[#2A1A12]">3–7 business days</strong> after dispatch,
        depending on your delivery PIN code.
      </p>
    ),
  },
  {
    title: 'Order Tracking & Delivery Updates',
    body: (
      <p>
        Once your order is dispatched, tracking details are sent to your registered email address
        and can also be viewed anytime under your{' '}
        <Link to="/orders" className="text-[#FF5E1E] font-semibold hover:underline">
          Orders
        </Link>{' '}
        page.
      </p>
    ),
  },
  {
    title: 'Shipping Support',
    body: (
      <p>
        For any delivery questions, address updates before dispatch, or order tracking assistance,
        contact us directly via{' '}
        <strong className="text-[#2A1A12]">phone/WhatsApp at +91 79085 85003</strong> (Mon–Sat,
        10 AM – 7 PM IST),{' '}
        <strong className="text-[#2A1A12]">email idiotpedals@gmail.com</strong>, or visit our{' '}
        <Link to="/contact" className="text-[#FF5E1E] font-semibold hover:underline">
          Contact page
        </Link>
        —our team will verify your order details and guide you through the next steps.
      </p>
    ),
  },
];

export const ShippingPolicyPage: React.FC = () => (
  <PolicyLayout
    seoTitle="Shipping & Delivery Policy"
    seoDescription="Learn about IDIOT Pedals order processing (1–3 business days), free insured doorstep delivery across India (3–7 business days), tracking, and shipping support."
    canonicalPath="/shipping"
    badge="Shipping & Delivery"
    heading="Shipping & Delivery Policy"
    intro="Clear dispatch timelines, free insured nationwide delivery, and direct workshop support for every IDIOT Pedals order."
    sections={SECTIONS}
  />
);

export default ShippingPolicyPage;
