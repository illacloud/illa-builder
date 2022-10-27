import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { Control } from "react-hook-form"

export interface BodyEditorProps {
  control: Control<RestApiAction<BodyContent>>
}
