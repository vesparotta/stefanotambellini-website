import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/Karla/Karla-VariableFont_wght.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Karla/Karla-Italic-VariableFont_wght.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>

        <body className="bg-gray-100 dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
