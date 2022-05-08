import { Result } from "@arco-design/web-react";
import React from "react";

const ComingSoon = () => {
  return (
    <Result
      style={{
        marginTop: "80px",
        maxWidth: "650px",
      }}
      status="404"
      title="Whoops, This page is under development and will be coming soon..."
    />
  );
};

export default ComingSoon;
