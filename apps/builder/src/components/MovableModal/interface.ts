import { ReactNode } from "react"

export interface MovableModalProps {
  title: string
  bodyContent: ReactNode
  onClose: () => void
  footerContent?: ReactNode
}
