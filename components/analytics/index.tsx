import GA from "./GoogleAnalytics";
import siteMetadata from "../../data/siteMetadata";
import { isProduction } from "../../lib/globals";

const Analytics = () => {
  return (
    <>{isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}</>
  );
};

export default Analytics;
