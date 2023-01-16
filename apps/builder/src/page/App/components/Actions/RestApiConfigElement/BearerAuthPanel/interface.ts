import { Control } from "react-hook-form"
import { BearerAuth } from "@/redux/resource/restapiResource"

export interface BearerAuthPanelProps {
  auth?: BearerAuth
  control: Control
}
