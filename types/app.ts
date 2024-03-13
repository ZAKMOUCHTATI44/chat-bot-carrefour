export type MessageRequest = {
  message_uuid?: string;
  channel: "whatsapp";
  message_type: "text" | "custom" | "unsupported" | "reply" | "location";
  to: string;
  location ?: {
    lat: number;
    long: number;
  };
  from: string;
  text?: string;
  custom?: any;
  reply?: any;
  profile?: any;
};
