import { HTMLAttributes } from "react"
import { ButtonProps } from "@illa-design/react"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface MenuOptionSetterProps extends BaseSetter {
  childrenSetter: PanelFieldConfig[]
}

export interface SetterSubMenuProps extends HTMLAttributes<HTMLDivElement> {
  widgetDisplayName: string
  attrPath: string
  value: string
  childrenSetter: PanelFieldConfig[]
  label: string
  onClickAdd: (value: string) => void
  onDelete: () => void
}

export interface NewButtonProps extends ButtonProps {
  title: string
}

export interface SetterMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  widgetDisplayName: string
  attrPath: string
  childrenSetter: PanelFieldConfig[]
  value: string
  label: string
  onClickItem: (value: string) => void
  onDelete: () => void
}
