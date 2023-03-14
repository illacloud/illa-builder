import { Control } from "react-hook-form"
import { RestApiAuth } from "@/redux/resource/restapiResource"

export interface RestApiConfigElementProps {
  resourceId?: string
  onBack: () => void
  onFinished: (resourceId: string) => void
}

export interface RestApiAuthPanelProps {
  auth?: RestApiAuth
  control: Control
}
