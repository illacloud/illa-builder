import { HTMLAttributes } from "react"
import { WidgetType } from "../WidgetBuilder"

export interface BaseProps {
  id: string
  type: WidgetType
  widgetName: string
  parentId: string
  props: {
    // WidgetPosition
    version: string
    leftColumn?: number | string
    rightColumn?: number | string
    topRow?: number | string
    bottomRow?: number | string
    parentColumnSpace?: number
    parentRowSpace?: number
    //
    isVisible?: boolean
    isLoading?: boolean
    isDisabled?: boolean
    backgroundColor?: string
    animateLoading?: boolean
    //
    dragDisabled?: boolean

    //
    width?: string
    height?: string
    position:
      | "-webkit-sticky"
      | "absolute"
      | "fixed"
      | "relative"
      | "static"
      | "sticky"
  }
}

export type WidgetProps = HTMLAttributes<HTMLDivElement> & BaseProps

export interface DSLWidget extends BaseProps {
  children?: DSLWidget[]
}

export interface BaseWidgetProps extends WidgetProps {
  readonly id: string
  dragDisabled?: boolean
  //
}
