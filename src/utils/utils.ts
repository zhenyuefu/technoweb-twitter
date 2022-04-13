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
