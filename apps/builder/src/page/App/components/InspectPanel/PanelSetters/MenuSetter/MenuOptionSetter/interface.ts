import { HTMLAttributes } from "react"
import { ButtonProps, MenuItemType } from "@illa-design/react"
import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface MenuOptionSetterProps extends BaseSetter {
  value: MenuItemType[]
  childrenSetter?: PanelFieldConfig[]
}

export interface SetterSubMenuProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  widgetDisplayName: string
  attrPath: string
  value: string
  childrenSetter?: PanelFieldConfig[]
  label: string
  onClickAdd: (value: string) => void
  onDelete: () => void
}

export interface NewButtonProps extends ButtonProps {
  title: string
}

export interface SetterMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  widgetDisplayName: string
  attrPath: string
  childrenSetter?: PanelFieldConfig[]
  value: string
  label: string
  onDelete: () => void
}
