import { Control } from "react-hook-form"
import { BasicAuth, RestApiResource } from "@/redux/resource/resourceState"

export interface BasicAuthPanelProps {
  auth?: BasicAuth
  control: Control
}
