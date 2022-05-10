export type MySQLFormValues = {
  Name: string
  Hostname: string
  port: number
  DataBase: string
  Username: string
  Password: string
  SSH_Hostname?: string
  SSH_Port?: number
  SSH_Credentials?: string
  SSH_PrivateKey?: File
  SSH_Passphrase?: string
  SSL_ServerRootCertificate?: File
  SSL_ClientKey?: File
  SSL_ClientCertificate?: File
}
