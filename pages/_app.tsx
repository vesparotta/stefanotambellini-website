import { ThemeProvider } from "next-themes";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Analytics from "../components/analytics";

import "../css/tailwind.css";
import "../css/global.css";

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
