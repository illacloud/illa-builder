export interface MicrosoftSqlResource {
  host: string
  port: string
  databaseName: string
  username: string
  password: string
  ssl: MicrosoftSqlSSL
  connectionOpts: {
    key: string
    value: string
  }[]
}

export interface MicrosoftSqlSSL {
  ssl: boolean
  privateKey: string
  clientCert: string
  caCert: string
  verificationMode: "full" | "skip"
}

export const MicrosoftSqlSSLInitial: MicrosoftSqlSSL = {
  ssl: false,
  privateKey: "",
  clientCert: "",
  caCert: "",
  verificationMode: "full",
}

export const MicrosoftSqlResourceInitial: MicrosoftSqlResource = {
  connectionOpts: [
    {
      key: "",
      value: "",
    },
  ],
  databaseName: "",
  host: "",
  password: "",
  port: "",
  ssl: MicrosoftSqlSSLInitial,
  username: "",
}
