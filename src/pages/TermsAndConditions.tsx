import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-24 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-black mb-2">Terms and Conditions</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-4 px-6 md:px-24">
        <div className="max-w-4xl mx-auto font-body text-white/80 leading-relaxed space-y-6">
          <p className="text-white/60">Last updated: February 13, 2026</p>
          
          <p>Please read these terms and conditions carefully before using Our Service.</p>

          <div className="space-y-2">
            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Interpretation and Definitions</h2>
              
              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-display font-black mb-1 text-white">Interpretation</h3>
                  <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black mb-2 text-white">Definitions</h3>
                  <p className="mb-2">For the purposes of these Terms and Conditions:</p>
                  <ul className="space-y-3 list-disc list-inside">
                    <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                    <li><strong>Country</strong> refers to: Florida, United States</li>
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in these Terms and Conditions) refers to aipowersense.com.</li>
                    <li><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Terms and Conditions</strong> (also referred to as "Terms") means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.</li>
                    <li><strong>Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.</li>
                    <li><strong>Website</strong> refers to aipowersense.com, accessible from <a href="http://aipowersense.com/" target="_blank" className="text-purple-400 hover:text-purple-300 underline">http://aipowersense.com/</a></li>
                    <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Acknowledgment</h2>
              <div className="space-y-2">
                <p>These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
                <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
                <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
                <p>Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Links to Other Websites</h2>
              <div className="space-y-2">
                <p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.</p>
                <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.</p>
                <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.</p>

                <div>
                  <h3 className="text-lg font-display font-black mb-1 text-white">Links from a Third-Party Social Media Service</h3>
                  <p className="mb-2">The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.</p>
                  <p>You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Termination</h2>
              <div className="space-y-2">
                <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                <p>Upon termination, Your right to use the Service will cease immediately.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Limitation of Liability</h2>
              <div className="space-y-2">
                <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
                <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
                <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
              <div className="space-y-2">
                <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.</p>
                <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied regarding the operation or availability of the Service, or that the Service will be uninterrupted or error-free, or as to the accuracy, reliability, or currency of any information or content provided through the Service.</p>
                <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Governing Law</h2>
              <p>The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Disputes Resolution</h2>
              <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">For European Union (EU) Users</h2>
              <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">United States Legal Compliance</h2>
              <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Severability and Waiver</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="text-lg font-display font-black mb-1 text-white">Severability</h3>
                  <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
                </div>
                <div>
                  <h3 className="text-lg font-display font-black mb-1 text-white">Waiver</h3>
                  <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Translation Interpretation</h2>
              <p>These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.</p>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Changes to These Terms and Conditions</h2>
              <div className="space-y-2">
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
                <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-black mb-2 text-white">Contact Us</h2>
              <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
              <ul className="list-disc list-inside mt-3 ml-2 space-y-1">
                <li>By email: team@aipowersense.com</li>
                <li>By phone: +1 323-662-8601</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
