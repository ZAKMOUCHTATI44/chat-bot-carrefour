import { getLang } from "./leadService";

export async function categoryOption(phone: string): Promise<any> {
  let lang = await getLang(phone);

  let categories = await prisma.category.findMany();

  let rows = categories.map((category) => {
    return {
      id: `followPage${category.id}`,
      title: lang === "AR" ? category.nameAr : category.name,
      description: " ",
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
            ? "الرجاء اختيار واحدة من علاماتنا التجارية"
            : "Veuillez sélectionner l’une de nos enseignes",
      },
      action: {
        button: lang === "AR" ? "خيارات" : "Options",
        sections: [
          {
            title: lang === "AR" ? "اختار:" : "Choisir:",
            rows: rows,
          },
        ],
      },
    },
  };

  return custom;
}
