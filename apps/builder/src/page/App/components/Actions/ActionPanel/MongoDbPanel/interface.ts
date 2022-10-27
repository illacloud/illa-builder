import { Control } from "react-hook-form"
import {
  MongoDbAction,
  MongoDbActionType,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"

export interface MongoDbActionPartProps {
  control: Control<MongoDbAction<MongoDbActionTypeContent>>
}
