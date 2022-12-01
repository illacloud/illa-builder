import { IllaMode } from "@/redux/config/configState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export enum OVERFLOW_TYPE {
  PAGINATION = "PAGINATION",
  SCROLL = "SCROLL",
}
export interface ListWidgetProps extends BaseWidgetProps {
  dataSources?: Array<unknown>
  overflowMethod?: OVERFLOW_TYPE
  pageSize?: number
  itemHeight: number
  currentPage: number
  handleOnRowSelect: () => void
  selectedIndex: number
  itemBackGroundColor: string
  disabled: boolean
}

export interface RenderTemplateContainerProps {
  templateComponentNodes: ComponentNode
  templateContainerHeight: number
}

export interface ListWidgetPropsWithChildrenNodes extends ListWidgetProps {
  copyComponents: ComponentNode[] | null
  handleUpdateSelectedItem: (index: number) => void
  illaMode: IllaMode
}
