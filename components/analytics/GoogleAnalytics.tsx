import Script from "next/script";
import siteMetadata from "../../data/siteMetadata";

declare global {
  interface Window {
    gtag: any;
  }
}

const GAScript = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
      />

      <Script strategy="lazyOnload" id="googleTagLoader">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.analytics.googleAnalyticsId}');
        `}
      </Script>
    </>
  );
};

export default GAScript;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (
  action: string,
  category: string,
  label: string,
  value: number
) => {
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
