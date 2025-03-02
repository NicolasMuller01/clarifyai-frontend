import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="space-y-4 text-sm text-slate-600">
      {/* Welcome Section */}
      <p>
        Welcome to ClarifyAI ("we," "us," or "our"). These Terms & Conditions
        govern your use of our website, services, and any related content
        (collectively referred to as the "Service"). By accessing or using the
        Service, you agree to be bound by these Terms & Conditions. If you do
        not agree with any part of these terms, you must not use the Service.
      </p>

      {/* 1. Acceptance of Terms */}
      <section>
        <strong>1. Acceptance of Terms</strong>
        <p>By using the Service, you confirm that:</p>
        <ul className="list-disc pl-6">
          <li>
            You are at least 18 years old or have parental consent to use the
            Service.
          </li>
          <li>
            You agree to comply with all applicable laws and regulations while
            using the Service.
          </li>
          <li>
            You will not use the Service for any illegal or unauthorized
            purpose.
          </li>
        </ul>
      </section>

      {/* 2. Use of the Service */}
      <section>
        <strong>2. Use of the Service</strong>
        <p>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms & Conditions. You must not:
        </p>
        <ul className="list-disc pl-6">
          <li>Violate any applicable laws or regulations.</li>
          <li>
            Infringe upon the rights of others, including intellectual property
            rights.
          </li>
          <li>
            Attempt to gain unauthorized access to the Service or its systems.
          </li>
          <li>
            Use the Service to distribute malware, spam, or other harmful
            content.
          </li>
        </ul>
      </section>

      {/* 3. Intellectual Property */}
      <section>
        <strong>3. Intellectual Property</strong>
        <p>
          All content, trademarks, logos, and intellectual property displayed on
          the Service are the property of ClarifyAI or its licensors. You may
          not use, reproduce, or distribute any of this content without prior
          written permission from us.
        </p>
      </section>

      {/* 4. User Accounts */}
      <section>
        <strong>4. User Accounts</strong>
        <p>If you create an account on the Service, you are responsible for:</p>
        <ul className="list-disc pl-6">
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>
            Notifying us immediately of any unauthorized use of your account.
          </li>
        </ul>
      </section>

      {/* 5. Privacy */}
      <section>
        <strong>5. Privacy</strong>
        <p>
          Your use of the Service is also governed by our{" "}
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-500 underline"
          >
            Privacy Policy
          </a>
          , which explains how we collect, use, and protect your personal
          information. By using the Service, you consent to the collection and
          use of your data as described in the Privacy Policy.
        </p>
      </section>

      {/* 6. Limitation of Liability */}
      <section>
        <strong>6. Limitation of Liability</strong>
        <p>To the fullest extent permitted by law:</p>
        <ul className="list-disc pl-6">
          <li>
            We are not liable for any indirect, incidental, special, or
            consequential damages arising out of or in connection with the
            Service.
          </li>
          <li>
            Our total liability for any claims related to the Service shall not
            exceed the amount you paid to use the Service, if any.
          </li>
        </ul>
      </section>

      {/* 7. Indemnification */}
      <section>
        <strong>7. Indemnification</strong>
        <p>
          You agree to indemnify and hold harmless ClarifyAI, its affiliates,
          officers, agents, and employees from any claims, liabilities, damages,
          losses, or expenses arising out of:
        </p>
        <ul className="list-disc pl-6">
          <li>Your use of the Service.</li>
          <li>Your violation of these Terms & Conditions.</li>
          <li>Your infringement of any third-party rights.</li>
        </ul>
      </section>

      {/* 8. Disclaimers */}
      <section>
        <strong>8. Disclaimers</strong>
        <p>
          The Service is provided "as is" and "as available" without warranties
          of any kind, either express or implied, including but not limited to:
        </p>
        <ul className="list-disc pl-6">
          <li>Fitness for a particular purpose.</li>
          <li>Non-infringement.</li>
          <li>Accuracy or completeness of content.</li>
        </ul>
        <p>
          We do not guarantee that the Service will be uninterrupted, secure, or
          error-free.
        </p>
      </section>

      {/* 9. Governing Law */}
      <section>
        <strong>9. Governing Law</strong>
        <p>
          These Terms & Conditions shall be governed by and construed in
          accordance with the laws of [Your Jurisdiction]. Any disputes arising
          out of or in connection with these Terms & Conditions shall be subject
          to the exclusive jurisdiction of the courts of [Your Jurisdiction].
        </p>
      </section>

      {/* 10. Changes to Terms */}
      <section>
        <strong>10. Changes to Terms</strong>
        <p>
          We reserve the right to modify or update these Terms & Conditions at
          any time. Any changes will be effective immediately upon posting on
          the Service. Your continued use of the Service after such changes
          constitutes your acceptance of the updated Terms & Conditions.
        </p>
      </section>

      {/* 11. Termination */}
      <section>
        <strong>11. Termination</strong>
        <p>
          We may terminate or suspend your access to the Service at any time,
          without prior notice or liability, for any reason, including if you
          violate these Terms & Conditions.
        </p>
      </section>

      {/* 12. Entire Agreement */}
      <section>
        <strong>12. Entire Agreement</strong>
        <p>
          These Terms & Conditions constitute the entire agreement between you
          and ClarifyAI regarding your use of the Service and supersede any
          prior agreements.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
