import { ACCESS_TOKEN, BEARER } from "../config/app-parameters";

export const apiRequest = async (options) => {
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
  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    return Promise.reject(error);
  }
};
