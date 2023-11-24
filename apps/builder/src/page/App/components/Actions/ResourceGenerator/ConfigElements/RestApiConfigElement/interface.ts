import { RestApiAuth } from "@illa-public/public-types"
import { Control } from "react-hook-form"

export interface RestApiAuthPanelProps {
  auth?: RestApiAuth
  control: Control
}
