import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";

const Login = React.lazy(() => import("./pages/Auth/Login"));
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
const Home = React.lazy(() => import("./pages/Home"));
import { authAtom } from "./context/auth";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/*"
          element={
            <RequiredAuth redirectTo="/i/flow/login">
              <Home />
            </RequiredAuth>
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
  console.log(auth);
  return auth.isAuth ? children : <Navigate to={redirectTo} />;
}

export default App;
