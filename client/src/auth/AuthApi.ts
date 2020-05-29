import { apiRequest } from "../services/api-request";
import { Store } from "antd/lib/form/interface";

export const serviceLogIn = (credentials: Store) => {
  return apiRequest({
    url: "/api/auth/signin",
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
