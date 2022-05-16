import { HTMLAttributes } from "react"
import { widgetType } from "../WidgetBuilder"

export interface BaseProps {
  id: string
  type: widgetType
  widgetName: string
  parentId?: string
  version: number
  props: {
    // WidgetPosition
    leftColumn: number
    rightColumn: number
    topRow: number
    bottomRow: number
    parentColumnSpace: number
    parentRowSpace: number
    //
    isVisible?: boolean
    isLoading: boolean
    isDisabled?: boolean
    backgroundColor?: string
    animateLoading?: boolean
    //
    dragDisabled?: boolean

    //
    width?: string
    height?: string
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
