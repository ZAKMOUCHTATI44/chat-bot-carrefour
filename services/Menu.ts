import { Lang } from "@prisma/client";
import { getSteps } from "./MessageTemplate";
import { getLang } from "./leadService";

export async function getMenu(lang: Lang) {
  let rows = await getSteps(lang);
  let body = {
    fr: "Veuillez appuyer sur options pour choisir l’un de nos services",
    ar: "يرجى الضغط على الخيارات لاختيار أحد خدماتنا",
  };

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === Lang.AR ? "سيتي كلوب" : "Carrefour",
      },
      body: {
        text: lang === Lang.AR ? body.ar : body.fr,
      },
      footer: {
        text: " ",
      },
      action: {
        button: lang === Lang.AR ? "خيارات" : "options",
        sections: [
          {
            title:
              lang === Lang.AR ? "حدد اختيارك" : "Sélectionner votre choix",
            rows,
          },
        ],
      },
    },
  };

  return custom;
}


export const buttonMenu = async (phone: string) => {
  const lang = await getLang(phone);

  let custom = {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text:
          lang === Lang.AR
            ? "للعودة إلى القائمة، انقر أدناه"
            : "Veuillez appuyer ci-dessous pour revenir au menu principal !",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "menu-default",
              title: lang === Lang.AR ? "القائمة" : "Menu",
            },
          },
        ],
      },
    },
  };

  return custom;
};
