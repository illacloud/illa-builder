import { Control } from "react-hook-form"
import { BasicAuth } from "@/redux/resource/restapiResource"

export interface BasicAuthPanelProps {
  auth?: BasicAuth
  control: Control
}
