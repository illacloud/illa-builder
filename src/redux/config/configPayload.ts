import { ActionContent } from "@/redux/currentApp/action/actionState"

export interface CacheContentPayload {
  resourceType: string
  content: ActionContent
}
