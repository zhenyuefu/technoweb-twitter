import React from "react";
import {Spin} from "@arco-design/web-react";

export const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin dot size={40}/>
    </div>
  );
};
