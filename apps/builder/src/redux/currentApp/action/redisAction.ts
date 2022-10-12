import { Events } from "@/redux/currentApp/action/actionState"

export interface RedisAction extends Events {
  command: string
}

export const RedisActionInitial: RedisAction = {
  command: "",
}
