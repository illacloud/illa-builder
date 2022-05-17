import { FC } from "react"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { DropInfo, dslActions } from "@/redux/reducers/editorReducer/dslReducer"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import { ItemTypes } from "@/page/Editor/constants/dragConfig"
import { BaseWidget } from "../BaseWidget"
import { ContainerWidgetProps } from "./interface"
import { widgetBuilder } from "../WidgetBuilder"
import { generateWidgetProps, getTargetOffset, WidgetConfig } from "../utils"

interface PanelDrag {
  type: string
  props: any
}

export const CONTAINER_WIDGET_CONFIG = {
  type: "CONTAINER_WIDGET",
  defaults: {
    version: "0.0.1",
    backgroundColor: "#FFFFFF",
    rows: 40,
    columns: 24,
    width: "100%",
    height: "100%",
    widgetName: "Container",
    containerStyle: "card",
    borderColor: "transparent",
    borderWidth: "0",
    borderRadius: "0",
    children: [],
  },
}

export const ContainerWidget: FC<ContainerWidgetProps> = (
  containerWidgetProps,
) => {
  const {
    children,
    props,
    id,
    type,
    props: { topRow, leftColumn },
  } = containerWidgetProps
  const dispatch = useDispatch()

  const [collectProps, dropTarget] = useDrop<PanelDrag, DropInfo, Object>(
    () => ({
      accept: Object.values(ItemTypes),
      drop: (item, monitor: DropTargetMonitor) => {
        if (monitor.getDropResult<DropInfo>()?.hasDropped) {
          return monitor.getDropResult<DropInfo>()!!
        }
        if (item.type) {
          let monitorOffset = getTargetOffset(monitor?.getClientOffset(), id)
          dispatch(
            dslActions.dslActionHandler({
              type: DslActionName.AddItem,
              dslText: {
                ...item,
                props: { ...item.props, ...monitorOffset },
                parentId: id,
                id: "dsl" + uuidv4(),
              },
            }),
          )
          return {
            parent: containerWidgetProps,
            hasDropped: true,
          } as DropInfo
        }
        return {
          parent: containerWidgetProps,
          hasDropped: false,
        } as DropInfo
      },
    }),
    [topRow, leftColumn],
  )

  return (
    <BaseWidget {...containerWidgetProps}>
      <div
        id={id}
        style={{
          height: props.height,
          width: props.width,
          top: props.topRow,
          left: props.leftColumn,
          position: "absolute",
        }}
        ref={dropTarget}
      >
        {children?.map((value) => {
          const { type } = value
          const child = widgetBuilder(type)
          let { defaults } = child.config
          const widgetProps = {
            ...value,
            props: {
              ...defaults,
              ...value.props,
            },
          }
          const childProps = generateWidgetProps(
            id,
            props,
            widgetProps as unknown as WidgetConfig,
          )
          return <child.widget key={value.id} {...childProps} />
        })}
      </div>
    </BaseWidget>
  )
}

ContainerWidget.displayName = "ContainerWidget"
