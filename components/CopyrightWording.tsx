import { FunctionComponent } from "react";
import siteMetadata from "../data/siteMetadata";

const CopyrightWording: FunctionComponent = () => {
  return (
    <span>{`Copyright © ${new Date().getFullYear()} · ${
      siteMetadata.author
    } · Tutti i diritti riservati.`}</span>
  );
};

export default CopyrightWording;
