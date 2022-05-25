import { UseFormRegisterReturn } from "react-hook-form"

export interface MySQLFormProps {
  resourceId?: string
}

export interface MySQLFormValues {
  name: string
  host: string
  port: number
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: boolean
  ssh: boolean
  sshHost?: string
  sshPort?: number
  sshUsername?: string
  sshPassword?: string
  sshPrivateKey?: string
  sshPassphrase?: string
  serverCert?: string
  clientKey?: string
  clientCert?: string
}

export interface InputUploadProps {
  resetValue: () => void
  registerValue: UseFormRegisterReturn
}
