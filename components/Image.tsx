import NextImage, { ImageProps } from "next/image";
import { FunctionComponent } from "react";

const CustomImage: FunctionComponent<ImageProps> = ({ ...rest }) => (
  <NextImage {...rest} />
);

export default CustomImage;
