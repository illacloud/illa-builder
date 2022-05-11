import { FC, HTMLAttributes, useRef, useState } from "react"
import { DropTargetMonitor, useDrop, XYCoord } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4, v4 as uuid } from "uuid"

import { CanvasStyle } from "./style"
import { Category, DslType, ItemTypes } from "../../dragConfig/dragType"
import { PanelDrag } from "../WidgetPickerEditor/DemoWidget"
import { DropInfo } from "@/redux/reducers/editorReducer/dslReducer/interface"
import {
  DslFrame,
  DslLayout,
  DslText,
  DslView,
} from "@/redux/reducers/editorReducer/dslReducer/dsl"
import { DslActionName } from "../../../../redux/reducers/editorReducer/dslReducer/dsl-action"
import { applyDslLayout, applyDslView } from "./demo/compose"
import { dslActions } from "@/redux/reducers/editorReducer/dslReducer"
import { BuilderState } from "@/redux/reducers/interface"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props
  const dispatch = useDispatch()
  const { root } = useSelector(
    (state: BuilderState) => state.editor.present.dsl,
  )
  const canvasRef = useRef<HTMLDivElement>(null)
  const [currentDragId, setCurrentDragId] = useState<string>("dsl" + uuidv4())

  const getOffset = (monitorOffset: XYCoord | null) => {
    const canvasTop = canvasRef.current?.offsetTop ?? 0
    const canvasLeft = canvasRef.current?.offsetLeft ?? 0
    const monitorTop = monitorOffset?.y ?? 0
    const monitorLeft = monitorOffset?.x ?? 0

    return {
      top: `${monitorTop - canvasTop}px`,
      left: `${monitorLeft - canvasLeft}px`,
    }
  }

  const handleDrag = (item: PanelDrag, monitor: DropTargetMonitor) => {
    if (monitor.getDropResult<DropInfo>()?.hasDropped == true) {
      return monitor.getDropResult<DropInfo>()!!
    }
    let monitorOffset = getOffset(monitor.getClientOffset())
    switch (item.type) {
      case ItemTypes.TEXT: {
        console.log("drop into frame TEXT")
        dispatch(
          dslActions.dslActionHandler({
            type: DslActionName.AddText,
            dslText: {
              nodeText: "input",
              dslKey: currentDragId,
              version: "0.0.1",
              type: DslType.DslText,
              category: Category.View,
              parentKey: root.dslKey,
              height: "auto",
              width: "auto",
              right: "auto",
              bottom: "auto",
              position: "absolute",
              ...monitorOffset,
            } as DslText,
          }),
        )
        return {
          parent: root,
          hasDropped: true,
        } as DropInfo
      }
      case ItemTypes.FRAME: {
        console.log("drop into frame FRAME")
        dispatch(
          dslActions.dslActionHandler({
            type: DslActionName.AddFrame,
            dslFrame: {
              dslKey: currentDragId,
              parentKey: root.dslKey,
              background: "#EEEEEE",
              version: "0.0.1",
              nodeChildren: [],
              type: DslType.DslFrame,
              category: Category.Layout,
              height: "300px",
              width: "300px",
              right: "auto",
              bottom: "auto",
              position: "absolute",
              ...monitorOffset,
            } as DslFrame,
          }),
        )
        setCurrentDragId("dsl" + uuidv4())
        return {
          parent: root,
          hasDropped: true,
        } as DropInfo
      }
    }
    return {
      parent: root,
      hasDropped: false,
    } as DropInfo
  }

  const [collectProps, drop] = useDrop<PanelDrag, DropInfo, Object>(
    () => ({
      accept: Object.values(ItemTypes),
      hover: (item, monitor) => {
        // handleDrag(item, monitor)
      },
      drop: (item, monitor: DropTargetMonitor) => {
        return handleDrag(item, monitor)
      },
    }),
    [],
  )

  return (
    <div className={className} ref={canvasRef}>
      <div ref={drop} css={CanvasStyle}>
        {root.nodeChildren.map((value) => {
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
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
