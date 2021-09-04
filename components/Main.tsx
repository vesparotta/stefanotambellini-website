import { FunctionComponent } from "react";

const Main: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col">
      <main className="mb-auto">{children}</main>
    </div>
  );
};

export default Main;
