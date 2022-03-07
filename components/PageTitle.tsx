import { FunctionComponent } from "react";

const PageTitle: FunctionComponent = ({ children }) => {
  return (
    <h1 className="font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl sm:leading-10 md:leading-14">
      {children}
    </h1>
  );
};

export default PageTitle;
