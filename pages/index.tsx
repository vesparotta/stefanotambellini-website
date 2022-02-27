import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CustomLink from "../components/CustomLink";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
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

    setLocale(browserLocale);

    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="p-8 pt-36 sm:p-12 md:p-16 lg:p-24">
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
                    {messages.ciaoSono[locale]}{" "}
                    <span
                      style={{
                        backgroundImage: "url(./curcuma.jpeg)",
                        backgroundColor: "rgb(255,180,4)",
                        backgroundBlendMode: "saturation",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        padding: "0.1em",
                      }}
                    >
                      Stefano
                    </span>
                  </PageTitle>

                  <br />

                  <div className="text-2xl md:text-4xl leading-tight sm:leading-snug tracking-tight whitespace-pre-line">
                    <p>{messages.presentazione[locale]}</p>

                    <br />

                    <p>
                      <span>
                        {messages.contattamiA[locale]}
                        {": "}
                      </span>
                      <CustomLink href={`mailto:${siteMetadata.email}`}>
                        {siteMetadata.email}
                      </CustomLink>
                    </p>
                  </div>

                  <br />
                  <br />

                  <div className="text-xl md:text-3xl leading-tight sm:leading-snug tracking-tight whitespace-pre-line">
                    <p>
                      <span className="mr-1">
                        {messages.puoiAncheSeguirmiA[locale]}
                        {": "}
                      </span>

                      <Footer />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="z-50 fixed bottom-10 right-10">
            <ThemeSwitcher />
          </div> */}
        </div>
      )}
    </>
  );
};

export default Home;
