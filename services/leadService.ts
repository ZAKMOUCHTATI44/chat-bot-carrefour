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
