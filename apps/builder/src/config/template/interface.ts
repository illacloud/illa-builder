import { templateConfig } from "@/config/template/index"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export type TemplateName = keyof typeof templateConfig

export interface TemplateSetting {
  name: TemplateName
  desc: string
}

export type TemplateResources = (Partial<ActionItem<ActionContent>> & {
  // The resourceIndex here is used to replace the real resourceId later.
  resourceIndex: number
})[]
