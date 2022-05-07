import React, { Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "./context/auth";
import { LoadingPage } from "./components/Loading/LoadingPage";
// import Home from "./pages/Home";
const Home = React.lazy(() => import("./pages/Home"));
// import Feed from "./components/Feed/Feed";
const Feed = React.lazy(() => import("./components/Feed/Feed"));
// import Search from "./components/Search/Search";
const Search = React.lazy(() => import("./components/Search/Search"));
// import Profile from "./components/Profile/Profile";
const Profile = React.lazy(() => import("./components/Profile/Profile"));
// import Login from "./pages/Auth/Login";
const Login = React.lazy(() => import("./pages/Auth/Login"));
// import Signup from "./pages/Auth/Signup";
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
// import Follow from "./components/Profile/Follow";
const Follow = React.lazy(() => import("./components/Profile/Follow"));

const ComingSoon = React.lazy(() => import("./components/ComingSoon"));
// import NoMatch from "./components/NoMatch";
const NoMatch = React.lazy(() => import("./components/NoMatch"));

function App() {
  return (
    <div className="app">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route
            path="/"
            element={
              <RequiredAuth redirectTo="/i/flow/login">
                <Home />
              </RequiredAuth>
            }
          >
            <Route path="home" element={<Feed />} />
            <Route path=":username" element={<Profile />} />
            <Route
              path=":username/following"
              element={<Follow keys="following" />}
            />
            <Route
              path=":username/followers"
              element={<Follow keys="followers" />}
            />
            <Route path="search" element={<Search />} />
            <Route path="i/coming" element={<ComingSoon />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route
            path="/i/flow/login"
            element={
              <IsLoggedIn redirectTo="/home">
                <Login />
              </IsLoggedIn>
            }
          />
          <Route
            path="/i/flow/signup"
            element={
              <IsLoggedIn redirectTo="/home">
                <Signup />
              </IsLoggedIn>
            }
          />
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

function IsLoggedIn({ children, redirectTo }: RequiredAuthProps) {
  const auth = useRecoilValue(authAtom);
  return auth.auth ? <Navigate to={redirectTo} /> : children;
}

export default App;
