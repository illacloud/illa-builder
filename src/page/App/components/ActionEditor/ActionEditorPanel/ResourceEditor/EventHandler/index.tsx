import { useTranslation } from "react-i18next"
import { handlerTitleStyle } from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { fieldFactory } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { EVENT_HANDLER_CONFIG } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/EventHandler/eventHandlerConfig"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { useCallback, useContext, useMemo } from "react"
import { configActions } from "@/redux/config/configSlice"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"

export const EventHandler = () => {
  const { t } = useTranslation()
  const activeActionItem = useSelector(getSelectedAction)
  const dispatch = useDispatch()
  const { setIsActionDirty } = useContext(ActionEditorContext)

  const widgetType = activeActionItem.actionType

  const widgetDisplayName = activeActionItem.displayName

  const widgetProps = activeActionItem.actionTemplate || {}

  const handleUpdateDsl = useCallback(
    (attrPath: string, value: any) => {
      setIsActionDirty?.(true)
      const updateSlice = { [attrPath]: value }

      dispatch(
        configActions.updateSelectActionTemplate({
          displayName: widgetDisplayName,
          updateSlice,
        }),
      )
    },
    [widgetDisplayName],
  )
  return (
    <>
      <div>
        <div css={handlerTitleStyle}>
          {t("editor.action.panel.label.event_handler")}
        </div>
        <SelectedProvider
          widgetType={widgetType}
          widgetDisplayName="ILLA_REDUX_CONFIG_SELECTED_ACTION"
          widgetParentDisplayName=""
          widgetProps={widgetProps}
          handleUpdateDsl={handleUpdateDsl}
          widgetOrAction="ACTION"
        >
          {fieldFactory(
            EVENT_HANDLER_CONFIG,
            "ILLA_REDUX_CONFIG_SELECTED_ACTION",
          )}
        </SelectedProvider>
      </div>
    </>
  )
}
