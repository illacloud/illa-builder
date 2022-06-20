import { FC } from "react"
import {
  DragResize,
  DragResizeCollected,
  ScaleSquareProps,
} from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarPointerStyle,
  applyBorderStyle,
  applyHandlerStyle,
  applyOuterStyle,
  applySquarePointerStyle,
  applyTransformWidgetStyle,
  BarPosition,
  onePixelStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { RootState } from "@/store"
import { DragSourceHookSpec, FactoryOrInstance, useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { mergeRefs } from "@illa-design/system"
import { DragIcon, WarningCircleIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"

function getDragConfig(
  componentNode: ComponentNode,
  barPosition: BarPosition,
): FactoryOrInstance<
  DragSourceHookSpec<DragResize, unknown, DragResizeCollected>
> {
  return () => ({
    type: "resize",
    item: {
      node: componentNode,
      position: barPosition,
    } as DragResize,
    collect: (monitor) => {
      return {
        resizing: monitor.isDragging(),
      } as DragResizeCollected
    },
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

  const [, dragHandlerRef, dragPreviewHandlerRef] = useDrag<ComponentNode>(
    () => ({
      type: "components",
      item: componentNode,
      canDrag: !componentNode.isDragging,
    }),
    [componentNode],
  )

  // register resize
  const [collectT, resizeT, resizeTPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "t"), [componentNode])

  const [collectR, resizeR, resizeRPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "r"), [componentNode])

  const [collectB, resizeB, resizeBPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "b"), [componentNode])

  const [collectL, resizeL, resizeLPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "l"), [componentNode])

  const [collectTl, resizeTl, resizeTlPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "tl"), [componentNode])

  const [collectTr, resizeTr, resizeTrPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "tr"), [componentNode])

  const [collectBl, resizeBl, resizeBlPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "bl"), [componentNode])

  const [collectBr, resizeBr, resizeBrPreviewRef] = useDrag<
    DragResize,
    unknown,
    DragResizeCollected
  >(getDragConfig(componentNode, "br"), [componentNode])

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
        <div
          css={applyTransformWidgetStyle(componentNode.verticalResize)}
          ref={dragRef}
        >
          <TransformWidget componentNode={componentNode} />
        </div>
        <div
          className={"handler"}
          ref={dragHandlerRef}
          css={applyHandlerStyle(selected, h, scaleSquareState)}
        >
          <DragIcon />
          <span>{componentNode.displayName}</span>
          {scaleSquareState == "error" && (
            <WarningCircleIcon
              color={globalColor(`--${illaPrefix}-white-05`)}
              css={warningStyle}
            />
          )}
        </div>
      </div>
      <div
        css={applyBarPointerStyle(
          selected,
          collectT.resizing,
          scaleSquareState,
          "t",
        )}
        ref={resizeT}
      />
      <div
        css={applyBarPointerStyle(
          selected,
          collectR.resizing,
          scaleSquareState,
          "r",
        )}
        ref={resizeR}
      />
      <div
        css={applyBarPointerStyle(
          selected,
          collectB.resizing,
          scaleSquareState,
          "b",
        )}
        ref={resizeB}
      />
      <div
        css={applyBarPointerStyle(
          selected,
          collectL.resizing,
          scaleSquareState,
          "l",
        )}
        ref={resizeL}
      />
      <div
        css={applySquarePointerStyle(
          selected,
          collectTl.resizing,
          scaleSquareState,
          "tl",
        )}
        ref={resizeTl}
      />
      <div
        css={applySquarePointerStyle(
          selected,
          collectTr.resizing,
          scaleSquareState,
          "tr",
        )}
        ref={resizeTr}
      />
      <div
        css={applySquarePointerStyle(
          selected,
          collectBl.resizing,
          scaleSquareState,
          "bl",
        )}
        ref={resizeBl}
      />
      <div
        css={applySquarePointerStyle(
          selected,
          collectBr.resizing,
          scaleSquareState,
          "br",
        )}
        ref={resizeBr}
      />
      <div
        ref={mergeRefs(
          dragPreviewRef,
          dragPreviewHandlerRef,
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
