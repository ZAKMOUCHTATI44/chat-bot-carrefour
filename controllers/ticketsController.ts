import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { convertStringToDate } from "../utils/helpers";



export async function tickets(req: Request, res: Response) {
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
    const tickets = await prisma.ticket.findMany({
        where: filterOption,
        orderBy: {
            createdAt: "desc",
        },
    });
    res.json({ tickets });
}
export async function getTicket(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findFirstOrThrow({
            where: {
                id: id,
            },
        });

        return res.json({ticket});
    } catch (error) {
        res.status(404).json({
            message: "ticket not found !!",
        });
    }
}
export async function deleteTicktes(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    try {
        await prisma.ticket.delete({
            where: {
                id: id,
            },
        });

        return res.status(204).send();
    } catch (error) {
        res.status(404).json({
            message: "ticket not found !!",
        });
    }
}
