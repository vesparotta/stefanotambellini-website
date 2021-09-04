import siteMetadata from "../data/siteMetadata";

const CopyrightWording = () => {
  return (
    <span>{`Copyright © ${new Date().getFullYear()} · ${
      siteMetadata.author
    } · Tutti i diritti riservati.`}</span>
  );
};

export default CopyrightWording;
