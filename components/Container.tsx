import { FunctionComponent } from "react";
import SectionContainer from "./SectionContainer";
import ThemeSwitch from "./ThemeSwitch";

const Container: FunctionComponent = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div className="flex items-center text-base leading-5">
            <div>Ciao!</div>

            <ThemeSwitch />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
      </div>
    </SectionContainer>
  );
};

export default Container;
