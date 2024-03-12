import { Lang } from "@prisma/client";
import { getLang } from "./leadService";

export async function getSteps(lang: Lang): Promise<any> {
  const options = await prisma.messageTemplate.findMany();
  const rows = options.map((option) => {
    const row = {
      id: `option${option.id}`,
      title: " ",
      description: lang === Lang.AR ? option.titleAr : option.titleFr,
    };

    return row;
  });

  return rows;
}

export async function getResponse(
  step: number,
  phone: string
): Promise<string> {
  const lang = await getLang(phone);

  const currentStep = await prisma.messageTemplate.findFirst({
    where: {
      id: step,
    },
  });

  if (currentStep !== null) {
    if (lang === Lang.AR) {
      return currentStep.contentAr;
    } else {
      return currentStep.contentFr;
    }
  }

  return "";
}
