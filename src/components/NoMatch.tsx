import React from "react";
import { Button, Result } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();
  return (
    <Result
      style={{ marginTop: "80px" }}
      status="404"
      title="Hmm...this page doesn’t exist."
      subTitle="Try searching for something else."
      extra={[
        <Button
          key="back"
          type="primary"
          shape="round"
          onClick={() => navigate("/search")}
        >
          Search
        </Button>,
      ]}
    />
  );
}

export default NoMatch;
