import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CustomLink from "../components/CustomLink";
import { SocialLinks } from "../components/Footer";
import PageTitle from "../components/PageTitle";
import ThemeSwitcher from "../components/ThemeSwitch";
import WebGL from "../components/WebGL";
import messages from "../data/messages";
import siteMetadata from "../data/siteMetadata";

const Home: NextPage = () => {
  let [locale, setLocale] = useState("en");
  let [mounted, setMounted] = useState(false);

  useEffect(function onFirstMount() {
    let browserLocale = window.navigator.language.split("-")[0];

    if (browserLocale !== "it") {
      browserLocale = "en";
    }

    // Resetto il tema all'avvio
    localStorage.removeItem("themeStorageKey");

    setLocale(browserLocale);

    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="relative p-4 pt-36 sm:p-12 md:p-16 lg:p-24 break-words overflow-hidden">
          <div>
            <WebGL />

            <div
              className="relative z-30"
              style={{
                minHeight: "min-content",
              }}
            >
              <div
                className="antialiased"
                style={{
                  textShadow: "0 2px 4px rgba(255,255,255,0.10)",
                }}
              >
                <div className="md:max-w-4xl">
                  <PageTitle>
                    {/* {messages.ciaoSono[locale]}{" "} */}
                    <span>Stefano{"\n"}Tambellini</span>
                  </PageTitle>

                  <br />

                  <div className="text-xs xs:text-base sm:text-xl md:text-2xl leading-tight sm:leading-snug tracking-tight whitespace-pre-line">
                    <p>{messages.presentazione[locale]}</p>

                    <br />

                    <p>
                      <span>
                        {messages.contattamiA[locale]}
                        {":\n"}
                      </span>
                      <CustomLink href={`mailto:${siteMetadata.email}`}>
                        {siteMetadata.email}
                      </CustomLink>
                    </p>
                  </div>

                  <br />
                  <br />

                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="z-50 fixed bottom-10 right-10">
              <ThemeSwitcher />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
