import { Store } from "@prisma/client";
import prisma from "../prisma/prisma";
import { getLang } from "./leadService";

export async function getStores() {}

export async function getStore(id: string) {}

export async function storeOption(
  latitude: number,
  longitude: number,
  phone: string,
  search: string
): Promise<any> {
  let lang = await getLang(phone);

  const stores: Store[] = await prisma.$queryRaw`
  SELECT name , id,
    ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) AS distance
  FROM stores
  ORDER BY distance ASC
  LIMIT 10
`;

  let rows = stores.map((store, index) => {
    return {
      id: `${search}${store.storeId}`,
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
