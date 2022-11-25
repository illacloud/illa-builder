export interface SMPTAction {
  from: string
  to: string
  bcc: string
  cc: string
  setReplyTo: boolean
  replyTo: string
  subject: string
  contentType: string
  body: string
  attachment: string
}

export enum SMTPActionContenType {
  PLAIN = "text/plain",
  HTML = "text/html",
}

export const SMTPActionInitial: SMPTAction = {
  from: "",
  to: "{{[]}}",
  bcc: "{{[]}}",
  cc: "{{[]}}",
  setReplyTo: false,
  replyTo: "",
  subject: "",
  contentType: "",
  body: "",
  attachment: "{{[]}}",
}
