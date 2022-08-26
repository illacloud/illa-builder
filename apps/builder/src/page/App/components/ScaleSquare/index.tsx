import { FC, useContext, memo } from "react"
import {
  DragResize,
  DragResizeCollected,
  ScaleSquareProps,
  ScaleSquareType,
} from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarHandlerStyle,
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
import store, { RootState } from "@/store"
import { DragSourceHookSpec, FactoryOrInstance, useDrag } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { mergeRefs } from "@illa-design/system"
import { DragIcon, WarningCircleIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { useTranslation } from "react-i18next"
import { getExecutionError } from "@/redux/currentApp/executionTree/executionSelector"
import { getIllaMode } from "@/redux/config/configSelector"
import { endDrag, startDrag } from "@/utils/drag/drag"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { Rnd } from "react-rnd"
import { MoveBar } from "@/page/App/components/ScaleSquare/moveBar"

const { Item } = DropList

function getDragConfig(
  type: ScaleSquareType,
  componentNode: ComponentNode,
  barPosition: BarPosition,
): FactoryOrInstance<
  DragSourceHookSpec<DragResize, unknown, DragResizeCollected>
> {
  return () => ({
    type: "resize",
    item: () => {
      store.dispatch(configActions.updateShowDot(true))
      return {
        node: {
          ...componentNode,
          isResizing: true,
        },
        position: barPosition,
      } as DragResize
    },
    end: (draggedItem, monitor) => {
      store.dispatch(configActions.updateShowDot(false))
      store.dispatch(
        componentsActions.updateComponentResizeState({
          displayName: draggedItem.node.displayName,
          isResizing: false,
        }),
      )
    },
    collect: (monitor) => {
      return {
        resizing: monitor.isDragging(),
      } as DragResizeCollected
    },
    canDrag: () => {
      return type !== "production"
    },
  })
}

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const { w, h, componentNode, className, ...otherProps } = props

  const { t } = useTranslation()

  const illaMode = useSelector(getIllaMode)
  const displayName = componentNode.displayName
  const errors = useSelector(getExecutionError)
  const widgetErrors = errors[displayName] ?? {}
  const hasError = Object.keys(widgetErrors).length > 0

  const shortcut = useContext(ShortCutContext)

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

  const [, dragRef, dragPreviewRef] = useDrag<ComponentNode>(
    () => ({
      canDrag: () => {
        return scaleSquareState !== "production"
      },
      end: (draggedItem, monitor) => {
        endDrag(draggedItem)
      },
      type: "components",
      item: () => {
        const item = {
          ...componentNode,
          isDragging: true,
        }
        startDrag(item, true)
        return item
      },
    }),
    [componentNode, scaleSquareState],
  )

  return (
    <Rnd
      dragGrid={[20, 7]}
      resizeGrid={[20, 7]}
      bounds="parent"
      default={{
        x: componentNode.x * componentNode.unitW,
        y: componentNode.y * componentNode.unitH,
        width: componentNode.w * componentNode.unitW,
        height: componentNode.h * componentNode.unitH,
      }}
      resizeHandleComponent={{}}
    >
      <MoveBar
        isError={hasError}
        displayName={displayName}
        maxWidth={componentNode.w * componentNode.unitW}
      />
      <Dropdown
        disabled={illaMode !== "edit"}
        position="br"
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
        <TransformWidgetWrapper componentNode={componentNode} />
      </Dropdown>
    </Rnd>
  )
})

ScaleSquare.displayName = "ScaleSquare"
