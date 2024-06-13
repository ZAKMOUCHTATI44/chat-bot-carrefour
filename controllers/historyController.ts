import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { convertStringToDate } from "../utils/helpers";

export async function histories(req: Request, res: Response) {
    let { phone, from, to, status } = req.body
    let filterOption: any = {};

    if (phone) {
        filterOption = {
            ...filterOption,
            phone: { contains: `(?i)${phone.toString()}` },
        };
    }

    if (status) {
        filterOption = { ...filterOption, status };
    }

    if (from && to) {
        filterOption = {
            ...filterOption,
            createdAt: {
                gte: convertStringToDate(from.toString()),
                lte: convertStringToDate(to.toString()),
            },
        };
    }
    const histories  = await prisma.message.findMany({
        where: filterOption,
        orderBy: {
            createdAt: "desc",
        },
    });
    res.json({ histories  });
}