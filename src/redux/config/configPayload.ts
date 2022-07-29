import { Params } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/RestAPIConfigure/interface"
import { ActionContent } from "@/redux/currentApp/action/actionState"

export interface CacheContentPayload {
  resourceType: string
  content: ActionContent
}

export interface UpdateParamsPayload {
  index: number
  params: Params
}
