import { FunctionComponent } from "react";
import Facebook from "../assets/social-icons/facebook.svg";
import Github from "../assets/social-icons/github.svg";
import Instagram from "../assets/social-icons/instagram.svg";
import Linkedin from "../assets/social-icons/linkedin.svg";
import Twitter from "../assets/social-icons/twitter.svg";
import Youtube from "../assets/social-icons/youtube.svg";

// https://simpleicons.org/

const components = {
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export interface SocialIconProps {
  kind: string;
  href: string;
  size: number;
}

const SocialIcon: FunctionComponent<SocialIconProps> = ({
  kind,
  href,
  size = 8,
}: {
  kind: string;
  href: string;
  size: number;
}) => {
  if (!href) {
    return null;
  }

  //@ts-ignore
  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm transition"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      style={{ display: "inline-block" }}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        height={Math.floor(size * 10)}
        width={Math.floor(size * 10)}
        className={`fill-current hover:text-blue-500 dark:hover:text-blue-400`}
      />
    </a>
  );
};

export default SocialIcon;
