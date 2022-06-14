import { FC, useContext, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { PanelHeader } from "@/page/App/components/InspectPanel/header"
import { SelectedPanelContext } from "@/page/App/components/InspectPanel/context/selectedContext"
import { panelBuilder } from "@/wrappedComponents/PanelBuilder"
import { fieldFactory } from "./utils/fieldFactory"
import {
  singleSelectedPanelSetterWrapperStyle,
  singleSelectedPanelWrapperStyle,
} from "@/page/App/components/InspectPanel/style"

export const SingleSelectedPanel: FC = () => {
  const { panelConfig } = useContext(SelectedPanelContext)

  const builderPanelConfig = useMemo(() => {
    const componentType = panelConfig.widgetType
    return panelBuilder(componentType)
  }, [panelConfig])

  return (
    builderPanelConfig && (
      <div css={singleSelectedPanelWrapperStyle}>
        <Divider />
        <PanelHeader />
        <Divider />
        <div css={singleSelectedPanelSetterWrapperStyle}>
          {fieldFactory(builderPanelConfig, panelConfig.widgetDisplayName)}
        </div>
      </div>
    )
  )
}

SingleSelectedPanel.displayName = "SingleSelectedPanel"
