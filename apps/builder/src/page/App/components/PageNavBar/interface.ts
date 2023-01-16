import { HTMLAttributes } from "react"

export interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export interface PreviewPopContentProps {
  viewportWidth?: number
  viewportHeight?: number
  closePopContent: () => void
}
