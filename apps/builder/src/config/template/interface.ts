import { templateConfig } from "@/config/template/index"

export type TemplateName = keyof typeof templateConfig

export interface TemplateSetting {
  name: TemplateName
  desc: string
}
