import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { Prisma } from "@prisma/client";

export async function statistic(req: Request, res: Response) {
  const messageCounts = await prisma.message.groupBy({
    by:["createdAt"],
    
  });

  const statistic = await prisma.store.aggregate({
    _sum: {
      locationCount: true,
      catalogCount: true,
    },
  });

  const ticketsCountByStatus = await prisma.tickets.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  let totalTickets = 0;
  ticketsCountByStatus.forEach((status) => {
    totalTickets += status._count.id;
  });
  const tickets = ticketsCountByStatus.map((status) => {
    return {
      status: status.status,
      count: status._count.id,
    };
  });
  res.json({
    statistic: {
      locationCount: statistic._sum.locationCount,
      catalogCount: statistic._sum.catalogCount,
      tickets: [...tickets, { status: "total", count: totalTickets }],
    },
  });
}
