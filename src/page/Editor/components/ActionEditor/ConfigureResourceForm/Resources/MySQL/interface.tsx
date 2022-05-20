import { UseFormRegisterReturn } from "react-hook-form"

export interface MySQLFormProps {}

export interface MySQLFormValues {
  Name: string
  Hostname: string
  Port: number
  Database: string
  Username: string
  Password: string
  SSHHostname?: string
  SSHPort?: number
  SSHCredentials?: string
  SSHPassword?: string
  SSHPrivateKey?: string
  SSHPassphrase?: string
  SSLServerRootCertificate?: string
  SSLClientKey?: string
  SSLClientCertificate?: string
}

export interface InputUploadProps {
  resetValue: () => void
  registerValue: UseFormRegisterReturn
}
