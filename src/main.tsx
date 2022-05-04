import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./App";
import ViewportProvider from "./context/viewportContext";

import "./style/index.css";
import "@arco-design/web-react/dist/css/arco.css";
import "@icon-park/react/styles/index.css";
import { ConfigProvider } from "@arco-design/web-react";
import enUS from "@arco-design/web-react/es/locale/en-US";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

const colorName = "blue";

Array.from({ length: 10 }).forEach((_, index) => {
  document.body.style.setProperty(
    `--primary-${index + 1}`,
    `var(--${colorName}-${index + 1})`
  );
});

// const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
//
// if (darkThemeMq.matches) {
//   document.body.setAttribute('arco-theme', 'dark');
// } else {
//   document.body.removeAttribute('arco-theme');
// }

root.render(
  // <React.StrictMode>
  <ConfigProvider locale={enUS}>
    <ViewportProvider>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </ViewportProvider>
  </ConfigProvider>
  // </React.StrictMode>
);
