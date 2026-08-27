import { Link } from 'react-router-dom';

export function Tos() {
  return (
    <div className="static-page">
      <h1>Terms of Service</h1>
      <p><em>Last updated: August 2026</em></p>

      <h2>1. What this site is</h2>
      <p>
        NAB Tools provides free online utilities that run in your browser. The tools are
        provided "as is" for general informational and productivity use.
      </p>

      <h2>2. No warranty</h2>
      <p>
        We make no warranties, express or implied, about the accuracy, reliability, or
        fitness of any tool for any purpose. Outputs (passwords, hashes, conversions,
        DNS data, IP data) are provided without guarantee. You are responsible for how
        you use them.
      </p>

      <h2>3. No liability</h2>
      <p>
        To the maximum extent permitted by law, NAB Tools and its operators are not liable
        for any damages arising from use of this site, including lost data, lost revenue,
        or security incidents resulting from tools or generated outputs.
      </p>

      <h2>4. Acceptable use</h2>
      <p>
        Do not use this site to generate content that is unlawful, malicious, or that
        facilitates fraud or harm. We reserve the right to restrict access if the site
        is abused.
      </p>

      <h2>5. Privacy</h2>
      <p>
        Our <Link to="/privacy">Privacy Policy</Link> explains how we handle data. In short:
        tools run locally in your browser, and we do not collect or store your tool inputs.
      </p>

      <h2>6. Changes</h2>
      <p>
        We may update these terms at any time. Continued use of the site after changes
        constitutes acceptance of the revised terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these terms? Reach out via the <Link to="/about">About page</Link>.
      </p>
    </div>
  );
}
