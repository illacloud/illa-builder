import { WidgetProps } from "../BaseWidget/interface"

export interface ContainerWidgetProps extends WidgetProps {
  readonly id: string
  readonly dslKey: string
  readonly parentId: string
  dragDisabled?: boolean
  // WidgetPosition
  leftColumn: number
  rightColumn: number
  topRow: number
  bottomRow: number
  parentColumnSpace: number
  parentRowSpace: number
  //
}
