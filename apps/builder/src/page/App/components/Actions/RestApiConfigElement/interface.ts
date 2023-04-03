import { Control } from "react-hook-form"
import { RestApiAuth } from "@/redux/resource/restapiResource"

export interface RestApiAuthPanelProps {
  auth?: RestApiAuth
  control: Control
}
