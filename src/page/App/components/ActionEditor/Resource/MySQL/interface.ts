import {
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form"
import { RefObject } from "react"
import { ConnectionRef } from "@/page/App/components/ActionEditor/ResourceForm/Editor/interface"

export interface MySQLConfigureProps {
  resourceId?: string
  connectionRef: RefObject<ConnectionRef>
  onSubmit?: (data: any) => void
  onTestConnection?: (data: any) => void
}

export interface MySQLConfigureValues {
  resourceName: string
  host: string
  port: number
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: boolean
  ssh: boolean
  advancedOptions: AdvancedOptions
}

export interface AdvancedOptions {
  sshHost: string
  sshPort: number
  sshUsername: string
  sshPassword: string
  sshPrivateKey: string
  sshPassphrase: string
  serverCert: string
  clientKey: string
  clientCert: string
}

export interface InputUploadProps {
  name: `advancedOptions.${keyof Pick<
    AdvancedOptions,
    "sshPrivateKey" | "serverCert" | "clientKey" | "clientCert"
  >}`
  register: UseFormRegister<MySQLConfigureValues>
  reset: UseFormResetField<MySQLConfigureValues>
  setValue: UseFormSetValue<MySQLConfigureValues>
  placeholder?: string
}

export interface MySQLParamProps {
  onChange: (value: any) => void
}

export interface MySQLParamValues {
  mode?: string
  query?: string
}
