import { UseFormRegister, UseFormResetField } from "react-hook-form"
import { RefObject } from "react"
import { ConnectionRef } from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/interface"

export interface MySQLFormProps {
  connectionRef: RefObject<ConnectionRef>
}

export type MySQLFormValues = BaseOptions & AdvancedOptions

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
  name: keyof MySQLFormValues
  register: UseFormRegister<MySQLFormValues>
  reset: UseFormResetField<MySQLFormValues>
}
