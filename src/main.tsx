import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import ViewportProvider from "./context/viewportContext";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import "@arco-design/web-react/dist/css/arco.css";
import '@icon-park/react/styles/index.css';

// const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
//
// darkThemeMq.addListener(e => {
//   if (e.matches) {
//     document.body.setAttribute('arco-theme', 'dark');
//   } else {
//     document.body.removeAttribute('arco-theme');
//   }
// });

document.body.setAttribute('arco-theme', 'dark');

ReactDOM.render(
  // <React.StrictMode>
  <ViewportProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </RecoilRoot>
  </ViewportProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
