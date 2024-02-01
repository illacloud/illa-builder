import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { get } from "lodash-es"
import { FC, memo, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { DropList, DropListItem, Dropdown } from "@illa-design/react"
import {
  getIsILLAEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { CopyManager } from "@/utils/copyManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { WrapperContainerProps } from "./interface"
import { applyWrapperPendingStyle, hoverHotSpotStyle } from "./style"

const WrapperContainer: FC<WrapperContainerProps> = (props) => {
  const {
    displayName,
    parentNodeDisplayName,
    widgetHeight,
    widgetType,
    children,
  } = props
  const executionResult = useSelector(getExecutionResult)
  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)

  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isEditMode = useSelector(getIsILLAEditMode)
  const errors = useSelector(getExecutionError)

  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const realProps: Record<string, any> = get(executionResult, displayName, {})

  const hasError = useMemo(() => {
    const widgetErrors = errors[displayName] ?? {}
    return Object.keys(widgetErrors).length > 0
  }, [displayName, errors])
  const isAutoLimitedMode = realProps?.dynamicHeight === "limited"
  const isOverLap =
    isAutoLimitedMode &&
    (realProps?.dynamicMaxHeight === widgetHeight ||
      realProps?.dynamicMinHeight === widgetHeight)

  return (
    <Dropdown
      disabled={!isEditMode}
      position="right-start"
      trigger="contextmenu"
      dropList={
        <DropList w="184px">
          <DropListItem
            value="duplicate"
            title={t("editor.context_menu.duplicate")}
            onClick={() => {
              CopyManager.copyComponentNodeByDisplayName([displayName])
              CopyManager.paste("duplicate")
            }}
          />
          <DropListItem
            deleted
            value="delete"
            title={t("editor.context_menu.delete")}
            onClick={() => {
              shortcut.showDeleteDialog([displayName], "widget", {
                source: "manage_delete",
              })
            }}
          />
        </DropList>
      }
      onVisibleChange={(visible) => {
        if (visible) {
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
            element: "component_management_canvas",
            parameter1: widgetType,
          })
        }
      }}
    >
      <div
        css={hoverHotSpotStyle}
        data-displayname={displayName}
        data-parentnode={parentNodeDisplayName}
      >
        <div
          css={applyWrapperPendingStyle({
            hasError,
            isSelected,
            isEditor: isEditMode,
            isLimitedModeAndOverLap: isOverLap,
          })}
        >
          {children}
        </div>
      </div>
    </Dropdown>
  )
}

WrapperContainer.displayName = "WrapperContainer"

export default memo(WrapperContainer)
