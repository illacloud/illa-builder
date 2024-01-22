import { ActionType } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"

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

export const RECOMMEND_RESOURCES_CLOUD: ActionType[] = [
  "restapi",
  "mysql",
  "huggingface",
  "postgresql",
]

export const getRecommendAgentID = () => {
  switch (import.meta.env.ILLA_APP_ENV) {
    case "beta":
      return ["ILAfx4p1C7c5", "ILAfx4p1C7c4", "ILAfx4p1C7c3", "ILAfx4p1C7dm"]
    case "production":
      return ["ILAfx4p1C7eu", "ILAfx4p1C7en", "ILAfx4p1C7ee", "ILAfx4p1C7eh"]
    default:
      return ["ILAfx4p1C7dC", "ILAfx4p1C7dB", "ILAfx4p1C7dA", "ILAfx4p1C7dz"]
  }
}

export function filterSelfHostActionType(actionType: ActionType) {
  if (!isCloudVersion) return !ONLY_CLOUD_MODE_DATA_TYPE.includes(actionType)
  return !!actionType
}
