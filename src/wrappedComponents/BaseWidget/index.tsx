import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import Moveable from "react-moveable"
import { BaseWidgetProps } from "./interface"
import { getPreviewMode } from "@/redux/selectors/editorSelectors/modeSelectors"
import { useSelector } from "react-redux"
import { getWidgetStates } from "@/redux/selectors/editorSelectors/widgetStateSelectors"
import { useDragWidget } from "../../page/Editor/components/WidgetPickerEditor/hooks/useDragWidget"
import { useSelectWidget } from "../../page/Editor/components/WidgetPickerEditor/hooks/useSelectWidget"

export const BaseWidget: FC<BaseWidgetProps> = (BaseWidgetProp) => {
  const {
    className,
    children,
    id,
    parentId,
    props: {
      topRow,
      bottomRow,
      leftColumn,
      rightColumn,
      parentRowSpace = 1,
      parentColumnSpace = 1,
      dragDisabled,
      //
      width,
      height,
    },
  } = BaseWidgetProp

  const ref = useRef<Moveable>(null)
  const [target, setTarget] = useState<HTMLDivElement | null>()

  const isPreviewMode = useSelector(getPreviewMode)
  const { isDragging, isResizing, isDraggingDisabled, selectedWidgets } =
    useSelector(getWidgetStates)
  const isResizingOrDragging = !!isResizing || !!isDragging
  const draggable =
    !isResizingOrDragging &&
    !isDraggingDisabled &&
    !dragDisabled &&
    !isPreviewMode

  const isCurrentWidgetSelected = selectedWidgets.includes(id)
  const { focusWidget, selectWidget } = useSelectWidget()
  const { setDraggingCanvas, setDraggingState } = useDragWidget()

  const onWindowResize = useCallback(() => {
    ref.current!!.updateTarget()
  }, [])

  useEffect(() => {
    setTarget(window.document.querySelector<HTMLDivElement>(`#${id}`))
  }, [onWindowResize])

  console.log(draggable, id, "base")

  const getSize = (num: number) => `${num ?? 0}px`

  return (
    <div
      key={id}
      style={{
        height: height,
        width: width,
        top: topRow,
        left: leftColumn,
        position: "absolute",
      }}
    >
      <Moveable
        ref={ref}
        target={target}
        throttleDrag={1}
        keepRatio={false}
        draggable={draggable}
        scalable={false}
        rotatable={false}
        origin={false}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        onDragStart={(e) => {
          console.log(e, draggable, id, "draggable")
          if (!isCurrentWidgetSelected) {
            selectWidget(id)
          }
          const widgetHeight = bottomRow - topRow
          const widgetWidth = rightColumn - leftColumn
          const bounds = e.target.getBoundingClientRect()

          const startPoints = {
            top: e?.target?.offsetTop,
            left: Math.min(
              Math.max((e.clientX - bounds.left) / parentColumnSpace, 0),
              widgetWidth - 1,
            ),
          }
          parentId && setDraggingCanvas(parentId)
          setDraggingState({
            isDragging: true,
            dragGroupActualParent: parentId || "",
            draggingGroupCenter: { widgetId: id },
            startPoints,
          })
        }}
        onDragEnd={(e) => {}}
      />
      {children}
    </div>
  )
}

BaseWidget.displayName = "BaseWidget"
