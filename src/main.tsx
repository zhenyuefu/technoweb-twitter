import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import ViewportProvider from "./context/viewportContext";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  // <React.StrictMode>
  <ViewportProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </ViewportProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
