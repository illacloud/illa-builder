import { ResourceType } from "@illa-public/public-types"
import { ReactNode } from "react"

export interface ConfigElementProviderProps {
  children: ReactNode
  resourceID?: string
  resourceType: ResourceType
  onFinished: (resourceID: string) => void
}
