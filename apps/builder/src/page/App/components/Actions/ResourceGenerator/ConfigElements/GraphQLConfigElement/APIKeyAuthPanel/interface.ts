import { Control, FieldValues, UseFormWatch } from "react-hook-form"
import { ApiKeyAuth } from "@/redux/resource/graphqlResource"

export interface APIKeyAuthPanelProps {
  auth?: ApiKeyAuth
  control: Control
  watch: UseFormWatch<FieldValues>
}
