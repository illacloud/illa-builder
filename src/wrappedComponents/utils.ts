import { BaseProps, DSLWidget } from "./DraggableComponent/interface"
import { XYCoord } from "react-dnd"

export type WidgetConfig = {
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
      // columns =
      //   (parent.rightColumn - parent.leftColumn) * parent.parentColumnSpace
      parentColumnSpace = 1
      //rows = (parent.bottomRow - parent.topRow) * parent.parentRowSpace
      parentRowSpace = 1
    }
    const sizes = {
      leftColumn,
      topRow,
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

export const getTargetOffset = (monitorOffset: XYCoord | null, id: string) => {
  const target = window.document
    .querySelector<HTMLDivElement>(`#${id}`)
    ?.getBoundingClientRect()
  const targetTop = target?.top ?? 0
  const targetLeft = target?.left ?? 0
  const monitorTop = monitorOffset?.y ?? 0
  const monitorLeft = monitorOffset?.x ?? 0
  return {
    topRow: `${monitorTop - targetTop}px`,
    leftColumn: `${monitorLeft - targetLeft}px`,
  }
}
