import { FunctionComponent } from "react";
import siteMetadata from "../data/siteMetadata";
import SocialIcon from "./SimpleIcon";

const iconSize = 3;

/**
 * Footer che inserisco alla base della pagina per indirizzare a tutti i social e inserire dicitura di copyright
 *
 * Attenzione: inserisco più link possibili per incrementare SEO, non sono necessariamente link di interesse!
 */
const Footer: FunctionComponent = () => {
  return (
    <span className="py-2" style={{ display: "inline-block", verticalAlign: "sub" }}>
      <span className="flex space-x-4 justify-around">
        <SocialIcon
          kind="instagram"
          href={siteMetadata.instagram}
          size={iconSize}
        />
        <SocialIcon
          kind="twitter"
          href={siteMetadata.twitter}
          size={iconSize}
        />
        <SocialIcon kind="github" href={siteMetadata.github} size={iconSize} />
        <SocialIcon
          kind="linkedin"
          href={siteMetadata.linkedin}
          size={iconSize}
        />
      </span>
    </span>
  );
};

export default Footer;
