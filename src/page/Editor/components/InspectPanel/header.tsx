import { FC, useContext } from "react"
import { MoreIcon } from "@illa-design/icon"
import { panelHeaderWrapperCss, panelHeaderIconWrapperCss } from "./style"
import { Trigger } from "@illa-design/trigger"
import { ActionMenu } from "./actionMenu"
import { HeaderProps } from "./interface"
import { SelectedPanelContext } from "@/page/Editor/components/InspectPanel/context/selectedContext"
import { WrappedEditableText } from "@/wrappedComponents/EditableText"

export const PanelHeader: FC<HeaderProps> = (props) => {
  const { panelConfig, handleUpdateDsl, handleUpdatePanelConfig } =
    useContext(SelectedPanelContext)
  console.log("PanelHeader", panelConfig)
  return (
    <div css={panelHeaderWrapperCss}>
      <WrappedEditableText
        handleUpdateDsl={(value) => handleUpdateDsl({ type: value })}
        defaultValue={panelConfig.type}
      />
      <div css={panelHeaderIconWrapperCss}>
        <Trigger
          position="br"
          trigger="click"
          content={<ActionMenu componentId="testId" componentType="testType" />}
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
