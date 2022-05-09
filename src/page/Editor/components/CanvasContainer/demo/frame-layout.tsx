import React from "react"
import { useDispatch } from "react-redux"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { v4 as uuidv4 } from "uuid"
import { applyDslLayout, applyDslView } from "./compose"
import { DslFrame, DslLayout, DslText, DslView } from "../../../dragConfig/dsl"
import { Category, DslType, ItemTypes } from "../../../dragConfig/dragType"
import { DropInfo } from "../../../dragConfig/interface"
import { PanelDrag } from "../../WidgetPickerEditor/DemoWidget"
import { DslActionName } from "../../../store/dsl-action"
import { dslActions } from "../../../../../reducers/CanvasContainer/dslReducer"

const FrameLayout: React.FC<DslFrame> = (frameLayoutProps) => {
  const dispatch = useDispatch()
  const { top, left } = frameLayoutProps
  // 配置drop事件
  const [collectProps, dropTarget] = useDrop<PanelDrag, DropInfo, Object>(
    () => ({
      accept: Object.values(ItemTypes),
      drop: (item, monitor: DropTargetMonitor) => {
        if (monitor.getDropResult<DropInfo>()?.hasDropped) {
            console.log(monitor.getDropResult<DropInfo>()!!, 'hasDropped == true')
          return monitor.getDropResult<DropInfo>()!!
        }
        switch (item.type) {
          case ItemTypes.TEXT: {
            console.log("drop into frame TEXT")
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.AddText,
                dslText: {
                  nodeText: "input",
                  dslKey: "dsl" + uuidv4(),
                  version: "0.0.1",
                  type: DslType.DslText,
                  category: Category.View,
                  parentKey: frameLayoutProps.dslKey,
                  height: "auto",
                  width: "auto",
                  left: "0px",
                  right: "auto",
                  top: "0px",
                  bottom: "auto",
                  position: "absolute",
                } as DslText,
              }),
            )
            return {
              parent: frameLayoutProps,
              hasDropped: true,
            } as DropInfo
          }
          case ItemTypes.FRAME: {
            console.log("drop into frame FRAME")
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.AddFrame,
                dslFrame: {
                  dslKey: "dsl" + uuidv4(),
                  parentKey: frameLayoutProps.dslKey,
                  background: "#EEEEEE",
                  version: "0.0.1",
                  nodeChildren: [],
                  type: DslType.DslFrame,
                  category: Category.Layout,
                  height: "300px",
                  width: "300px",
                  left: "auto",
                  right: "auto",
                  top: "auto",
                  bottom: "auto",
                  position: "absolute",
                } as DslFrame,
              }),
            )
            return {
              parent: frameLayoutProps,
              hasDropped: true,
            } as DropInfo
          }
        }
        return {
          parent: frameLayoutProps,
          hasDropped: false,
        } as DropInfo
      },
    }),
    [top, left],
  )
  return (
    <div
      id={frameLayoutProps.dslKey}
      key={frameLayoutProps.dslKey}
      ref={dropTarget}
      style={{
        height: frameLayoutProps.height,
        width: frameLayoutProps.width,
        top: frameLayoutProps.top,
        bottom: frameLayoutProps.bottom,
        left: frameLayoutProps.left,
        right: frameLayoutProps.right,
        background: frameLayoutProps.background,
        position: frameLayoutProps.position,
      }}
    >
      {frameLayoutProps.nodeChildren.map((value) => {
        switch (value.category) {
          case Category.Layout: {
            return applyDslLayout(value as DslLayout)
          }
          case Category.View: {
            return applyDslView(value as DslView)
          }
        }
      })}
    </div>
  )
}

export default FrameLayout
