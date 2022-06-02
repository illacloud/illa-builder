import { FC } from "react"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ListCss } from "./style"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DatasetsListProvider } from "@/page/Editor/components/PanelSetters/DatasetsSetter/context/datasetsListContext"

export const DatasetsSetter: FC<OptionListSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl, handleUpdatePanelConfig } =
    props

  return (
    <DatasetsListProvider
      panelConfig={panelConfig}
      attrName={attrName}
      handleUpdateAllDsl={handleUpdateDsl}
      handleUpdateAllPanelConfig={handleUpdatePanelConfig}
    >
      <OptionListHeader labelName="label" />
      <div css={ListCss}>
        <ListBody />
      </div>
    </DatasetsListProvider>
  )
}

DatasetsSetter.displayName = "OptionListSetter"
