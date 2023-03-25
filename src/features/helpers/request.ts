import { REQUEST_METHODS } from "../constants";

const API_DOMAIN = "http://94.131.246.109:5555/";

const { GET } = REQUEST_METHODS;

export function requestApi<T>(
  url: string,
  method: any = GET,
  data?: any
): Promise<T> {
  return fetch(API_DOMAIN + url, {
    method,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response);
    })
    .then((result) => result)
    .catch((error) => error);
}
