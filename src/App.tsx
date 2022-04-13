import React, { Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import { authAtom } from "./context/auth";
import { LoadingPage } from "./components/Loading/LoadingPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <RequiredAuth redirectTo="/i/flow/login">
                <Home />
              </RequiredAuth>
            </Suspense>
          }
        >
          <Route path="home" element={<Feed />} />
          <Route path=":username" element={<Profile />} />
        </Route>
        <Route path="/i/flow/login" element={<Login />} />
        <Route path="/i/flow/signup" element={<Signup />} />
      </Routes>
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
