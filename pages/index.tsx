import type { NextPage } from "next";
import Footer from "../components/Footer";
import LayoutWrapper from "../components/Container";
import Container from "../components/Container";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4">
      <Container>
        <div>Sono Stefano!</div>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
