import type { NextPage } from "next";
import Footer from "../components/Footer";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import ThemeSwitch from "../components/ThemeSwitch";
import CustomLink from "../components/CustomLink";
import siteMetadata from "../data/siteMetadata";
import WebGL from "../components/WebGL";

const Home: NextPage = () => {
  return (
    <>
      <WebGL />

      <Container>
        <div className="pt-5 flex flex-row-reverse">
          <ThemeSwitch />
        </div>

        <div
          className="flex flex-col mix-blend-exclusion text-gray-100"
          style={{
            willChange: "opacity",
          }}
        >
          <main className="mb-auto md:w-4/6">
            <div>
              <div className="xs:pt-10 md:pt-8">
                <PageTitle>Ciao!</PageTitle>
                <div className="pt-5 text-2xl md:text-4xl leading-tight sm:leading-snug tracking-tight">
                  <p>
                    Sono{" "}
                    <span className="text-yellow-600">Stefano Tambellini</span>
                    , un web designer e sviluppatore software con sede a Lucca.
                    <br />
                    Mi piacciono l'arte digitale, la pizza capricciosa e i
                    videogiochi indipendenti.
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
      </Container>
    </>
  );
};

export default Home;
