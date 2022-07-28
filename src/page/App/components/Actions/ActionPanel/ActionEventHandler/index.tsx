import { FC, useCallback } from "react"
import {
  actionEventHandlerStyle,
  actionEventHandlerWrapperStyle,
} from "@/page/App/components/Actions/ActionPanel/ActionEventHandler/style"
import { useTranslation } from "react-i18next"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { generatorEventHanlderConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHanlderConfig"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { configActions } from "@/redux/config/configSlice"
import { cloneDeep } from "lodash"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { ActionContent } from "@/redux/currentApp/action/actionState"

export const ActionEventHandler: FC = () => {
  const { t } = useTranslation()
  const action = useSelector(getSelectedAction)!
  const dispatch = useDispatch()

  const handleUpdateDsl = useCallback(
    (attrPath: string, value: any) => {
      const newActionContent = cloneDeep(action.content || {})

      const updateSlice = { [attrPath]: value }

      const result = getNewWidgetPropsByUpdateSlice(
        action.displayName,
        updateSlice,
        newActionContent,
      ) as ActionContent
      dispatch(
        configActions.updateSelectedAction({
          ...action,
          content: result,
        }),
      )
    },
    [action.content],
  )

  return (
    <div css={actionEventHandlerWrapperStyle}>
      <div css={actionEventHandlerStyle}>
        {t("editor.action.panel.label.event_handler")}
      </div>
      <SelectedProvider
        widgetType={action.actionType}
        widgetDisplayName={action.displayName}
        widgetParentDisplayName=""
        widgetProps={action.content || {}}
        handleUpdateDsl={handleUpdateDsl}
        widgetOrAction="ACTION"
      >
        {renderFieldAndLabel(
          generatorEventHanlderConfig(
            "success-event",
            ["success"],
            "Success",
            "successEvent",
            "success",
          ),
          action?.displayName || "",
          false,
          "",
        )}
        {renderFieldAndLabel(
          generatorEventHanlderConfig(
            "failed-event",
            ["failed"],
            "Failed",
            "failedEvent",
            "failed",
          ),
          action?.displayName || "",
          false,
          "",
        )}
      </SelectedProvider>
    </div>
  )
}

ActionEventHandler.displayName = "ActionEventHandler"
