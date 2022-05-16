import React from "react"
import { useDispatch } from "react-redux"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { v4 as uuidv4 } from "uuid"
import { applyDslLayout, applyDslView } from "./compose"
import {
  DslFrame,
  DslLayout,
  DslText,
  DslView,
  DropInfo,
  dslActions,
} from "@/redux/reducers/editorReducer/dslReducer"
import { Category, DslType, ItemTypes } from "../../../constants/dragConfig"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"

interface PanelDrag {
  type: string
}

const FrameLayout: React.FC<DslFrame> = (frameLayoutProps) => {
  const dispatch = useDispatch()
  const { props } = frameLayoutProps
  const { topRow, leftColumn } = frameLayoutProps.props
  // 配置drop事件
  const [collectProps, dropTarget] = useDrop<PanelDrag, DropInfo, Object>(
    () => ({
      accept: Object.values(ItemTypes),
      drop: (item, monitor: DropTargetMonitor) => {
        if (monitor.getDropResult<DropInfo>()?.hasDropped) {
          console.log(monitor.getDropResult<DropInfo>()!!, "hasDropped == true")
          return monitor.getDropResult<DropInfo>()!!
        }
        switch (item.type) {
          case ItemTypes.TEXT: {
            console.log("drop into frame TEXT")
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.AddText,
                dslText: {
                  id: "dsl" + uuidv4(),
                  version: "0.0.1",
                  type: DslType.DslText,
                  category: Category.View,
                  parentId: frameLayoutProps.id,
                  props: {
                    height: "auto",
                    width: "auto",
                    leftColumn: "0px",
                    topRow: "0px",
                    position: "absolute",
                    nodeText: "input",
                  }
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
                  id: "dsl" + uuidv4(),
                  parentId: frameLayoutProps.id,
                  version: "0.0.1",
                  nodeChildren: [],
                  type: DslType.DslFrame,
                  category: Category.Layout,
                  props: {
                    height: "300px",
                    width: "300px",
                    leftColumn: "auto",
                    topRow: "auto",
                    position: "absolute",
                    background: "#EEEEEE",
                  }
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
    [topRow, leftColumn],
  )
  return (
    <div
      id={frameLayoutProps.id}
      key={frameLayoutProps.id}
      ref={dropTarget}
      style={{
        height: props.height,
        width: props.width,
        top: props.topRow,
        bottom: props.bottomRow,
        left: props.leftColumn,
        right: props.rightColumn,
        background: props.background,
        position: props.position,
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
