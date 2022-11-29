import { FC, useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { Dropdown, MoreIcon } from "@illa-design/react"
import { EditableText } from "@/components/EditableText"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
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
