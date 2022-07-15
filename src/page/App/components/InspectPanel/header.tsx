import { FC, useContext } from "react"
import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { WrappedEditableText } from "@/widgetLibrary/EditableWidget"
import { panelHeaderIconWrapperStyle, panelHeaderWrapperStyle } from "./style"
import { ActionMenu } from "./actionMenu"

export const PanelHeader: FC = (props) => {
  const { widgetDisplayName, widgetParentDisplayName, widgetType } =
    useContext(SelectedPanelContext)

  return (
    <div css={panelHeaderWrapperStyle}>
      <WrappedEditableText
        colorScheme={"techPurple"}
        value={widgetDisplayName}
        handleUpdateDsl={() => {}}
      />
      <div css={panelHeaderIconWrapperStyle}>
        <Dropdown
          position="br"
          trigger="click"
          dropList={
            <ActionMenu
              widgetParentDisplayName={widgetParentDisplayName}
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
