import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="fw-bold text-success mb-4">Privacy Policy</h1>
          <p className="text-muted mb-5">Last Updated: {new Date().toLocaleDateString('en-US')}</p>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">1. Information We Collect</h2>
            <p>
              BitkiRehberi respects your privacy. Currently, we operate as an informational website and <strong>do not require user registration or login.</strong>
            </p>
            <p>However, we may automatically collect certain non-personal information when you visit our site, such as:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Language preference (stored in local storage)</li>
              <li>Time and date of your visit</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">2. Third-Party Services</h2>
            <p>
              Our website interacts with third-party services to provide content. These services may collect their own data (such as IP addresses) when their resources are loaded.
            </p>
            <ul>
              <li>
                <strong>Perenual API:</strong> When you search for a plant, your search query is sent to Perenual's servers to fetch the data. Please refer to Perenual's privacy policy for how they handle API requests.
              </li>
              <li>
                <strong>Unsplash:</strong> Images displayed on our site may be loaded directly from Unsplash's Content Delivery Network (CDN).
              </li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">3. Cookies and Local Storage</h2>
            <p>
              We use minimal local storage technologies solely for functionality:
            </p>
            <ul>
              <li><strong>Language Preference:</strong> We store your selected language (TR, EN, DE, etc.) in your browser's Local Storage to provide a consistent experience across pages.</li>
            </ul>
            <p>We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">4. Data Security</h2>
            <p>
              Since we do not collect personal user data (like names, emails, or passwords), the risk of personal data theft is minimal. However, we strive to use commercially acceptable means to protect the integrity of our website.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We advise you to review this page periodically for any changes.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <br />
              <span className="text-success fw-bold">[Senin E-posta Adresin Buraya]</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}