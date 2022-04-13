import { atom, RecoilState } from "recoil";

interface IAuth {
  auth: boolean;
  uid: string;
  username: string;
}

async function getAuth() {
  const user = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
    credentials: "include",
    mode: "cors",
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data + { auth: true };
    })
    .catch((err) => {
      console.log(err);
      return { auth: false };
    });
  return user;
}

const authAtom: RecoilState<IAuth> = atom({
  key: "auth",
  default: await getAuth(),
});

export { authAtom, getAuth };
