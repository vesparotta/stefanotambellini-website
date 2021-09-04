import { FunctionComponent } from "react";

const Container: FunctionComponent = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
        {children}
      </div>
    </div>
  );
};

export default Container;
