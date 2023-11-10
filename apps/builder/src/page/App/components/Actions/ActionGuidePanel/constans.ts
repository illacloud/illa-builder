import { ActionType } from "@/redux/currentApp/action/actionState"

export const RECOMMEND_RESOURCES: ActionType[] = [
  "restapi",
  "mysql",
  "postgresql",
  "airtable",
  "supabasedb",
]

export const MORE_DATA_TYPE: ActionType[] = [
  "aiagent",
  "transformer",
  "globalData",
  "illadrive",
]

export const ONLY_CLOUD_MODE_DATA_TYPE: ActionType[] = ["aiagent", "illadrive"]
