import { HTMLAttributes, ReactNode } from "react"

export interface HintComplementProps extends HTMLAttributes<HTMLDivElement> {
  ele: ReactNode
  index: Number
}
