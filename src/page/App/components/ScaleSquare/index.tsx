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
  dragHandlerTextStyle,
  dragIconStyle,
  onePixelStyle,
  warningStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { RootState } from "@/store"
import { DragSourceHookSpec, FactoryOrInstance, useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { mergeRefs } from "@illa-design/system"
import { DragIcon, WarningCircleIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { useTranslation } from "react-i18next"
import { getExecutionError } from "@/redux/currentApp/executionTree/execution/executionSelector"

const { Item } = DropList

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

  const { t } = useTranslation()

  const displayName = componentNode.displayName
  const errors = useSelector(getExecutionError)
  const widgetErrors = errors[displayName] ?? {}
  const hasError = Object.keys(widgetErrors).length > 0

  const scaleSquareState = hasError ? "error" : "normal"
  const dispatch = useDispatch()
  const selected = useSelector<RootState, boolean>((state) => {
    return (
      state.config.selectedComponents.findIndex((value) => {
        return value.displayName == componentNode.displayName
      }) != -1
    )
  })

  const [, dragRef, dragPreviewRef] = useDrag<ComponentNode>(
    () => ({
      type: "components",
      item: () => {
        const item = {
          ...componentNode,
          isDragging: true,
        }
        dispatch(componentsActions.addOrUpdateComponentReducer(item))
        return item
      },
    }),
    [componentNode],
  )

  const [, dragHandlerRef, dragPreviewHandlerRef] = useDrag<ComponentNode>(
    () => ({
      type: "components",
      item: () => {
        const item = {
          ...componentNode,
          isDragging: true,
        }
        dispatch(componentsActions.addOrUpdateComponentReducer(item))
        return item
      },
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
    <Dropdown
      trigger="contextmenu"
      dropList={
        <DropList width="184px">
          <Item
            key="duplicate"
            title={t("editor.context_menu.duplicate")}
            onClick={() => {
              dispatch(
                componentsActions.copyComponentNodeReducer(componentNode),
              )
            }}
          />
          <Item
            fontColor={globalColor(`--${illaPrefix}-red-03`)}
            key="delete"
            title={t("editor.context_menu.delete")}
            onClick={() => {
              dispatch(
                componentsActions.deleteComponentNodeReducer({
                  displayName: componentNode.displayName,
                  parentDisplayName: componentNode.parentNode || "",
                }),
              )
            }}
          />
        </DropList>
      }
    >
      <div
        css={applyOuterStyle(componentNode.isDragging, h, w)}
        className={className}
        onClick={(e) => {
          dispatch(configActions.updateSelectedComponent([componentNode]))
        }}
        {...otherProps}
      >
        <div css={applyBorderStyle(selected, scaleSquareState)}>
          <div
            css={applyTransformWidgetStyle(componentNode.verticalResize)}
            ref={dragRef}
          >
            <TransformWidgetWrapper componentNode={componentNode} />
          </div>
          <div
            className={"handler"}
            ref={dragHandlerRef}
            css={applyHandlerStyle(selected, w, scaleSquareState)}
          >
            <DragIcon css={dragIconStyle} />
            <div css={dragHandlerTextStyle}>{componentNode.displayName}</div>
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
    </Dropdown>
  )
}

ScaleSquare.displayName = "ScaleSquare"
