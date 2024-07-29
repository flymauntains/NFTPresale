import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Bootstrap Latest compiled and minified CSS  */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/react-modal-video@1.2.9/css/modal-video.min.css"
          />

          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />

              {/* Standard favicon */}
              <link rel="icon" href="/favicon.ico" />
              {/* Apple Touch Icon (iOS) */}
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              {/* Android Chrome Icon */}
              <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/android-chrome-192x192.png"
              />
              {/* Android Chrome Icon (maskable) */}
              <link
                rel="icon"
                type="image/png"
                sizes="512x512"
                href="/android-chrome-512x512.png"
              />
              {/* Shortcut icon (for older versions of iOS) */}
              <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
              {/* Manifest for Web App (Chrome, Firefox, Opera) */}
              {/* <link rel="manifest" href="/site.webmanifest" /> */}
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
          );
  }
}
