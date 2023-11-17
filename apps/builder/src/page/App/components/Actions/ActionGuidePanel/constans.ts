import { isCloudVersion } from "@illa-public/utils"
import { ActionType } from "@/redux/currentApp/action/actionState"

export const RECOMMEND_RESOURCES_SELF_HOST: ActionType[] = [
  "restapi",
  "mysql",
  "postgresql",
  "airtable",
  "supabasedb",
]

export const MORE_DATA_TYPE_SELF_HOST: ActionType[] = [
  "transformer",
  "globalData",
]

export const ONLY_CLOUD_MODE_DATA_TYPE: ActionType[] = ["aiagent", "illadrive"]

export const RECOMMEND_RESOURCES_CLOUD: ActionType[] = ["restapi", "mysql"]

export function filterSelfHostActionType(actionType: ActionType) {
  if (!isCloudVersion) return !ONLY_CLOUD_MODE_DATA_TYPE.includes(actionType)
  return !!actionType
}
