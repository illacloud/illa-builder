import { Control } from "react-hook-form"
import {
  MongoDbActionType,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"

export interface MongoDbActionPartProps {
  originalActionType: MongoDbActionType
  control: Control
  content: MongoDbActionTypeContent
}
