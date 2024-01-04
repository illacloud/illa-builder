import { FC, memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Divider } from "@illa-design/react"
import { PanelHeader } from "@/page/App/components/InspectPanel/components/Header"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { panelBuilder } from "@/page/App/components/InspectPanel/utils/panelBuilder"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { isObject } from "@/utils/typeHelper"
import FieldFactory from "../FieldFactory"
import {
  singleSelectedPanelSetterWrapperStyle,
  singleSelectedPanelWrapperStyle,
} from "./style"

const SingleSelectedPanel: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
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

  const handleUpdateExecutionResult = useCallback(
    (displayName: string, updateSlice: Record<string, unknown>) => {
      if (!isObject(updateSlice)) return
      dispatch(
        executionActions.updateExecutionByDisplayNameReducer({
          displayName,
          value: updateSlice,
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
        handleUpdateExecutionResult={handleUpdateExecutionResult}
        widgetOrAction="WIDGET"
      >
        <div css={singleSelectedPanelWrapperStyle}>
          <PanelHeader />
          <Divider />
          {widgetType === "TABLE_WIDGET" && (
            <Alert
              type="warning"
              title={t("editor.inspect.setter_tips.table_update_title")}
              content={t("editor.inspect.setter_tips.table_update_content")}
            />
          )}
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
