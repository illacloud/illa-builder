import { Control } from "react-hook-form"
import { BearerAuth } from "@/redux/resource/graphqlResource"

export interface BearerAuthPanelProps {
  auth?: BearerAuth
  control: Control
}
