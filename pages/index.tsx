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
        className="flex flex-col justify-end align-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        style={{
          height: height?.toString() + "px",
          isolation: "isolate",
          willChange: "opacity",
        }}
      >
        <WebGL />

        <div
          className="mix-blend-exclusion fixed z-30 w-100 container mx-auto p-4 pb-12 sm:p-8 md:p-12 lg:p-18 xl:pb-24 xl:p-32 box-shadow"
          style={{ willChange: "opacity" }}
        >
          <div
            className="antialiased text-gray-100"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.10)",
            }}
          >
            <main className="mb-auto md:max-w-4xl">
              <div>
                <div className="xs:pt-10 md:pt-8">
                  <PageTitle>
                    Ciao, sono <span className="text-yellow-600">Stefano</span>
                  </PageTitle>

                  <br />

                  <div className="text-2xl md:text-4xl leading-tight sm:leading-snug tracking-tighter whitespace-pre-line">
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
