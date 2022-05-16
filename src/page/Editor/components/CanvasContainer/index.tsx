import { FC, HTMLAttributes, useRef, useState } from "react"
import { DropTargetMonitor, useDrop, XYCoord } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { CanvasStyle } from "./style"
import { Category, DslType, ItemTypes } from "../../constants/dragConfig"
import {
  DropInfo,
  DslFrame,
  DslLayout,
  DslText,
  DslView,
  dslActions,
} from "@/redux/reducers/editorReducer/dslReducer"
import { DslActionName } from "@/redux/reducers/editorReducer/dslReducer/dsl-action"
import { applyDslLayout, applyDslView } from "./demo/compose"
import { BuilderState } from "@/redux/reducers/interface"
import { CanvasWidget } from "@/wrappedComponents/CanvasWidget"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

interface PanelDrag {
  type: string
}

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
      topRow: `${monitorTop - canvasTop}px`,
      leftColumn: `${monitorLeft - canvasLeft}px`,
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
              id: currentDragId,
              version: "0.0.1",
              type: DslType.DslText,
              category: Category.View,
              parentId: root.id,
              props: {
                height: "auto",
                width: "auto",
                position: "absolute",
                nodeText: "input",
                ...monitorOffset,
              },
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
              id: currentDragId,
              parentId: root.id,
              version: "0.0.1",
              children: [],
              type: DslType.DslFrame,
              category: Category.Layout,
              props: {
                height: "300px",
                width: "300px",
                position: "absolute",
                background: "#EEEEEE",
                ...monitorOffset,
              },
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
    <div className={className} ref={canvasRef} css={CanvasStyle}>
      <CanvasWidget {...root} />
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
