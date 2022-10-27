export type RedisActionMode = "raw" | "select"

export interface RedisAction {
  mode: RedisActionMode
  query: string
}

export const RedisActionInitial: RedisAction = {
  mode: "raw",
  query: "",
}
