import { HTMLAttributes, ReactNode } from "react"
import { MenuItemType } from "@illa-design/react"
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
}

export interface NewButtonProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export interface SetterMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  widgetDisplayName: string
  attrPath: string
  childrenSetter: PanelFieldConfig[]
  value: string
  label: string
  onClickItem: (value: string) => void
}
