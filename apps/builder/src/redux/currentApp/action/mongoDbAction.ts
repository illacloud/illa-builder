import { Events } from "@/redux/currentApp/action/actionState"

export interface MongoDbAction extends Events {
  actionType: string
  collection: string
}

export const MongoDbActionInitial: MongoDbAction = {
  actionType: "aggregate",
  collection: "",
}
