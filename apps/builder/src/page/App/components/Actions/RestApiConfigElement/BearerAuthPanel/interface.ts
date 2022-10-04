import { Control } from "react-hook-form"
import { BearerAuth, RestApiResource } from "@/redux/resource/resourceState"

export interface BearerAuthPanelProps {
  auth?: BearerAuth
  control: Control
}
