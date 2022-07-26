import { FC, useContext } from "react"
import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { panelHeaderIconWrapperStyle, panelHeaderWrapperStyle } from "./style"
import { ActionMenu } from "./actionMenu"
import { EditableText } from "@/components/EditableText"

export const PanelHeader: FC = (props) => {
  const { widgetDisplayName, widgetType, handleUpdateDsl } =
    useContext(SelectedPanelContext)
  return (
    <div css={panelHeaderWrapperStyle}>
      <EditableText
        key={widgetDisplayName}
        displayName={widgetDisplayName}
        updateDisplayNameByBlur={() => {}}
      />
      <div css={panelHeaderIconWrapperStyle}>
        <Dropdown
          position="br"
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
