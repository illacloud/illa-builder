import { FC } from "react"
import {
  RESTAPIParam,
  MySQLParam,
} from "@/page/App/components/ActionEditor/Resource"
import { ResourceParamsProps } from "./interface"

export const ResourceParams: FC<ResourceParamsProps> = (props) => {
  const { resourceType, onChange } = props

  switch (resourceType) {
    case "mysql":
      return <MySQLParam onChange={onChange} />
    case "restapi":
      return <RESTAPIParam onChange={onChange} />
    default:
      return null
  }
}

ResourceParams.displayName = "ResourceParams"
