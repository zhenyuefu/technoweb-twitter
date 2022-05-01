import {IFormLogin, IFormRegister} from "../types";
import {handleResponse} from "./utils";

export async function login(data: IFormLogin) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      mode: "cors",
    }
  );
  return handleResponse(res);
}

export async function logout() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    })
    return handleResponse(res);
  } catch (error) {
    console.log(error);
  }
}

export async function register(data: IFormRegister) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function checkUsername(username: string) {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/api/user/username?username=${username}`,
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await handleResponse(res);
  if (!json.exists) {
    return Promise.resolve("Username not exists");
  }
  return Promise.reject(new Error("This username already exists"));

}

export async function checkEmail(email: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/email?email=${email}`,
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await handleResponse(res);
  if (!json.exists) {
    return Promise.resolve("Email not exists");
  }
  return Promise.reject(new Error("This email already registered"));
}
