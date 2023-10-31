import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface HeaderProps {
  title: string
  handleCloseModal: () => void
  docLink?: string
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
  extraElement?: ReactNode
}
