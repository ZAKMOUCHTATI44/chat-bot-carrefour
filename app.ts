import cors from "cors";
import express, { Request, Response } from "express";
import router from "./router/app";
import routerAuth from "./router/auth";

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const categories = [
    {
      id: 1,
      name: "Carrefour",
      name_ar: "كارفور",
      facebook_link: "https://www.facebook.com/CarrefourMa",
      instagram_link: "https://www.instagram.com/carrefour.maroc",
      tiktok_link: "https://www.tiktok.com/@carrefourmaroc",
    },
    {
      id: 2,
      name: "Carrefour Market",
      name_ar: "كارفور ماركت",
      facebook_link: "https://www.facebook.com/CarrefourMarketMaroc",
      instagram_link: "https://www.instagram.com/carrefourmarket.maroc",
      tiktok_link: null,
    },
    {
      id: 3,
      name: "Carrefour Gourmet",
      name_ar: "كارفور جورميه",
      facebook_link: "https://www.facebook.com/Carrefourgourmetmaroc",
      instagram_link: "https://www.instagram.com/carrefourmarketgourmet",
      tiktok_link: null,
    },
    {
      id: 4,
      name: "Carrefour Express",
      name_ar: "كارفور إكسبرس",
      facebook_link: "https://www.facebook.com/CarrefourExpressMaroc",
      instagram_link: "https://www.instagram.com/carrefourexpressmaroc",
      tiktok_link: null,
    },
  ];

  const cities = [
    {
      id: 1,
      name: "Rabat",
    },
    {
      id: 2,
      name: "Meknès",
    },
    {
      id: 3,
      name: "Marrakech",
    },
    {
      id: 4,
      name: "Casablanca",
    },
    {
      id: 5,
      name: "Marrakesh",
    },
    {
      id: 6,
      name: "Fès",
    },
    {
      id: 7,
      name: "Meknes",
    },
    {
      id: 8,
      name: "Tanger",
    },
    {
      id: 9,
      name: "Agadir",
    },
    {
      id: 10,
      name: "El Jadida",
    },
    {
      id: 11,
      name: "Tamaris",
    },
    {
      id: 12,
      name: "Essaouira",
    },
    {
      id: 13,
      name: "Temara",
    },
    {
      id: 14,
      name: "Dar-el-Beida",
    },
    {
      id: 15,
      name: "Kénitra",
    },
    {
      id: 16,
      name: "Mohammedia",
    },
    {
      id: 17,
      name: "Khémisset",
    },
    {
      id: 18,
      name: "Tétouan",
    },
    {
      id: 19,
      name: "Ouarzazate",
    },
    {
      id: 20,
      name: "BenHimaSafi",
    },
    {
      id: 21,
      name: "Salé",
    },
    {
      id: 22,
      name: "Settat",
    },
    {
      id: 23,
      name: "Béni Mellal",
    },
    {
      id: 24,
      name: "Berkane",
    },
    {
      id: 25,
      name: "Khénifra",
    },
    {
      id: 26,
      name: "Nador",
    },
    {
      id: 27,
      name: "Sidi Slimane",
    },
    {
      id: 28,
      name: "Fes",
    },
    {
      id: 29,
      name: "Mohammédia",
    },
    {
      id: 30,
      name: "Tangier",
    },
    {
      id: 31,
      name: "Bouskoura",
    },
    {
      id: 32,
      name: "Majorelle",
    },
    {
      id: 33,
      name: "Sidi Kacem",
    },
    {
      id: 34,
      name: "Martil",
    },
    {
      id: 35,
      name: "Soualem",
    },
    {
      id: 36,
      name: "Azrou",
    },
    {
      id: 37,
      name: "Kenitra",
    },
    {
      id: 38,
      name: "Berrchid",
    },
    {
      id: 39,
      name: "Oujda",
    },
    {
      id: 40,
      name: "Tetouan",
    },
  ];
 
  const groupes = [
    {
      id: 1,
      name: "Gourmet",
    },
    {
      id: 2,
      name: "Premium",
    },
    {
      id: 3,
      name: "Standard",
    },
    {
      id: 4,
      name: "Relance Express",
    },
    {
      id: 5,
      name: "Express",
    },
    {
      id: 6,
      name: "Relance mag en difficulté",
    },
    {
      id: 7,
      name: "Hypermarché",
    },
  ];
  groupes.map(async (groupe) => {
    const resStores = await prisma.group.create({
      data: {
        name: groupe.name,
      },
    });
  });

  cities.map(async (city) => {
    const resMarques = await prisma.city.create({
      data: {
        name: city.name,
      },
    });
  });

  categories.map(async (category) => {
    const resMarques = await prisma.category.create({
      data: {
        name: category.name,
        nameAr: category.name_ar,
        facebookLink: category.facebook_link,
        instagramLink: category.instagram_link,
        tiktokLink: category.tiktok_link,
        webSiteLink: "https://carrefourmaroc.ma/",
      },
    });
  });

  res.send("HELLO WORLD");
});

app.use("/api/", router);

app.use("/auth/", routerAuth);

app.listen(6000, () => console.log("APP WAS RUNING !!!"));
