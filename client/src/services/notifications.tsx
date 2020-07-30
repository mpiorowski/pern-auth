import { notification, message } from "antd";

export const openNotification = (
  message: string,
  description: string,
  type: "error" | "success"
): void => {
  notification[type]({
    message: message,
    description: description,
    duration: 5,
    placement: "topRight",
  });
};

export const openMessage = (
  description: string,
  type: "error" | "success"
): void => {
  message[type]({
    content: description,
    duration: 3
  });
};