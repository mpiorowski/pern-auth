import { Store } from "antd/lib/form/interface";
import { LogIn, Register } from "../../../interfaces/AuthInterface";
import { apiRequest } from "../services/api-request";

export const serviceLogIn = (data: LogIn) => {
  return apiRequest({
    url: "/api/auth/login",
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const serviceRegister = (data: Register) => {
  return apiRequest({
    url: "/api/auth/register",
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const serviceRegisterCode = (data: Store) => {
  return apiRequest({
    url: "/api/auth/register/code",
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const serviceRecoverCode = (data: Store) => {
  return apiRequest({
    url: "/api/auth/recover/code",
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const serviceRecover = (data: { userNameOrEmail: string }) => {
  return apiRequest({
    url: "/api/auth/recover",
    method: "POST",
    body: JSON.stringify(data),
  });
};
