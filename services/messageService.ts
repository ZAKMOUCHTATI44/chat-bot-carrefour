import { Message } from "@prisma/client";
interface MessageRequest {
  messageId: string;
  to: string;
  from: string;
  type: "text" | "custom" | "unsupported" | "reply" | "location";
  body: string;
  step?: number;
  latitude?: number | null;
  longitude?: number | null;
}

export async function getLastMessage(phone: string): Promise<Message | null> {
  const message = await prisma.message.findFirst({
    where: {
      from: phone,
    },
    orderBy: {
      id: "desc",
    },
    take: 1,
  });

  return message;
}

export async function saveMessage(data: MessageRequest): Promise<Message> {
  const message = await prisma.message.create({
    data: {
      body: data.body ?? "",
      type: data.type,
      from: data.from,
      to: data.to,
      step: data.step,
      messageId: data.messageId,
      latitude: data.latitude,
      longitude: data.longitude,
    },
  });
  return message;
}
