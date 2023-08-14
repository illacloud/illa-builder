import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { Dropdown, MoreIcon } from "@illa-design/react"
import { EditableText } from "@/components/EditableText"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ActionMenu } from "./actionMenu"
import { panelHeaderIconWrapperStyle, panelHeaderWrapperStyle } from "./style"

export const PanelHeader: FC = () => {
  const { widgetDisplayName, widgetType } = useContext(SelectedPanelContext)
  const dispatch = useDispatch()

  const handleUpdateDisplayNameByBlur = useCallback(
    (newDisplayName: string) => {
      dispatch(
        componentsActions.updateComponentDisplayNameReducer({
          displayName: widgetDisplayName,
          newDisplayName,
        }),
      )
    },
    [dispatch, widgetDisplayName],
  )

  const onMouseHoverRename = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
      element: "component_rename",
      parameter1: widgetType,
    })
  }, [widgetType])

  const onMouseClickOnRename = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "component_rename",
      parameter1: widgetType,
    })
  }, [widgetType])

  const onBlurOnRename = useCallback(
    (value: string) => {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "component_rename",
        parameter1: widgetType,
        parameter3: value.length,
      })
    },
    [widgetType],
  )

  const onValidateOnRename = useCallback(
    (result: "suc" | "failed") => {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.VALIDATE, {
        element: "component_rename",
        parameter1: widgetType,
        parameter3: result,
      })
    },
    [widgetType],
  )

  return (
    <div css={panelHeaderWrapperStyle}>
      <EditableText
        key={widgetDisplayName}
        displayName={widgetDisplayName}
        updateDisplayNameByBlur={handleUpdateDisplayNameByBlur}
        onMouseEnter={onMouseHoverRename}
        onClick={onMouseClickOnRename}
        onBlur={onBlurOnRename}
        onValidate={onValidateOnRename}
      />
      <div css={panelHeaderIconWrapperStyle}>
        <Dropdown
          position="bottom-end"
          trigger="click"
          dropList={
            <ActionMenu
              widgetDisplayName={widgetDisplayName}
              componentType={widgetType}
            />
          }
          onVisibleChange={(visible) => {
            if (visible) {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
                element: "component_management_left",
                parameter1: widgetType,
              })
            }
          }}
        >
          <MoreIcon />
        </Dropdown>
      </div>
    </div>
  )
}

PanelHeader.displayName = "PanelHeader"
