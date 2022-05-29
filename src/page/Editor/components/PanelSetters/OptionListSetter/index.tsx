import { FC } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { OptionListSetterProvider } from "./context/optionListContext"
import { ListCss } from "./style"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export const OptionListSetter: FC<OptionListSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl, handleUpdateConfigPanel } =
    props

  return (
    <OptionListSetterProvider
      panelConfig={panelConfig}
      attrName={attrName}
      handleUpdateAllDsl={handleUpdateDsl}
      handleUpdateAllConfigPanel={handleUpdateConfigPanel}
    >
      <div css={ListCss}>
        <OptionListHeader labelName="label" />
        <DndProvider backend={HTML5Backend}>
          <ListBody />
        </DndProvider>
      </div>
    </OptionListSetterProvider>
  )
}

OptionListSetter.displayName = "OptionListSetter"
