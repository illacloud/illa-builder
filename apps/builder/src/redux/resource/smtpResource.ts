export interface SMTPResource {
  host: string
  port: string | number
  username: string
  password: string
}

export const SMTPResourceInitial: SMTPResource = {
  host: "",
  port: "",
  username: "",
  password: "",
}
