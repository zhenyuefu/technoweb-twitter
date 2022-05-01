import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";

import App from "./App";
import ViewportProvider from "./context/viewportContext";

import "./style/index.css";
import "@arco-design/web-react/dist/css/arco.css";
import '@icon-park/react/styles/index.css';

const container = document.getElementById("root") as Element;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ViewportProvider>
      <RecoilRoot>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </RecoilRoot>
    </ViewportProvider>
  </React.StrictMode>
);


