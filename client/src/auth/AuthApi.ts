import { apiRequest } from "../services/api-request";
import { Store } from "antd/lib/form/interface";

export const serviceLogIn = (credentials: Store) => {
  return apiRequest({
    url: "/api/auth/login",
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const serviceRegister = (credentials: Store) => {
  return apiRequest({
    url: "/api/auth/register",
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const serviceRegisterCode = (credentials: Store) => {
  return apiRequest({
    url: "/api/auth/register/code",
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
