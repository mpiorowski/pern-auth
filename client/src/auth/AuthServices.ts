import { apiRequest } from "../services/ApiRequest";
import { Store } from "antd/lib/form/interface";

export const serviceLogIn = (credentials: Store) => {
  return apiRequest({
    url: "/api/auth/login",
    method: "POST",
    body: JSON.stringify(credentials),
  });
};