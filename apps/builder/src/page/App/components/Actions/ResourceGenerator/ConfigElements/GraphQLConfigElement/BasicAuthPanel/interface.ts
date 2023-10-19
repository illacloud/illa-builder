import { Control } from "react-hook-form"
import { BasicAuth } from "@/redux/resource/graphqlResource"

export interface BasicAuthPanelProps {
  auth?: BasicAuth
  control: Control
}
