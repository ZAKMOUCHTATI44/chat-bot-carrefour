import prisma from "../prisma/prisma";
import { getLang } from "./leadService";

export async function getStores() {}

export async function getStore(id: string) {}

export async function storeOption(phone: string): Promise<any> {
  let lang = await getLang(phone);

  const stores = await prisma.store.findMany({
    take: 10,
  });

  let rows = stores.map((store, index) => {
    return {
      id: `location${store.id}`,
      title: " ",
      description: store.name,
    };
  });

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === "AR" ? "سيتي كلوب" : "City Club",
      },
      body: {
        text:
          lang === "AR"
            ? "اختر نادي الاقرب إليك"
            : "Voici les clubs les plus proches de chez vous , choisissez le vôtre",
      },
      action: {
        button: lang === "AR" ? "خيارات" : "Options",
        sections: [
          {
            title: lang === "AR" ? "هنا نادي :" : "Voici vos clubs :",
            rows: rows,
          },
        ],
      },
    },
  };

  return custom;
}
