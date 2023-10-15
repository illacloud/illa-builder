import { ResourceType } from "@/redux/resource/resourceState"
import { BaseConfigElementProps } from "../interface"

export interface MysqlLikeConfigElementProps extends BaseConfigElementProps {
  resourceType: ResourceType
}
