import {IFormPost} from "../types";
import {handleResponse} from "./utils";

export async function addPost(data: IFormPost) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      mode: "cors",
    });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
  }
}

export async function addComment(postId: string, content: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        content,
      }),
      mode: "cors",
      credentials: "include"
    })
    return handleResponse(response);
  } catch (error) {
    console.log(error);
  }
}