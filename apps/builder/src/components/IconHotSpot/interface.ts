import { HTMLAttributes, ReactNode } from "react"

export interface IconHotSpotProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  iconSize?: number
  activeColor?: string
  inactiveColor?: string
}
