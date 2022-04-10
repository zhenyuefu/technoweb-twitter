import { atom, RecoilState } from "recoil";

interface IAuth {
  isAuth: boolean;
  id: string;
  username: string;
}

const info = fetch(`${process.env.API_BASE_URL}/api/auth`, {
  credentials: "include",
}).then((res) => {
  return res.json();
});

const authAtom: RecoilState<IAuth> = atom({
  key: "auth",
  default: info.then((data) => {
    return {
      isAuth: data.isAuth,
      id: data.id,
      username: data.username,
    };
  }),
});

export { authAtom };
