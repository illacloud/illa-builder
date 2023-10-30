import { ResourceType } from "@illa-public/public-types"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { ResourceContent } from "@/redux/resource/resourceState"

export type TemplateResources = {
  resourceName: string
  resourceType: ResourceType
  content: ResourceContent
}[]

export type TemplateAction<T extends ActionContent> = Partial<ActionItem<T>> & {
  // The resourceIndex here is used to replace the real resourceID later.
  resourceIndex: number
}

export type TemplateActions = TemplateAction<ActionContent>[]
