import { HTMLAttributes } from "react"
import { TypeQueryResult } from "tern/lib/tern"

export interface HintTooltipProps extends HTMLAttributes<HTMLDivElement> {
  data: TypeQueryResult
}
