import { ReactNode } from "react"

export interface DeleteActionContainerProps {
  children: ReactNode
  labelName: string
  onClickDelete: () => void
}
