import "../css/tailwind.css";
import "../css/global.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";

import Analytics from "../components/analytics";
import { AppProps } from "next/dist/shared/lib/router/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
