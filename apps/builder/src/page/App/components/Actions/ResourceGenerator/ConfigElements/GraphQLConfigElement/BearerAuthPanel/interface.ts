import { GraphQLBearerAuth } from "@illa-public/public-types"
import { Control } from "react-hook-form"

export interface BearerAuthPanelProps {
  auth?: GraphQLBearerAuth
  control: Control
}
