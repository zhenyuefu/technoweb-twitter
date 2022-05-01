import React from "react";
import "./style/index.css";
import App from "./App";
import ViewportProvider from "./context/viewportContext";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import "@arco-design/web-react/dist/css/arco.css";
import '@icon-park/react/styles/index.css';

import {createRoot} from "react-dom/client";

const container = document.getElementById("root") as Element;
const root = createRoot(container);
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

darkThemeMq.addListener(e => {
  if (e.matches) {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
});
root.render(
  // <React.StrictMode>
  <ViewportProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </RecoilRoot>
  </ViewportProvider>
  // </React.StrictMode>
);
