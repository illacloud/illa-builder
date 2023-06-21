export interface ClickhouseResource {
  host: string
  port: string | number
  databaseName: string
  username: string
  password: string
  ssl: ClickhouseSSL
}

export interface ClickhouseSSL {
  ssl: boolean
  selfSigned: boolean
  privateKey: string
  clientCert: string
  caCert: string
}

export const ClickhouseSSLInitial: ClickhouseSSL = {
  ssl: false,
  selfSigned: false,
  privateKey: "",
  clientCert: "",
  caCert: "",
}

export const ClickhouseResourceInitial: ClickhouseResource = {
  host: "",
  port: "",
  databaseName: "",
  username: "",
  password: "",
  ssl: ClickhouseSSLInitial,
}
