import { atom, RecoilState } from "recoil";
import { handleResponse } from "../utils/utils";

interface IAuth {
  auth: boolean;
  uid: string;
  username: string;
}

async function getAuth() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
      credentials: "include",
      mode: "cors",
    });
    const data = await handleResponse(res);
    data.auth = true;
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return { auth: false };
  }
}

const authAtom: RecoilState<IAuth> = atom({
  key: "auth",
  default: await getAuth(),
});

export { authAtom, getAuth };
