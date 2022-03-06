import { ThemeProvider } from "next-themes";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Analytics from "../components/analytics";

import "../css/tailwind.css";
import "../css/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      storageKey="themeStorageKey"
    >
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Stefano Tambellini" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stefanotambellini.it" />
        <meta
          property="og:image"
          content="https://stefanotambellini.it/og_image.jpg"
        />
        <meta
          property="og:description"
          content="Glad for now, grateful for ever"
        />

        <meta name="twitter:card" content="summary" />

        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>

        <title>Stefano Tambellini</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#da532c" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
