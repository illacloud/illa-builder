import { FC } from "react"
import {
  RESTAPIParam,
  MySQLParam,
} from "@/page/Editor/components/ActionEditor/Resource"
import { ResourceParamsProps } from "./interface"

export const ResourceParams: FC<ResourceParamsProps> = (props) => {
  const { resourceType, onChange } = props

  switch (resourceType) {
    case "MySQL":
      return <MySQLParam onChange={onChange} />
    case "REST API":
      return <RESTAPIParam onChange={onChange} />
    default:
      return null
  }
}

ResourceParams.displayName = "ResourceParams"
