import { ResourceType } from "@illa-public/public-types"

export interface BaseConfigElementProps {
  resourceID?: string
}

export interface ConfigElementProps extends BaseConfigElementProps {
  resourceType?: ResourceType
}
