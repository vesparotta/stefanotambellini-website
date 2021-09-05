import type { NextPage } from "next";
import Footer from "../components/Footer";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import ThemeSwitch from "../components/ThemeSwitch";
import CustomLink from "../components/CustomLink";
import siteMetadata from "../data/siteMetadata";

const Home: NextPage = () => {
  return (
    <Container>
      <div className="pt-5 flex flex-row-reverse">
        <ThemeSwitch />
      </div>

      <div className="flex flex-col glass">
        <main className="mb-auto">
          <div className="mix-blend-exclusion">
            <div className="xs:pt-10 md:pt-8">
              <PageTitle>Ciao!</PageTitle>
              <div className="pt-5 sm:text-xl md:text-4xl leading-9 sm:leading-10 md:leading-14 tracking-tight">
                <p>
                  Sono{" "}
                  <span className="text-yellow-600">Stefano Tambellini</span>
                  , un web designer e sviluppatore software con sede a Lucca, in
                  Toscana.
                  <br />
                  Mi piacciono l'arte digitale, la pizza capricciosa e i
                  videogiochi indipendenti.
                </p>

                <br />

                <p>
                  Sono sempre alla ricerca di progetti interessanti e di
                  ispirazione!
                  <br />
                  Se vuoi collaborare con me o fare due chiacchiere{" "}
                  <CustomLink href={`mailto:${siteMetadata.email}`}>
                    contattami
                  </CustomLink>
                  , sarò più che felice di risponderti!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </Container>
  );
};

export default Home;
