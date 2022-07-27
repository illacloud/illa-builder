import { RefObject } from "react"
import { ConnectionRef } from "../interface"
import { MysqlResource } from "@/redux/resource/resourceState"

export interface MySQLConfigureProps {
  resourceId?: string
  connectionRef: RefObject<ConnectionRef>
  onSubmit?: (data: any) => void
  onTestConnection?: (data: any) => void
}

export interface MySQLConfigureValues extends MysqlResource {
  resourceName: string
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
