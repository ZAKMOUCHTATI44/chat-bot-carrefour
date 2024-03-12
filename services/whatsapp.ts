import axios from "axios";
import { MessageRequest } from "../types/app";
import { saveMessage } from "./messageService";

export function sendMessage(data: MessageRequest, step?: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEM,
    },
  };

  axios
    .post("https://api.nexmo.com/v1/messages", data, config)
    .then((res) => {
      saveMessage({
        body: data.text ?? "",
        from: data.from,
        to: data.to,
        step: step,
        type: data.message_type,
        messageId: res.data.message_uuid ?? "",
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
