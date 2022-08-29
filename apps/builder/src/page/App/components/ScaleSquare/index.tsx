import { useContext, memo, useMemo, useCallback } from "react"
import {
  ScaleSquareProps,
  ScaleSquareType,
} from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applyRNDWrapperStyle,
  applySquarePointerStyle,
  applyWrapperPendingStyle,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { RootState } from "@/store"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { useTranslation } from "react-i18next"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import {
  getIllaMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { Rnd } from "react-rnd"
import { MoveBar } from "@/page/App/components/ScaleSquare/moveBar"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DragCollectedInfo } from "@/page/App/components/DotPanel/interface"
import { endDrag, startDrag } from "@/utils/drag/drag"
import { dragPreviewStyle } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/style"

const { Item } = DropList

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const { componentNode, unitW, unitH, w, h, x, y } = props

  const { t } = useTranslation()
  const isShowCanvasDot = useSelector(isShowDot)

  const illaMode = useSelector(getIllaMode)
  const displayName = componentNode.displayName
  const errors = useSelector(getExecutionError)
  const widgetErrors = errors[displayName] ?? {}
  const hasError = Object.keys(widgetErrors).length > 0

  const shortcut = useContext(ShortCutContext)
  const selectedComponents = useSelector(getSelectedComponents)
  const isSelected = useMemo(() => {
    return selectedComponents.some((node) => {
      return node.displayName === componentNode.displayName
    })
  }, [componentNode.displayName, selectedComponents])
  let scaleSquareState: ScaleSquareType = hasError ? "error" : "normal"
  if (illaMode !== "edit") {
    scaleSquareState = "production"
  }

  const dispatch = useDispatch()
  const selected = useSelector<RootState, boolean>((state) => {
    return (
      state.config.selectedComponents.findIndex((value) => {
        return value.displayName == componentNode.displayName
      }) != -1
    )
  })

  const handleOnDragStart = useCallback(() => {
    if (illaMode === "edit") {
      dispatch(configActions.updateSelectedComponent([componentNode]))
    }
  }, [componentNode, dispatch, illaMode])

  const handleOnResizeStop = useCallback(
    (e, dir, ref, delta, position) => {
      const { width, height } = delta
      const finalWidth = Math.round((w + width) / unitW)
      const finalHeight = Math.round((h + height) / unitH)
      const x = Math.round(position.x / unitW)
      const y = Math.round(position.y / unitH)

      const newComponentNode = {
        ...componentNode,
        x,
        y,
        w: finalWidth,
        h: finalHeight,
      }

      dispatch(
        componentsActions.updateSingleComponentReducer({
          isMove: false,
          componentNode: newComponentNode,
        }),
      )
      dispatch(configActions.updateShowDot(false))
    },
    [componentNode, dispatch, h, unitH, unitW, w],
  )

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<
    ComponentNode,
    { isDragging: boolean },
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: () => {
        return illaMode === "edit"
      },
      end: (draggedItem, monitor) => {
        endDrag(draggedItem)
      },
      item: () => {
        startDrag(componentNode, false)
        return componentNode
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }),
    [illaMode, componentNode],
  )

  return (
    <Rnd
      dragGrid={[unitW, unitH]}
      resizeGrid={[unitW, unitH]}
      bounds="#realCanvas"
      size={{
        width: w,
        height: h,
      }}
      position={{
        x: x,
        y: y,
      }}
      enableResizing={illaMode === "edit" && isSelected}
      css={applyRNDWrapperStyle(
        selected,
        hasError,
        isShowCanvasDot,
        isDragging,
        illaMode === "edit",
      )}
      disableDragging
      onResize={() => {
        dispatch(configActions.updateShowDot(true))
      }}
      onResizeStop={handleOnResizeStop}
      minWidth={componentNode.minW * unitW}
      minHeight={componentNode.minH * unitH}
    >
      <Dropdown
        disabled={illaMode !== "edit"}
        position="bottom-end"
        trigger="contextmenu"
        dropList={
          <DropList width="184px">
            <Item
              key="duplicate"
              title={t("editor.context_menu.duplicate")}
              onClick={() => {
                shortcut.copyComponent(componentNode)
              }}
            />
            <Item
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
              key="delete"
              title={t("editor.context_menu.delete")}
              onClick={() => {
                shortcut.showDeleteDialog([componentNode.displayName])
              }}
            />
          </DropList>
        }
      >
        <div
          className="wrapperPending"
          css={applyWrapperPendingStyle(
            selected,
            hasError,
            isDragging,
            illaMode === "edit",
          )}
          onClick={handleOnDragStart}
          onMouseUp={handleOnDragStart}
          ref={dragRef}
          onContextMenu={() => {
            if (illaMode !== "production") {
              dispatch(configActions.updateSelectedComponent([componentNode]))
            }
          }}
        >
          <MoveBar
            isError={hasError}
            displayName={displayName}
            maxWidth={componentNode.w * unitW}
            selected={selected}
            isEditor={illaMode === "edit"}
          />

          <TransformWidgetWrapper componentNode={componentNode} />

          <div css={applyBarHandlerStyle(selected, scaleSquareState, "t")}>
            <div
              className="handler"
              css={applyBarPointerStyle(selected, scaleSquareState, "t")}
            />
          </div>
          <div css={applyBarHandlerStyle(selected, scaleSquareState, "r")}>
            <div
              className="handler"
              css={applyBarPointerStyle(selected, scaleSquareState, "r")}
            />
          </div>
          <div css={applyBarHandlerStyle(selected, scaleSquareState, "b")}>
            <div
              className="handler"
              css={applyBarPointerStyle(selected, scaleSquareState, "b")}
            />
          </div>
          <div css={applyBarHandlerStyle(selected, scaleSquareState, "l")}>
            <div
              className="handler"
              css={applyBarPointerStyle(selected, scaleSquareState, "l")}
            />
          </div>
          <div
            css={applySquarePointerStyle(selected, scaleSquareState, "tl")}
          />
          <div
            css={applySquarePointerStyle(selected, scaleSquareState, "tr")}
          />
          <div
            css={applySquarePointerStyle(selected, scaleSquareState, "bl")}
          />
          <div
            css={applySquarePointerStyle(selected, scaleSquareState, "br")}
          />
        </div>
      </Dropdown>
      <div css={dragPreviewStyle} ref={dragPreviewRef} />
    </Rnd>
  )
})

ScaleSquare.displayName = "ScaleSquare"
