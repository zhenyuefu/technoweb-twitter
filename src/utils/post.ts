import { IFormPost } from "../types";
import { handleResponse } from "./utils";

export async function addPost(data: IFormPost) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/post`,
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
  return handleResponse(response);
}

export async function addComment(postId: string, content: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/post/${postId}/comment`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
      mode: "cors",
      credentials: "include",
    }
  );
  return handleResponse(response);
}

export async function likePost(postId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/post/${postId}/like`,
    {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
    }
  );
  return handleResponse(response);
}

export async function unlikePost(postId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/post/${postId}/unlike`,
    {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
    }
  );
  return handleResponse(response);
}
