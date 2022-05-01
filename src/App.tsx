import React, {Suspense, useEffect} from "react";

import {Navigate, Route, Routes} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {authAtom} from "./context/auth";
import {LoadingPage} from "./components/Loading/LoadingPage";

// import Feed from "./components/Feed/Feed";
const Feed = React.lazy(() => import("./components/Feed/Feed"));
// import Profile from "./components/Profile/Profile";
const Profile = React.lazy(() => import("./components/Profile/Profile"));
// import Login from "./pages/Auth/Login";
const Login = React.lazy(() => import("./pages/Auth/Login"));
// import Signup from "./pages/Auth/Signup";
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
// import Home from "./pages/Home";
const Home = React.lazy(() => import("./pages/Home"));

function App() {

  useEffect(() => {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

      darkThemeMq.addListener(e => {
        if (e.matches) {
          document.body.setAttribute('arco-theme', 'dark');
        } else {
          document.body.removeAttribute('arco-theme');
        }
      });
    }
    , []);

  return (
    <div className="app">
      <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route
            path="/*"
            element={
              <RequiredAuth redirectTo="/i/flow/login">
                <Home/>
              </RequiredAuth>
            }
          >
            <Route path="home" element={<Feed />} />
            <Route path=":username" element={<Profile />} />
          </Route>
          <Route path="/i/flow/login" element={<Login />} />
          <Route path="/i/flow/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </div>
  );
}

type RequiredAuthProps = {
  redirectTo: string;
  children: JSX.Element;
};

function RequiredAuth({ children, redirectTo }: RequiredAuthProps) {
  const auth = useRecoilValue(authAtom);
  return auth.auth ? children : <Navigate to={redirectTo} />;
}

export default App;
