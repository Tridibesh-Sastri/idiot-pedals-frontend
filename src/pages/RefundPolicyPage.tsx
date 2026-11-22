import React from 'react';
import { Link } from 'react-router-dom';
import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const SECTIONS: PolicySection[] = [
  {
    title: 'Order Cancellations',
    body: (
      <p>
        Orders may be cancelled within <strong className="text-[#2A1A12]">24 hours</strong> of
        placement, provided the pedal has not yet been dispatched. To request a cancellation,
        contact us via <strong className="text-[#2A1A12]">phone/WhatsApp (+91 79085 85003)</strong>{' '}
        or <strong className="text-[#2A1A12]">email (idiotpedals@gmail.com)</strong> with your Order
        ID. Our team will verify your order status and proceed with the cancellation. Once
        dispatched, orders cannot be cancelled.
      </p>
    ),
  },
  {
    title: 'Returns & Exchanges',
    body: (
      <p>
        We do not accept general returns or change-of-mind returns once an order has been delivered.
        However, we provide{' '}
        <strong className="text-[#2A1A12]">
          free exchanges or replacements within 7 days of delivery
        </strong>{' '}
        if your pedal arrives damaged in transit, defective out of the box, or incorrect.
      </p>
    ),
  },
  {
    title: 'How to Initiate an Exchange or Warranty Claim',
    body: (
      <p>
        Reach out to us by{' '}
        <strong className="text-[#2A1A12]">phone/WhatsApp (+91 79085 85003)</strong> or{' '}
        <strong className="text-[#2A1A12]">email (idiotpedals@gmail.com)</strong> (or via our{' '}
        <Link to="/contact" className="text-[#FF5E1E] font-semibold hover:underline">
          Contact page
        </Link>
        ) with your Order ID and unboxing photos/video. From there, our team will complete quick
        order verification and arrange the next steps for your replacement or bench service.
      </p>
    ),
  },
  {
    title: '365-Day Bench Warranty',
    body: (
      <p>
        Every IDIOT Pedals unit is backed by a{' '}
        <strong className="text-[#2A1A12]">1-year (365-day) bench warranty</strong> against
        component or workmanship defects, serviced directly by our builders in Bardhaman.
      </p>
    ),
  },
  {
    title: 'Refund Processing Timeline',
    body: (
      <p>
        For approved pre-dispatch cancellations or verified defective units where a replacement is
        unavailable, refunds are initiated within{' '}
        <strong className="text-[#2A1A12]">2 business days</strong> of verification and credited to
        your original Razorpay payment method within{' '}
        <strong className="text-[#2A1A12]">5–7 business days</strong>.
      </p>
    ),
  },
];

export const RefundPolicyPage: React.FC = () => (
  <PolicyLayout
    seoTitle="Return, Refund & Cancellation Policy"
    seoDescription="Read the IDIOT Pedals policy for 24-hour pre-dispatch cancellations, 7-day free replacements for damaged or defective pedals, 365-day bench warranty, and Razorpay refund timelines."
    canonicalPath="/refund"
    badge="Returns, Refunds & Warranty"
    heading="Return, Refund & Cancellation Policy"
    intro="Straightforward cancellation windows, 7-day transit-damage replacements, 365-day bench warranty coverage, and transparent Razorpay refund timelines."
    sections={SECTIONS}
  />
);

export default RefundPolicyPage;
