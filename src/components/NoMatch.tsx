import React from "react";
import { Button, Result } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="404"
        subTitle="Hmm...this page doesn’t exist. Try searching for something else."
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
      ></Result>
    </div>
  );
}

export default NoMatch;
