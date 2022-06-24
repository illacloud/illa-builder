import { HTMLAttributes, ReactNode } from "react"
import { TypeQueryResult } from "tern/lib/tern"

export interface HintComplementProps extends HTMLAttributes<HTMLDivElement> {
  index?: number
  data: TypeQueryResult
}
