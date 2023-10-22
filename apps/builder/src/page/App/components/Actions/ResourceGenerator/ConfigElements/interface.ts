import { ResourceType } from "@illa-public/public-types"

export interface BaseConfigElementProps {
  resourceID?: string
  hasFooter?: boolean
  onBack?: () => void
}

export interface ConfigElementProps extends BaseConfigElementProps {
  resourceType?: ResourceType
}
