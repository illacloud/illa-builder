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
}

export type MySQLConfigureValues = BaseOptions & AdvancedOptions

export type TestConnectionBaseValues = Omit<BaseOptions, "name">

export interface TestConnectionValues {
  kind: "mysql"
  options: TestConnectionBaseValues & { advancedOptions: AdvancedOptions }
}

export interface BaseOptions {
  name: string
  host: string
  port: number
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: boolean
  ssh: boolean
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
  name: keyof MySQLConfigureValues
  register: UseFormRegister<MySQLConfigureValues>
  reset: UseFormResetField<MySQLConfigureValues>
  setValue: UseFormSetValue<MySQLConfigureValues>
  placeholder?: string
}

export interface MySQLParamProps {
  onChange: (value: any) => void
}

export interface MySQLParamValues {
  query?: string
}
