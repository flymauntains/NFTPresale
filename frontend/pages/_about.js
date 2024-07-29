// pages/about.js

import Layout from "../src/components/Layout.jsx";
import SEO from "../src/components/SEO.jsx";


export default function AboutPage() {
  return (
    <Layout>
      <SEO title="About Us" />
      <div>
        <h1>About Us</h1>
        <p>This is the about page.</p>
      </div>
    </Layout>
  );
}