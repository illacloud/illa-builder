import { RestAPIBasicAuth } from "@illa-public/public-types"
import { Control } from "react-hook-form"

export interface BasicAuthPanelProps {
  auth?: RestAPIBasicAuth
  control: Control
}
