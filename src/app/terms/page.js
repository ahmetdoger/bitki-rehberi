import React from 'react';

export default function TermsPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="fw-bold text-success mb-4">Terms of Use</h1>
          <p className="text-muted mb-5">Last Updated: {new Date().toLocaleDateString('en-US')}</p>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">1. Introduction</h2>
            <p>
              Welcome to <strong>BitkiRehberi</strong> ("we," "our," or "us"). By accessing or using our website, 
              you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">2. Disclaimer of Botanical and Medical Information</h2>
            <div className="alert alert-warning border-0 shadow-sm">
              <strong>Important Warning:</strong> The content provided on BitkiRehberi is for educational and informational purposes only.
            </div>
            <p>
              We are not professionals, botanists, or medical doctors. While we strive to provide accurate data:
            </p>
            <ul>
              <li><strong>Do not eat</strong> or use any plant for medicinal purposes based solely on information found on this website.</li>
              <li>Many plants can be toxic, poisonous, or cause allergic reactions.</li>
              <li>Always consult a professional botanist or a medical expert before interacting with unknown plants.</li>
            </ul>
            <p>
              We disclaim all liability for any injuries, illnesses, or damages resulting from the use or misuse of information contained on this website.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">3. Data Sources and Attribution</h2>
            <p>
              Our plant database relies on third-party APIs and services. We explicitly acknowledge the following:
            </p>
            <ul>
              <li>
                <strong>Plant Data:</strong> Core botanical data (scientific names, watering cycles, sunlight requirements) is provided by the <a href="https://perenual.com/" target="_blank" rel="noopener noreferrer" className="text-success">Perenual API</a>. We do not claim ownership of this raw data.
              </li>
              <li>
                <strong>Images:</strong> Plant images are sourced from the Perenual API and/or <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="text-success">Unsplash</a>. All images remain the intellectual property of their respective creators or license holders.
              </li>
            </ul>
            <p>
              We make no warranties regarding the accuracy, completeness, or reliability of the data provided by these third-party services.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">4. Intellectual Property</h2>
            <p>
              The design, layout, logo, code, and custom translations of BitkiRehberi are our proprietary property. 
              You may not copy, reproduce, or distribute our website's structure without prior written permission.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the website following any changes signifies your acceptance of the new terms.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold text-dark">6. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms of Use, please contact us at: <br />
              <span className="text-success fw-bold">[Senin E-posta Adresin Buraya]</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}