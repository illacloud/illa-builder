import { useContext, memo } from "react"
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
import { getIllaMode } from "@/redux/config/configSelector"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { Rnd } from "react-rnd"
import { MoveBar } from "@/page/App/components/ScaleSquare/moveBar"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

const { Item } = DropList

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const { componentNode } = props

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

  return (
    <Rnd
      dragGrid={[componentNode.unitW, componentNode.unitH]}
      resizeGrid={[componentNode.unitW, componentNode.unitH]}
      bounds="#realCanvas"
      default={{
        x: componentNode.x * componentNode.unitW,
        y: componentNode.y * componentNode.unitH,
        width: componentNode.w * componentNode.unitW,
        height: componentNode.h * componentNode.unitH,
      }}
      css={applyRNDWrapperStyle(selected, hasError)}
      onDragStop={(e, data) => {
        const { lastX, lastY } = data
        const x = Math.round(lastX / componentNode.unitW)
        const y = Math.round(lastY / componentNode.unitH)

        const newComponentNode = {
          ...componentNode,
          x,
          y,
        }
        dispatch(
          componentsActions.updateSingleComponentReducer({
            isMove: false,
            componentNode: newComponentNode,
          }),
        )
      }}
      onResizeStop={(e, dir, ref, delta, position) => {
        const realOldWidth = componentNode.w * componentNode.unitW
        const realOldHeight = componentNode.h * componentNode.unitH
        const { width, height } = delta
        const finalWidth = Math.round(
          (realOldWidth + width) / componentNode.unitW,
        )
        const finalHeight = Math.round(
          (realOldHeight + height) / componentNode.unitH,
        )
        const x = Math.round(position.x / componentNode.unitW)
        const y = Math.round(position.y / componentNode.unitH)

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
      }}
    >
      <div
        className="wrapperPending"
        css={applyWrapperPendingStyle(selected, hasError)}
        onClick={(e) => {
          if (scaleSquareState !== "production") {
            dispatch(configActions.updateSelectedComponent([componentNode]))
          }
        }}
      >
        <MoveBar
          isError={hasError}
          displayName={displayName}
          maxWidth={componentNode.w * componentNode.unitW}
          selected={selected}
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
        <div css={applySquarePointerStyle(selected, scaleSquareState, "tl")} />
        <div css={applySquarePointerStyle(selected, scaleSquareState, "tr")} />
        <div css={applySquarePointerStyle(selected, scaleSquareState, "bl")} />
        <div css={applySquarePointerStyle(selected, scaleSquareState, "br")} />
      </div>
    </Rnd>
  )
})

ScaleSquare.displayName = "ScaleSquare"
