import { FunctionComponent } from "react";
import siteMetadata from "../data/siteMetadata";
import CopyrightWording from "./CopyrightWording";
import SocialIcon from "./SimpleIcon";
import ThemeSwitch from "./ThemeSwitch";

/**
 * Footer che inserisco alla base della pagina per indirizzare a tutti i social e inserire dicitura di copyright
 *
 * Attenzione: inserisco più link possibili per incrementare SEO, non sono necessariamente link di interesse!
 */
const Footer: FunctionComponent = () => {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>

        {/* <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <CopyrightWording></CopyrightWording>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
