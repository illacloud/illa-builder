import { BaseProps, DSLWidget } from "./BaseWidget/interface"

export type WidgetConfig =
    {
      columns: number
      rows: number
    } & BaseProps

export const generateWidgetProps = (
  parentId: string,
  parent: DSLWidget["props"],
  widgetConfig: WidgetConfig,
): DSLWidget => {
  if (parent) {
    let { props, rows, columns, ...rest } = widgetConfig
    let { leftColumn, topRow, parentRowSpace, parentColumnSpace } = props
    if (widgetConfig.type === "CANVAS_WIDGET") {
      columns =
        (parent.rightColumn - parent.leftColumn) * parent.parentColumnSpace
      parentColumnSpace = 1
      rows = (parent.bottomRow - parent.topRow) * parent.parentRowSpace
      parentRowSpace = 1
    }
    const sizes = {
      leftColumn,
      rightColumn: leftColumn + columns,
      topRow,
      bottomRow: topRow + rows,
    }
    const result: DSLWidget = {
      ...rest,
      parentId,
      props: {
        ...props,
        ...sizes,
        isVisible: widgetConfig.type === "CONTAINER_WIDGET" ? true : undefined,
        isLoading: false,
        parentColumnSpace,
        parentRowSpace,
      },
    }
    return result
  } else {
    throw Error("Failed to create widget: Parent was not provided ")
  }
}
