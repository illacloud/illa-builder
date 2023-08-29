import { templateConfig } from "@/config/template/index"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { ResourceContent, ResourceType } from "@/redux/resource/resourceState"

export type TemplateName = keyof typeof templateConfig

export interface TemplateSetting {
  type: TemplateName
  nameKey: string
  descKey: string
  appId: string
  icon: string
}

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
