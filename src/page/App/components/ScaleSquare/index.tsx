import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarPointerStyle,
  applyBorderStyle,
  applyOuterStyle,
  applySquarePointerStyle,
  applyTransformWidgetStyle,
  onePixelStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { RootState } from "@/store"
import { useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  DragCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, className, onClientXYChange, ...otherProps } =
    props
  const scaleSquareState = componentNode.error ? "error" : "normal"
  const dispatch = useDispatch()
  const selected = useSelector<RootState, boolean>((state) => {
    return (
      state.currentApp.config.selectedComponents.findIndex((value) => {
        return value.displayName == componentNode.displayName
      }) != -1
    )
  })

  const [collectedInfo, dragRef, dragPreviewRef] = useDrag<
    ComponentNode,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      item: componentNode,
      canDrag: !componentNode.isDragging,
    }),
    [],
  )

  return (
    <div
      css={applyOuterStyle(h, w)}
      className={className}
      onClick={(e) => {
        dispatch(configActions.updateSelectedComponent([componentNode]))
        e.stopPropagation()
      }}
      {...otherProps}
    >
      <div css={applyBorderStyle(selected, scaleSquareState)}>
        <div css={applyTransformWidgetStyle()} ref={dragRef}>
          <TransformWidget componentNode={componentNode} />
        </div>
      </div>
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "tl")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "tl")
        }}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "tr")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "tr")
        }}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "bl")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "bl")
        }}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "br")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "br")
        }}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "l")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "l")
        }}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "t")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "t")
        }}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "r")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "r")
        }}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "b")}
        onMouseMove={(event) => {
          onClientXYChange(event.clientX, event.clientY, "b")
        }}
      />
      <div ref={dragPreviewRef} css={onePixelStyle} />
    </div>
  )
}

ScaleSquare.displayName = "ScaleSquare"
