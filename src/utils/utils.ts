export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function handleResponse(response: Response) {
  return response.json().then((json) => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject({
        message: json.message,
        status: response.status,
      });
    }
  });
}

export const fetcher: (url: string) => Promise<any> = async (url: string) => {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + url, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return handleResponse(res);
};
