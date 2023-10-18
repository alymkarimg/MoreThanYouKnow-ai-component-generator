import "../styles/globals.css";
import "../styles/animations.css";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
