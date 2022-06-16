import { FC } from "react"
import {
  DragResize,
  ScaleSquareProps,
} from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarPointerStyle,
  applyBorderStyle,
  applyOuterStyle,
  applySquarePointerStyle,
  applyTransformWidgetStyle,
  BarPosition,
  onePixelStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { RootState } from "@/store"
import { DragSourceHookSpec, FactoryOrInstance, useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { mergeRefs } from "@illa-design/system"

function getDragConfig(
  componentNode: ComponentNode,
  barPosition: BarPosition,
): FactoryOrInstance<DragSourceHookSpec<DragResize, unknown, unknown>> {
  return () => ({
    type: "resize",
    item: {
      node: componentNode,
      position: barPosition,
    } as DragResize,
    canDrag: !componentNode.isDragging,
  })
}

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, className, ...otherProps } = props
  const scaleSquareState = componentNode.error ? "error" : "normal"
  const dispatch = useDispatch()
  const selected = useSelector<RootState, boolean>((state) => {
    return (
      state.currentApp.config.selectedComponents.findIndex((value) => {
        return value.displayName == componentNode.displayName
      }) != -1
    )
  })

  const [, dragRef, dragPreviewRef] = useDrag<ComponentNode>(
    () => ({
      type: "components",
      item: componentNode,
      canDrag: !componentNode.isDragging,
    }),
    [componentNode],
  )

  // register resize
  const [, resizeT, resizeTPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "t"),
    [componentNode],
  )

  const [, resizeR, resizeRPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "r"),
    [componentNode],
  )

  const [, resizeB, resizeBPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "b"),
    [componentNode],
  )

  const [, resizeL, resizeLPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "l"),
    [componentNode],
  )

  const [, resizeTl, resizeTlPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "tl"),
    [componentNode],
  )

  const [, resizeTr, resizeTrPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "tr"),
    [componentNode],
  )

  const [, resizeBl, resizeBlPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "bl"),
    [componentNode],
  )

  const [, resizeBr, resizeBrPreviewRef] = useDrag<DragResize>(
    getDragConfig(componentNode, "br"),
    [componentNode],
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
        css={applyBarPointerStyle(selected, scaleSquareState, "t")}
        ref={resizeT}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "r")}
        ref={resizeR}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "b")}
        ref={resizeB}
      />
      <div
        css={applyBarPointerStyle(selected, scaleSquareState, "l")}
        ref={resizeL}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "tl")}
        ref={resizeTl}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "tr")}
        ref={resizeTr}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "bl")}
        ref={resizeBl}
      />
      <div
        css={applySquarePointerStyle(selected, scaleSquareState, "br")}
        ref={resizeBr}
      />
      <div
        ref={mergeRefs(
          dragPreviewRef,
          resizeTPreviewRef,
          resizeRPreviewRef,
          resizeBPreviewRef,
          resizeLPreviewRef,
          resizeTlPreviewRef,
          resizeTrPreviewRef,
          resizeBlPreviewRef,
          resizeBrPreviewRef,
        )}
        css={onePixelStyle}
      />
    </div>
  )
}

ScaleSquare.displayName = "ScaleSquare"
