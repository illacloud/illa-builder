import { cloneDeep } from "lodash"
import { FC, Suspense, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { TriggerProvider } from "@illa-design/react"
import {
  actionEventHandlerStyle,
  actionEventHandlerWrapperStyle,
} from "@/page/App/components/Actions/ActionPanel/ActionEventHandler/style"
import RenderPanelSetter from "@/page/App/components/InspectPanel/components/PanelSetter"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionContent } from "@/redux/currentApp/action/actionState"
import { getNewWidgetPropsByUpdateSlice } from "@/utils/componentNode"
import { isObject } from "@/utils/typeHelper"
import {
  actionFailedEventHandlerConfig,
  actionSuccessEventHandlerConfig,
} from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

export const ActionEventHandler: FC = () => {
  const { t } = useTranslation()
  const action = useSelector(getCachedAction)
  const dispatch = useDispatch()

  const handleUpdateDsl = useCallback(
    (attrPath: string, value: any) => {
      if (action != undefined) {
        const newActionContent = cloneDeep(action.content || {})

        const updateSlice: Record<string, unknown> = { [attrPath]: value }

        const result = getNewWidgetPropsByUpdateSlice(
          updateSlice,
          newActionContent as unknown as Record<string, unknown>,
        ) as unknown as ActionContent
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

  const handleUpdateMultiAttrDSL = useCallback(
    (updateSlice: Record<string, unknown>) => {
      if (!isObject(updateSlice) || action == undefined) return
      const newActionContent = cloneDeep(action.content || {})
      const result = getNewWidgetPropsByUpdateSlice(
        updateSlice,
        newActionContent as unknown as Record<string, unknown>,
      ) as unknown as ActionContent
      dispatch(
        configActions.updateCachedAction({
          ...action,
          content: result,
        }),
      )
    },
    [action, dispatch],
  )

  // keep empty
  const handleUpdateOtherMultiAttrDSL = useCallback(
    (_displayName: string, _updateSlice: Record<string, unknown>) => {
      return
    },
    [],
  )

  return (
    <Suspense>
      <TriggerProvider renderInBody zIndex={10}>
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
              <RenderPanelSetter
                config={actionSuccessEventHandlerConfig}
                displayName={action.displayName}
                isInList={false}
                parentAttrName=""
              />
              <RenderPanelSetter
                config={actionFailedEventHandlerConfig}
                displayName={action.displayName}
                isInList={false}
                parentAttrName=""
              />
            </SelectedProvider>
          )}
        </div>
      </TriggerProvider>
    </Suspense>
  )
}

ActionEventHandler.displayName = "ActionEventHandler"
