import type { NextPage } from "next";
import Footer from "../components/Footer";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import ThemeSwitch from "../components/ThemeSwitch";
import CustomLink from "../components/CustomLink";
import siteMetadata from "../data/siteMetadata";
import WebGL from "../components/WebGL";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [height, setHeight] = useState<number | null>();

  useEffect(() => {
    setHeight(document.documentElement?.clientHeight || window.innerHeight);

    window.addEventListener("resize", () => {
      setHeight(document.documentElement?.clientHeight || window.innerHeight);
    });
  }, []);

  return (
    <>
      <div className="z-50 fixed p-6">
        <ThemeSwitch />
      </div>

      <div
        className="overflow-auto w-100 bg-gray-100 dark:bg-gray-900"
        style={{
          height: height?.toString() + "px",
          isolation: "isolate",
          willChange: "opacity",
        }}
      >
        <WebGL />

        <div
          className="mix-blend-exclusion relative z-30 pt-56 sm:pt-60 md:pt-72 xl:pt-80 landscape:pt-10 px-4 sm:px-8 md:px-20 lg:px-18 xl:px-48"
          style={{
            minHeight: "min-content",
            willChange: "opacity",
          }}
        >
          <div
            className="antialiased text-gray-100"
            style={{
              textShadow: "0 2px 4px rgba(255,255,255,0.10)",
            }}
          >
            <main className="md:max-w-4xl">
              <div>
                <div>
                  <PageTitle>
                    Ciao, sono <span className="text-yellow-600">Stefano</span>
                  </PageTitle>

                  <br />

                  <div className="text-2xl sm:text-3xl md:text-4xl leading-tight sm:leading-snug tracking-tighter whitespace-pre-line">
                    <p>
                      Sono un web designer e sviluppatore software di Lucca.
                      <br />
                      Amo l'arte digitale, la pizza capricciosa e i videogiochi
                      indipendenti.
                    </p>

                    <br />

                    <p>
                      Sono sempre alla ricerca di progetti interessanti e
                      d'ispirazione!
                      <br />
                      Se vuoi collaborare con me o fare due chiacchiere{" "}
                      <CustomLink href={`mailto:${siteMetadata.email}`}>
                        contattami!
                      </CustomLink>
                    </p>
                  </div>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
