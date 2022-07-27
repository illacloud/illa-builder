import { RefObject } from "react"
import { ConnectionRef } from "../interface"
import {
  MysqlResource,
  Resource,
  ResourceType,
} from "@/redux/resource/resourceState"

export interface MySQLConfigureProps {
  resourceId?: string
  connectionRef: RefObject<ConnectionRef>
  onSubmit?: (data: Partial<Resource<MysqlResource>>) => void
  onTestConnection?: (data: any) => void
}

export interface MySQLConfigureValues extends MysqlResource {
  resourceName: string
}
