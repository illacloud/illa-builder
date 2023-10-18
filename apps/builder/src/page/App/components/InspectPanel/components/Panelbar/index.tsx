import { FC } from "react"
import { PanelBar } from "@/components/PanelBar"
import FieldFactory from "../FieldFactory"
import { RenderPanelBarProps } from "./interface"
import { ghostEmptyStyle } from "./style"

const RenderPanelBar: FC<RenderPanelBarProps> = (props) => {
  const { config, displayName, widgetProps } = props
  const { groupName, children } = config

  return (
    <PanelBar title={groupName}>
      {children && children.length > 0 && (
        <div css={ghostEmptyStyle}>
          <FieldFactory
            panelConfig={children}
            displayName={displayName}
            widgetProps={widgetProps}
          />
        </div>
      )}
    </PanelBar>
  )
}

RenderPanelBar.displayName = "RenderPanelBar"

export default RenderPanelBar
