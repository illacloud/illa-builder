import { ReactNode } from "react"

export interface ModalProps {
  title: string
  bodyContent: ReactNode
  footerContent?: ReactNode
  canMove?: boolean
  w?: number
  h?: number
  onClose: () => void
}

export interface MovableModalProps {
  title: string
  bodyContent: ReactNode
  footerContent?: ReactNode
  onClose: () => void
}
