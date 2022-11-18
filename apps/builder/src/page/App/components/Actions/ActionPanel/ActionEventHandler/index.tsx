import { FC, useCallback } from "react"
import {
  actionEventHandlerStyle,
  actionEventHandlerWrapperStyle,
} from "@/page/App/components/Actions/ActionPanel/ActionEventHandler/style"
import { useTranslation } from "react-i18next"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { configActions } from "@/redux/config/configSlice"
import { ActionContent } from "@/redux/currentApp/action/actionState"
import { cloneDeep } from "lodash"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"

export const ActionEventHandler: FC = () => {
  const { t } = useTranslation()
  const action = useSelector(getCachedAction)
  const dispatch = useDispatch()

  const handleUpdateDsl = useCallback(
    (attrPath: string, value: any) => {
      if (action != undefined) {
        const newActionContent = cloneDeep(action.content || {})

        const updateSlice = { [attrPath]: value }

        const result = getNewWidgetPropsByUpdateSlice(
          action?.displayName ?? "",
          updateSlice,
          newActionContent,
        ) as ActionContent
        dispatch(
          configActions.updateCachedAction({
            ...action,
            content: result,
          }),
        )
      }
    },
    [action, dispatch],
  )

  // keep empty
  const handleUpdateMultiAttrDSL = useCallback(
    (updateSlice: Record<string, any>) => {
      return
    },
    [],
  )

  // keep empty
  const handleUpdateOtherMultiAttrDSL = useCallback(
    (displayName: string, updateSlice: Record<string, any>) => {
      return
    },
    [],
  )

  return (
    <div css={actionEventHandlerWrapperStyle}>
      <div css={actionEventHandlerStyle}>
        {t("editor.action.panel.label.event_handler")}
      </div>
      {action && (
        <SelectedProvider
          widgetType={action.actionType}
          widgetDisplayName={action.displayName}
          widgetParentDisplayName=""
          widgetProps={action.content || {}}
          handleUpdateDsl={handleUpdateDsl}
          handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
          handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL}
          widgetOrAction="ACTION"
        >
          {renderFieldAndLabel(
            generatorEventHandlerConfig(
              "success-event",
              {
                events: [
                  {
                    label: t(
                      "editor.inspect.setter_content.widget_action_type_name.success",
                    ),
                    value: "success",
                  },
                ],
                methods: [],
              },
              t("editor.inspect.setter_label.success"),
              "successEvent",
              "success",
            ),
            action.displayName,
            false,
            "",
          )}
          {renderFieldAndLabel(
            generatorEventHandlerConfig(
              "failed-event",
              {
                events: [
                  {
                    label: t(
                      "editor.inspect.setter_content.widget_action_type_name.fail",
                    ),
                    value: "fail",
                  },
                ],
                methods: [],
              },
              t("editor.inspect.setter_label.failure"),
              "failedEvent",
              "fail",
            ),
            action.displayName,
            false,
            "",
          )}
        </SelectedProvider>
      )}
    </div>
  )
}

ActionEventHandler.displayName = "ActionEventHandler"
