import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"

export interface HeaderProps {
  title: string
  handleCloseModal: () => void
}

export interface BaseBodyProps {
  children: ReactNode
}

export interface BodyProps {
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
}

export interface ModalProps extends HeaderProps {
  childrenSetter?: PanelFieldConfig[]
  widgetDisplayName?: string
  attrPath?: string
  children?: ReactNode
  _css?: SerializedStyles
  header?: ReactNode
}
