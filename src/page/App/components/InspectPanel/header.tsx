import { FC, useContext } from "react"
import { MoreIcon } from "@illa-design/icon"
import { panelHeaderWrapperStyle, panelHeaderIconWrapperStyle } from "./style"
import { Trigger } from "@illa-design/trigger"
import { ActionMenu } from "./actionMenu"
import { HeaderProps } from "./interface"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"

export const PanelHeader: FC<HeaderProps> = (props) => {
  const { widgetDisplayName, widgetParentDisplayName } =
    useContext(SelectedPanelContext)

  return (
    <div css={panelHeaderWrapperStyle}>
      {/*  TODO: wait for editable component*/}
      <div>{widgetDisplayName}</div>
      <div css={panelHeaderIconWrapperStyle}>
        <Trigger
          position="br"
          trigger="click"
          content={
            <ActionMenu
              widgetParentDisplayName={widgetParentDisplayName}
              widgetDisplayName={widgetDisplayName}
              componentType="testType"
            />
          }
          withoutPadding
          closeOnClick
          clickOutsideToClose
          showArrow={false}
          colorScheme="white"
        >
          <MoreIcon />
        </Trigger>
      </div>
    </div>
  )
}

PanelHeader.displayName = "PanelHeader"
