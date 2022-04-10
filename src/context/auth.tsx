import { atom, RecoilState } from "recoil";

interface IAuth {
  isAuth: boolean;
  id: string;
  username: string;
}

const info = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth`, {
  credentials: "include",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((err) => {
    console.log(err);
    return { isAuth: false };
  });

const authAtom: RecoilState<IAuth> = atom({
  key: "auth",
  default: {
    isAuth: info.auth,
    id: info.id || "",
    username: info.username || "",
  },
});

export { authAtom };
