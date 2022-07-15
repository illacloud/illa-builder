import { FC, useCallback, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { PanelHeader } from "@/page/App/components/InspectPanel/header"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { panelBuilder } from "@/widgetLibrary/panelBuilder"
import { fieldFactory } from "./utils/fieldFactory"
import {
  singleSelectedPanelSetterWrapperStyle,
  singleSelectedPanelWrapperStyle,
} from "@/page/App/components/InspectPanel/style"
import { useDispatch, useSelector } from "react-redux"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

export const SingleSelectedPanel: FC = () => {
  const dispatch = useDispatch()

  const singleSelectedComponentNode = useSelector(
    getComponentNodeBySingleSelected,
  )

  const widgetType = singleSelectedComponentNode?.type || ""

  const widgetDisplayName = singleSelectedComponentNode?.displayName || ""

  const widgetParentDisplayName = singleSelectedComponentNode?.parentNode || ""

  const widgetProps = singleSelectedComponentNode?.props || {}

  const handleUpdateDsl = useCallback(
    (attrPath: string, value: any) => {
      const updateSlice = { [attrPath]: value }
      dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: widgetDisplayName,
          updateSlice,
        }),
      )
    },
    [widgetDisplayName],
  )

  const builderPanelConfig = useMemo(() => {
    return panelBuilder(widgetType)
  }, [widgetType])

  return (
    builderPanelConfig && (
      <SelectedProvider
        widgetType={widgetType}
        widgetDisplayName={widgetDisplayName}
        widgetParentDisplayName={widgetParentDisplayName}
        widgetProps={widgetProps}
        handleUpdateDsl={handleUpdateDsl}
        widgetOrAction="WIDGET"
      >
        <div css={singleSelectedPanelWrapperStyle}>
          <PanelHeader />
          <Divider />
          <div css={singleSelectedPanelSetterWrapperStyle}>
            {fieldFactory(builderPanelConfig, widgetDisplayName)}
          </div>
        </div>
      </SelectedProvider>
    )
  )
}

SingleSelectedPanel.displayName = "SingleSelectedPanel"
