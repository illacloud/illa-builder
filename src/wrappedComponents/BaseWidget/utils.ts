import { BaseProps, DSLWidget } from "./interface"

export type FlattenedWidgetProps<orType = never> =
  | (BaseProps & {
      children?: string[]
    })
  | orType

export const generateWidgetProps = (
  parent: FlattenedWidgetProps,
  type: string,
  leftColumn: number,
  topRow: number,
  parentRowSpace: number,
  parentColumnSpace: number,
  widgetName: string,
  widgetConfig: {
    id: string
    columns: number
    rows: number
  } & Partial<BaseProps>,
  version: number,
): DSLWidget => {
  if (parent) {
    const sizes = {
      leftColumn,
      rightColumn: leftColumn + widgetConfig.columns,
      topRow,
      bottomRow: topRow + widgetConfig.rows,
    }

    const others = {}
    const props: DSLWidget & {
      columns?: number
      rows?: number
    } = {
      isVisible: type === "MODAL_WIDGET" ? undefined : true,
      ...widgetConfig,
      type,
      widgetName,
      isLoading: false,
      parentColumnSpace,
      parentRowSpace,
      ...sizes,
      ...others,
      parentId: parent.id,
      version,
    }
    delete props.rows
    delete props.columns
    return props
  } else {
    throw Error("Failed to create widget: Parent was not provided ")
  }
}
