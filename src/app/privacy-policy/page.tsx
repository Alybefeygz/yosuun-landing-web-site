import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | WP_AGENT",
  description:
    "Privacy Policy for WP_AGENT WhatsApp messaging automation and webhook processing services.",
};

const processedData = [
  "WhatsApp phone numbers",
  "Incoming message content",
  "Outgoing message content",
  "Message timestamps",
  "Message IDs",
  "Conversation metadata",
  "Message delivery statuses such as sent, delivered, read, or failed",
  "WhatsApp webhook event payloads",
  "Technical logs required for debugging and service reliability",
  "Business account, phone number, and integration identifiers required to operate the service",
];

const usagePurposes = [
  "Receiving inbound WhatsApp messages",
  "Sending outbound WhatsApp messages",
  "Processing message delivery statuses",
  "Maintaining conversation history",
  "Routing messages to the correct business workflow",
  "Supporting automated replies and customer communication",
  "Debugging webhook and API delivery issues",
  "Securing and monitoring the messaging service",
  "Improving service reliability and operational performance",
];

const serviceProviders = [
  "Meta / WhatsApp Business Platform",
  "Cloud hosting providers",
  "Database providers",
  "Logging and monitoring systems",
  "Backend infrastructure used to deliver the messaging service",
];

const securityMeasures = [
  "Secure webhook endpoints",
  "Server-side request validation",
  "Access controls",
  "Environment-based secret management",
  "Backend logging and monitoring",
  "Restricted access to production systems",
];

function Section({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-950 sm:text-2xl">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base">{children}</div>
    </section>
  );
}

function BulletList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
        <nav className="mb-10 flex items-center justify-between border-b border-slate-200 pb-5">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Back to Yosuun
          </Link>
        </nav>

        <header className="mb-10 pb-8 sm:mb-12 sm:pb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            WP_AGENT
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy / Gizlilik Politikası
          </h1>
          <p className="mt-5 text-sm text-slate-600 sm:text-base">
            Last updated: 28 June 2026
          </p>
        </header>

        <article className="space-y-10">
          <p className="text-base leading-8 text-slate-700 sm:text-lg">
            This Privacy Policy explains how WP_AGENT processes information when
            providing WhatsApp messaging automation, webhook processing, customer
            communication, and related backend services.
          </p>

          <Section title="1. Who We Are">
            <p>
              WP_AGENT is a WhatsApp messaging automation service designed to help
              businesses receive, process, and respond to WhatsApp messages through
              Meta&apos;s WhatsApp Business Platform.
            </p>
            <p>
              For privacy-related questions, you can contact us at{" "}
              <a
                href="mailto:info@yosuun.com.tr"
                className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950"
              >
                info@yosuun.com.tr
              </a>
              .
            </p>
          </Section>

          <Section title="2. Information We May Process">
            <p>When WP_AGENT is used, we may process the following types of information:</p>
            <BulletList items={processedData} />
          </Section>

          <Section title="3. How We Use Information">
            <p>We use this information only for the following purposes:</p>
            <BulletList items={usagePurposes} />
          </Section>

          <Section title="4. WhatsApp and Meta Webhook Data">
            <p>
              WP_AGENT may receive webhook events from Meta&apos;s WhatsApp Business
              Platform. These events may include incoming messages, message status
              updates, delivery confirmations, read receipts, failed message events,
              and related technical metadata.
            </p>
            <p>
              This data is processed only to operate the WhatsApp messaging workflow
              and to support the business communication service.
            </p>
          </Section>

          <Section title="5. Data Sharing">
            <p>We do not sell personal data.</p>
            <p>
              We may process or share data only with service providers and technical
              infrastructure required to operate the service, such as:
            </p>
            <BulletList items={serviceProviders} />
            <p>
              These providers are used only as necessary to operate, secure, debug,
              and maintain the service.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain message data, webhook events, logs, and conversation records
              only as long as necessary for operational, support, security, debugging,
              legal, or service continuity purposes.
            </p>
            <p>
              Retention periods may vary depending on the business use case,
              technical requirements, and applicable legal obligations.
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We use reasonable technical and organizational measures to protect data
              processed by WP_AGENT. These may include:
            </p>
            <BulletList items={securityMeasures} />
            <p>However, no system can guarantee absolute security.</p>
          </Section>

          <Section title="8. User Rights and Data Requests">
            <p>
              Users may request access, correction, or deletion of their personal
              data by contacting us.
            </p>
            <p>
              Requests can be sent to{" "}
              <a
                href="mailto:info@yosuun.com.tr"
                className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950"
              >
                info@yosuun.com.tr
              </a>
              .
            </p>
            <p>
              If a user requests deletion of their WhatsApp-related data, we will
              review the request and delete or anonymize applicable records unless
              retention is required for legal, security, or legitimate operational
              reasons.
            </p>
          </Section>

          <Section title="9. Children&apos;s Privacy">
            <p>
              WP_AGENT is not intended for use by children. We do not knowingly
              collect personal data from children.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Updates will be
              posted on this page with a revised &quot;Last updated&quot; date.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>For questions about this Privacy Policy or data processing, contact:</p>
            <p>
              <a
                href="mailto:info@yosuun.com.tr"
                className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950"
              >
                info@yosuun.com.tr
              </a>
            </p>
          </Section>

          <Section title="12. Applicable Law and Local Privacy Rights">
            <p>
              Depending on the location of the business and users, applicable data
              protection laws may include local privacy regulations such as the
              Turkish Personal Data Protection Law, also known as KVKK, and other
              relevant data protection rules.
            </p>
            <p>
              Users may contact us to request access, correction, deletion, or
              information about the processing of their personal data.
            </p>
            <p>Requests can be sent to:</p>
            <p>
              <a
                href="mailto:info@yosuun.com.tr"
                className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950"
              >
                info@yosuun.com.tr
              </a>
            </p>
          </Section>
        </article>
      </div>
    </main>
  );
}
