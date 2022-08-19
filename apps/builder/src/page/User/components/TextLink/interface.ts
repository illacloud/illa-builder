import { HTMLAttributes, ReactNode } from "react"

export interface TextLinkProps extends HTMLAttributes<HTMLSpanElement> {
  onClick?: () => void
  children?: ReactNode
}
