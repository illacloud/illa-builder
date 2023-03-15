import { HTMLAttributes } from "react"

export interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export interface PreviewPopContentProps {
  viewportWidth?: number
  viewportHeight?: number
}

export type AppSizeType = "fluid" | "desktop" | "tablet" | "custom"
