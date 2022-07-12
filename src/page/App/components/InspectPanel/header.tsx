import { FC, useContext, useState, useCallback } from "react"
import { MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { WrappedEditableText } from "@/widgetLibrary/EditableWidget"
import { panelHeaderWrapperStyle, panelHeaderIconWrapperStyle } from "./style"
import { ActionMenu } from "./actionMenu"
import { HeaderProps } from "./interface"

export const PanelHeader: FC<HeaderProps> = (props) => {
  const { widgetDisplayName, widgetParentDisplayName, widgetType } =
    useContext(SelectedPanelContext)

  const [menuVisible, setMenuVisible] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setMenuVisible(false)
  }, [])

  return (
    <div css={panelHeaderWrapperStyle}>
      <WrappedEditableText
        colorScheme={"techPurple"}
        value={widgetDisplayName}
        handleUpdateDsl={() => {}}
      />
      <div css={panelHeaderIconWrapperStyle}>
        <Dropdown
          popupVisible={menuVisible}
          position="br"
          trigger="click"
          onVisibleChange={(visible) => {
            setMenuVisible(visible)
          }}
          dropList={
            <ActionMenu
              widgetParentDisplayName={widgetParentDisplayName}
              widgetDisplayName={widgetDisplayName}
              componentType={widgetType}
              handleCloseMenu={handleCloseMenu}
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
