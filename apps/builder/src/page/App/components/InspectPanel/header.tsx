import { FC, useCallback, useContext } from "react"
import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { panelHeaderIconWrapperStyle, panelHeaderWrapperStyle } from "./style"
import { ActionMenu } from "./actionMenu"
import { EditableText } from "@/components/EditableText"
import { useDispatch } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

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
  return (
    <div css={panelHeaderWrapperStyle}>
      <EditableText
        key={widgetDisplayName}
        displayName={widgetDisplayName}
        updateDisplayNameByBlur={handleUpdateDisplayNameByBlur}
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
        >
          <MoreIcon />
        </Dropdown>
      </div>
    </div>
  )
}

PanelHeader.displayName = "PanelHeader"
