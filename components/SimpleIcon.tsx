import Mail from "../assets/social-icons/mail.svg";
import Github from "../assets/social-icons/github.svg";
import Facebook from "../assets/social-icons/facebook.svg";
import Youtube from "../assets/social-icons/youtube.svg";
import Linkedin from "../assets/social-icons/linkedin.svg";
import Twitter from "../assets/social-icons/twitter.svg";
import Instagram from "../assets/social-icons/instagram.svg";
import { FunctionComponent } from "react";

// https://simpleicons.org/

const components = {
  mail: Mail,
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
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  //@ts-ignore
  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm transition"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  );
};

export default SocialIcon;
