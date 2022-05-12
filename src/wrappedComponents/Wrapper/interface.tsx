import { HTMLAttributes } from "react"

export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  w?: string | number
  h?: string | number
  alignment?: "start" | "center" | "end" | "fullWidth"
}
