import {
  BodyContent,
  BodyType,
  RawBodyType,
} from "@/redux/currentApp/action/restapiAction"
import { Control } from "react-hook-form"

export interface BodyEditorProps {
  bodyType: BodyType
  body: BodyContent
  control: Control
}
