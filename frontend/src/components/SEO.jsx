import Head from "next/head";
import Config from "src/settings/config";
import image from "src/assets/images/linkshow.jpg";

export default function SEO({ title }) {
  return (
    <Head>
      <title>{`${title}`}</title>
      <meta name="description" content={Config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={Config.description} />
      <meta property="og:site_name" content={Config.siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={Config.social.twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={Config.description} />
      <meta property="telegram:card" content="summary" />
      <meta property="telegram:creator" content={Config.social.telegram} />
      <meta property="telegram:title" content={title} />
      <meta property="telegram:description" content={Config.description} />
      <meta property="og:image" content={image.src} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="400" />
    </Head>
  );
}
