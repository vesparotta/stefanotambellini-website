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
      <div className="flex z-50 fixed">
        <ThemeSwitch />
      </div>

      <div
        className="flex flex-col justify-end align-center"
        style={{
          height: height?.toString() + "px",
        }}
      >
        <WebGL />

        <div className="w-100 container mx-auto pl-4 pb-12 sm:pl-8 xl:pb-24 xl:pl-32">
          <div className="antialiased">
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
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
