import { Request, Response } from "express";
import * as zod from "zod";
import prisma from "../prisma/prisma";

export async function stores(req: Request, res: Response) {
  const { name, city } = req.query;


  const stores = await prisma.store.findMany();
  res.json({ stores });
}
export async function createStore(req: Request, res: Response) {
  const storeSchema = zod.object({
    name: zod.string(),
    streetAdress: zod.string(),
    latitude: zod.number(),
    longitude: zod.number(),
    groupId: zod.string(),
    categoryId: zod.number(),
    cityId: zod.string(),
  });

  try {
    const {
      name,
      latitude,
      longitude,
      streetAdress,
      groupId,
      cityId,
      categoryId,
    } = storeSchema.parse(req.body);
    const store = await prisma.store.create({
      data: {
        name,
        latitude,
        longitude,
        streetAdress,
        city: { connect: { id: cityId } },
        group: { connect: { id: groupId } },
        category: { connect: { id: categoryId } },
      },
    });

    res.json(store);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      });
    } else {
      return res.status(500).json({ error: error });
    }
  }
}

export async function deleteStore(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  try {
    await prisma.store.delete({
      where: {
        id: id,
      },
    });

    return res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: "store not found !!",
    });
  }
}
