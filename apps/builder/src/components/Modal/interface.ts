import { ReactNode } from "react"

export interface BaseModalProps {
  title: string
  bodyContent: ReactNode
  footerContent?: ReactNode
  docLink?: string
  onClose: () => void
}

export interface ModalProps extends BaseModalProps {
  docLink?: string
  canMove?: boolean
  w?: number
  h?: number
}

export interface MovableModalProps extends BaseModalProps {
  defaultPosition?: {
    x: number
    y: number
    width: number
    height: number
  }
}
