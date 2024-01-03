import { notification } from "antd";

export function notification(type, text) {
  notification.type({
    message: text,
    style: {
      top: 100,
    },
  });
}
