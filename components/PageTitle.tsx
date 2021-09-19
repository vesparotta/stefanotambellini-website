import { FunctionComponent } from "react";

const PageTitle: FunctionComponent = ({ children }) => {
  return (
    <h1 className="text-4xl font-extrabold leading-9 tracking-tighter sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children}
    </h1>
  );
};

export default PageTitle;
