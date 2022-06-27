import { HTTPMethod } from "@/page/App/components/ActionEditor/Resource/RESTAPI/interface"

export interface ResourcePanelProps {
  resourceId?: string
  onChange?: () => void
  onSave?: () => void
  onRun?: (result: any) => void
}

export interface ReturnRequestProp {
  url?: string
  method?: HTTPMethod
  body?: []
  headers?: []
}
