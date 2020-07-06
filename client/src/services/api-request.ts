import { ACCESS_TOKEN, BEARER } from "../config/app-parameters";

interface Options {
  url: string,
  method: string,
  body?: string
}

export const apiRequest = async (options: Options): Promise<any> => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      BEARER + " " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  const response = await fetch(options.url, options);
  // return response;
  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    return Promise.reject(error);
  }
};
