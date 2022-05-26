import { FC } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ChildrenPanelProvider } from "@/page/Editor/components/InspectPanel/context/childrenConfigContext"
import { ListCss } from "./style"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export const OptionListSetter: FC<OptionListSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl } = props

  return (
    <ChildrenPanelProvider
      panelConfig={panelConfig}
      attrName={attrName}
      handleUpdateAllDsl={handleUpdateDsl}
    >
      <div css={ListCss}>
        <OptionListHeader labelName="label" />
        <DndProvider backend={HTML5Backend}>
          <ListBody />
        </DndProvider>
      </div>
    </ChildrenPanelProvider>
  )
}

OptionListSetter.displayName = "OptionListSetter"
