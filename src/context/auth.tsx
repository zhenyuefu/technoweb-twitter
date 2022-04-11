import { atom, RecoilState } from "recoil";

interface IAuth {
  auth: boolean;
  id?: string;
  username?: string;
}

// const getAuth = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth`, {
//   credentials: "include",
//   mode: "cors",
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     return data;
//   })
//   .catch((err) => {
//     console.log(err);
//     return { isAuth: false };
//   });

async function getAuth() {
  const user = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth`, {
    credentials: "include",
    mode: "cors",
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
      return { auth: false };
    });
  return user;
}

const authAtom: RecoilState<IAuth> = atom({
  key: "auth",
  default: await getAuth(),
});

export { authAtom, getAuth };
