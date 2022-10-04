import { ActionContent } from "@/redux/currentApp/action/actionState"
import { Params } from "../resource/resourceState"

export interface CacheContentPayload {
  resourceType: string
  content: ActionContent
}

export interface UpdateParamsPayload {
  index: number
  params: Params
}
