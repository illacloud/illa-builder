import { FC } from "react"
import {
  RESTAPIParam,
  MySQLParam,
} from "@/page/App/components/ActionEditor/Resource"
import { ResourceParamsProps } from "./interface"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"

export const ResourceParams: FC<ResourceParamsProps> = (props) => {
  const { resourceType, onChange } = props

  switch (resourceType) {
    case ACTION_TYPE.MYSQL:
      return <MySQLParam onChange={onChange} />
    case ACTION_TYPE.REST_API:
      return <RESTAPIParam onChange={onChange} />
    default:
      return null
  }
}

ResourceParams.displayName = "ResourceParams"
