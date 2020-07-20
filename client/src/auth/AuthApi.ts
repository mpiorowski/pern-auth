import { apiRequest } from "../services/api-request";
import { Store } from "antd/lib/form/interface";
import { Register, LogIn } from "../../../interfaces/AuthInterface";

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

export const serviceRecover = (data: { userNameOrEmail: string }) => {
  return apiRequest({
    url: "/api/auth/recover",
    method: "POST",
    body: JSON.stringify(data),
  });
};
