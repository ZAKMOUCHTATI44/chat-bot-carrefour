import { Request, Response } from "express";
import { MessageRequest } from "../types/app";
import { getLastMessage, saveMessage } from "./messageService";
import { createOrUpdateLead, getLang } from "./leadService";
import { sendMessage } from "./whatsapp";
import { Lang } from "@prisma/client";
import { buttonMenu, getMenu, welcomeMessage } from "./Menu";
import { getStore, storeOption } from "./stores";
import { getResponse } from "./MessageTemplate";

export async function chatbot(req: Request, res: Response) {
  let message: MessageRequest = req.body;
  let step: string = "";

  const lastMessage = await getLastMessage(message.from);

  console.log(message);

  if (lastMessage && lastMessage.step === 4) {
    // send response after sending reclamation
    const lang = await getLang(message.from);
    sendMessage({
      channel: "whatsapp",
      from: message.to,
      to: message.from,
      message_type: "text",
      text:
        lang === Lang.AR
          ? "شكرًا لاتصالك بنا، سيتم تعيين مستشار هاتفي لمعالجة شكواك في أقرب وقت ممكن."
          : "Merci de nous avoir contacté, un téléconseiller prendra en charge votre réclamation dans les plus brefs délais.",
    });
  } else {
    switch (message.message_type) {
      case "location":
        let search = "location";
        if (lastMessage.step === 2) {
          search = "catalogue";
        }
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: await storeOption(
            message.location.lat,
            message.location.long,
            message.from,
            search
          ),
        });

        break;
      case "reply":
        let { id, title, description } = message?.reply;
        if (id.includes("location")) {
          console.log(id.replace('location',''))
          console.log("GET THE LOCATION OF STROE");
        } else if (id.includes("catalogue")) {
          console.log(message.from,id.replace('catalogue',''))
          console.log("GET THE catalogue OF STROE");
        } else if (id.includes("btn-lang-fr")) {
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "custom",
            custom: await getMenu(Lang.FR),
          });

          createOrUpdateLead({
            lang: Lang.FR,
            phone: message.from,
            profileName: message.profile.name,
          });
        } else if (id.includes("btn-lang-ar")) {
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "custom",
            custom: await getMenu(Lang.AR),
          });

          createOrUpdateLead({
            lang: Lang.AR,
            phone: message.from,
            profileName: message.profile.name,
          });
        } else if (id.includes("option")) {
          step = id.replace("option", "");
          let text = await getResponse(Number(step), message.from);
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "text",
            text,
          });

          if (!["1", "2", "4"].includes(step)) {
            sendButtonBackToMenu(message);
          }
        } else if (id.includes("menu-default")) {
          const lang = await getLang(message.from);

          let custom = await getMenu(lang);
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "custom",
            custom,
          });
        }

        break;
      case "unsupported":
        break;

      default:
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: welcomeMessage(),
        });
        break;
    }
  }

  saveMessage({
    body: message.text ?? "",
    from: message.from,
    to: message.to,
    type: message.message_type,
    step: Number(step),
    messageId: message.message_uuid ?? "",
  });
  res.status(200).end();
}

function sendButtonBackToMenu(message: MessageRequest) {
  setTimeout(async () => {
    let custom = await buttonMenu(message.from);
    sendMessage({
      channel: "whatsapp",
      from: message.to,
      to: message.from,
      message_type: "custom",
      custom,
    });
  }, 5000);
}
