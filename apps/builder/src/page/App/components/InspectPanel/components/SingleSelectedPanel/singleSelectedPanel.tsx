import { FC, memo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { PanelHeader } from "@/page/App/components/InspectPanel/components/Header"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { isObject } from "@/utils/typeHelper"
import { panelBuilder } from "../../utils/panelBuilder"
import FieldFactory from "../FieldFactory"
import {
  singleSelectedPanelSetterWrapperStyle,
  singleSelectedPanelWrapperStyle,
} from "./style"

const SingleSelectedPanel: FC = () => {
  const dispatch = useDispatch()
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

  const builderPanelConfig = panelBuilder(widgetType)

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
            />
          </div>
        </div>
      </SelectedProvider>
    )
  )
}

SingleSelectedPanel.displayName = "SingleSelectedPanel"
export default memo(SingleSelectedPanel)
