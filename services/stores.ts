import prisma from "../prisma/prisma";
import { getLang } from "./leadService";

export async function getStores() {}

export async function getStore(id: string) {}

export async function storeOption(phone: string, search: string): Promise<any> {
  let lang = await getLang(phone);

  const stores = await prisma.store.findMany({
    take: 10,
  });

  let rows = stores.map((store, index) => {
    return {
      id: `${search}${store.id}`,
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
        text: lang === "AR" ? "كارفور" : "Carrefour",
      },
      body: {
        text:
          lang === "AR"
            ? "اختر متجر كارفور الاقرب إليك"
            : "Voici les magasins les plus proches de chez vous , choisissez le vôtre",
      },
      action: {
        button: lang === "AR" ? "خيارات" : "Options",
        sections: [
          {
            title: lang === "AR" ? "هنا متاجرك:" : "Voici vos magasins :",
            rows: rows,
          },
        ],
      },
    },
  };

  return custom;
}
