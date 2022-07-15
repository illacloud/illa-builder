import { FC, useMemo } from "react"
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

  const widgetType = useMemo(
    () => singleSelectedComponentNode?.type || "",
    [singleSelectedComponentNode],
  )

  const widgetDisplayName = useMemo(
    () => singleSelectedComponentNode?.displayName || "",
    [singleSelectedComponentNode],
  )

  const widgetParentDisplayName = useMemo(
    () => singleSelectedComponentNode?.parentNode || "",
    [singleSelectedComponentNode],
  )

  const widgetProps = useMemo(
    () => singleSelectedComponentNode?.props || {},
    [singleSelectedComponentNode],
  )

  const handleUpdateDsl = (attrPath: string, value: any) => {
    if (!widgetProps || !widgetDisplayName) return
    const updateSlice = { [attrPath]: value }
    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: widgetDisplayName,
        updateSlice,
      }),
    )
  }

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
