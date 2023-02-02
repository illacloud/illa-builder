import { MenuItemType } from "@illa-design/react"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface MenuOptionSetterProps extends BaseSetter {
  value: MenuItemType[]
}
