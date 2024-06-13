import { Lang } from "@prisma/client";

export const getLang = async (phone: string): Promise<Lang> => {
  const lead = await prisma.lead.findFirst({
    where: {
      phone,
    },
  });

  return lead !== null && lead.lang === "AR" ? Lang.AR : Lang.FR;
};

export const createOrUpdateLead = async (data: {
  lang: Lang;
  phone: string;
  profileName: string;
}) => {
  const leadExists = await prisma.lead.findFirst({
    where: {
      phone: data.phone,
    },
  });

  if (leadExists) {
    let lead = await prisma.lead.update({
      where: {
        phone: data.phone,
      },
      data: {
        lang: data.lang,
        profileName: data.profileName,
      },
    });
  } else {
    await prisma.lead.create({
      data: {
        phone: data.phone,
        lang: data.lang,
        profileName: data.profileName,
      },
    });
  }
};

export async function sendButtonFollow(storeId: string, phone: string) {
  const lang = await getLang(phone);
  
  let custom = {
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text:
          lang === "AR"
            ? "استمتع بالعروض لا تُقاوم في متجر كارفور الخاص بك 😍:"
            : "Profitez des offres imbattables dans votre magasin Carrefour 😍: ",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: `btn-follow${storeId}`,
              title: lang === "AR" ? "استلام القادم" : "Recevoir le prochain",
            },
          },
        ],
      },
    },
  };

  return custom;
}
