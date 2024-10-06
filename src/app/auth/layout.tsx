import React from "react";

interface authtype {
  children: React.ReactNode;
}

const layout = ({ children }: authtype) => {
  return <div>{children}</div>;
};

export default layout;
