import Link from "next/link";
import { FunctionComponent } from "react";

export interface CustomLinkProps {
  href: string;
}

const CustomLink: FunctionComponent<CustomLinkProps> = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className="underline text-blue-600 hover:text-blue-800" {...rest} />
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a
        className="underline text-blue-600 hover:text-blue-800"
        href={href}
        {...rest}
      />
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 font-extralight"
      style={{ fontStyle: "italic", fontFamily: "CustomSans-Medium" }}
      href={href}
      {...rest}
    ></a>
  );
};

export default CustomLink;
