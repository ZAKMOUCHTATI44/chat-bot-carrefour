import { Store } from "@prisma/client";
import prisma from "../prisma/prisma";
import { getLang } from "./leadService";

export async function getStores() {}

export async function getStoreLocation(id: string) {
  const store = await prisma.store.findFirst({
    where: {
      id,
    },
  });

  let custom = {
    type: "location",
    location: {
      longitude: store.longitude,
      latitude: store.latitude,
      name: store.name,
      address: store.streetAdress,
    },
  };

  await prisma.store.update({
    where: {
      id,
    },
    data: {
      locationCount: {
        increment: +1,
      },
    },
  });

  return custom;
}

export async function getCatalogueOfStore(id: string) {
  const store = await prisma.store.findFirst({
    where: {
      id,
    },
    include: {
      catalog: true,
    },
  });

  // Send the default PDF
  let custom = {
    type: "file",
    file: {
      url: "/uploads/Nos Catalogues - Carrefour Market.pdf",
      caption: "Nos Catalogues - Carrefour Market.pdf",
    },
  };

  await prisma.store.update({
    where: {
      id,
    },
    data: {
      catalogCount: {
        increment: +1,
      },
    },
  });

  return custom;
}

export async function storeOption(
  latitude: number,
  longitude: number,
  phone: string,
  search: string
): Promise<any> {
  let lang = await getLang(phone);

  const stores: Store[] = await prisma.$queryRaw`
  SELECT name , id,storeId,
    ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) AS distance
  FROM stores
  ORDER BY distance ASC
  LIMIT 10
`;

  console.log(stores);

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
