import { Events } from "@/redux/currentApp/action/actionState"

export type RedisActionMode = "raw" | "select"

export interface RedisAction extends Events {
  mode: RedisActionMode
  query: string
}

export const RedisActionInitial: RedisAction = {
  mode: "raw",
  query: "",
}
