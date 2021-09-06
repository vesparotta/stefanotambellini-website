import { FunctionComponent } from "react";

const Container: FunctionComponent<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`relative z-10 h-screen w-100 container mx-auto px-4 ${className}`}
    >
      <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 h-100 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default Container;
