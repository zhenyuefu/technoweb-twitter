import { atom, RecoilState } from "recoil";

interface IAuth {
  username: string;
  email: string;
  token: string;
}

const authAtom: RecoilState<IAuth> = atom({
  key: "auth",
  default: JSON.parse(localStorage.getItem("auth") || "null"),
});

export { authAtom };
