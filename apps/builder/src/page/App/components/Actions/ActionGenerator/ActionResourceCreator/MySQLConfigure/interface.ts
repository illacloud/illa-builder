import { RefObject } from "react"
import { ConnectionRef } from "../interface"
import { MysqlResource, Resource } from "@/redux/resource/resourceState"

export interface MySQLConfigureProps {
  resourceId?: string
  connectionRef: RefObject<ConnectionRef>
  onSubmit?: (data: Partial<Resource<MysqlResource>>) => void
  onTestConnection?: (data: Partial<Resource<MysqlResource>>) => void
}

export interface MySQLConfigureValues extends MysqlResource {
  resourceName: string
}
