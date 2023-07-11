import { FC, memo, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { PanelHeader } from "@/page/App/components/InspectPanel/header"
import {
  singleSelectedPanelSetterWrapperStyle,
  singleSelectedPanelWrapperStyle,
} from "@/page/App/components/InspectPanel/style"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getGuideInfo } from "@/redux/guide/guideSelector"
import { isObject } from "@/utils/typeHelper"
import FieldFactory from "./components/FieldFactory"
import { panelBuilder } from "./utils/panelBuilder"

const SingleSelectedPanel: FC = () => {
  const dispatch = useDispatch()

  const guideInfo = useSelector(getGuideInfo)
  const singleSelectedComponentNode = useSelector(
    getComponentNodeBySingleSelected,
  )

  const widgetType = singleSelectedComponentNode?.type || ""

  const widgetDisplayName = singleSelectedComponentNode?.displayName || ""

  const widgetParentDisplayName = singleSelectedComponentNode?.parentNode || ""

  const widgetProps = singleSelectedComponentNode?.props || {}

  const handleUpdateDsl = useCallback(
    (attrPath: string, value: unknown) => {
      const updateSlice = { [attrPath]: value }
      dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: widgetDisplayName,
          updateSlice,
        }),
      )
    },
    [dispatch, widgetDisplayName],
  )

  const handleUpdateMultiAttrDSL = useCallback(
    (updateSlice: Record<string, unknown>) => {
      if (!isObject(updateSlice)) return
      dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: widgetDisplayName,
          updateSlice,
        }),
      )
    },
    [dispatch, widgetDisplayName],
  )

  const handleUpdateOtherMultiAttrDSL = useCallback(
    (displayName: string, updateSlice: Record<string, any>) => {
      if (!displayName || !isObject(updateSlice)) return
      dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName,
          updateSlice,
        }),
      )
    },
    [dispatch],
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
        handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
        handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL}
        widgetOrAction="WIDGET"
      >
        <div css={singleSelectedPanelWrapperStyle}>
          <PanelHeader />
          <Divider />
          <div css={singleSelectedPanelSetterWrapperStyle}>
            <FieldFactory
              panelConfig={builderPanelConfig}
              displayName={widgetDisplayName}
              widgetProps={widgetProps}
              guideInfo={guideInfo}
            />
          </div>
        </div>
      </SelectedProvider>
    )
  )
}

SingleSelectedPanel.displayName = "SingleSelectedPanel"
export default memo(SingleSelectedPanel)
