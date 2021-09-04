import type { NextPage } from "next";
import Footer from "../components/Footer";
import Container from "../components/Container";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";

const Home: NextPage = () => {
  return (
    <Container>
      <Main>
        <PageTitle>Ciao!</PageTitle>
        <div className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Sono Stefano.
        </div>
      </Main>

      <Footer />
    </Container>
  );
};

export default Home;
