import { FC, useCallback, useContext, useMemo, useRef, useState } from "react"
import { CaretRightIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { useTranslation } from "react-i18next"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { Api } from "@/api/base"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { ACTION_EDITOR_CONTEXT } from "@/page/App/components/ActionEditor/ActionEditorPanel/context/ActionEditorPanelContext"
import { executeAction } from "@/utils/action/execute"
import { useParams } from "react-router-dom"
import { getExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { transformEvents } from "@/widgetLibrary/PublicSector/utils/transformEvents"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { GLOBAL_DATA_CONTEXT } from "@/page/App/context/globalDataProvider"

export const RunActionButton: FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const { t } = useTranslation()
  const params = useParams()
  const activeActionItem = useSelector(getSelectedAction)
  const { handleUpdateResult } = useContext(ACTION_EDITOR_CONTEXT)
  const { isActionDirty, baseActionApi, setIsActionDirty } =
    useContext(ActionEditorContext)
  const triggerMode = activeActionItem.actionTemplate?.triggerMode ?? "manual"
  const displayName = activeActionItem.displayName
  const displayNameMapProps = useSelector(getExecutionResult)
  const { handleUpdateGlobalData, handleDeleteGlobalData, globalData } =
    useContext(GLOBAL_DATA_CONTEXT)

  const realAction = displayNameMapProps["ILLA_REDUX_CONFIG_SELECTED_ACTION"]

  const dispatch = useDispatch()
  const runningIntervalRef = useRef<number>()
  const [duration, setDuration] = useState<string>()

  const runBtnText = useMemo(() => {
    if (isRunning) {
      return duration
    } else {
      if (isActionDirty) {
        return triggerMode === "manual"
          ? t("editor.action.panel.btn.save")
          : t("editor.action.panel.btn.save_and_run")
      } else {
        return t("editor.action.panel.btn.run")
      }
    }
  }, [isRunning, duration, isActionDirty, triggerMode])

  const onLoadingActionResult = useCallback((loading: boolean) => {
    setIsRunning(loading)

    if (loading) {
      clearInterval(runningIntervalRef.current)
      const start = Date.now()
      runningIntervalRef.current = window.setInterval(() => {
        const duration = ((Date.now() - start) / 1000).toFixed(1)
        setDuration(`${duration}s`)
      }, 50)
    } else {
      clearInterval(runningIntervalRef.current)
      setDuration("")
    }
  }, [])

  const save = useCallback(() => {
    return new Promise((resolve, reject) => {
      const { actionId, resourceId, actionType, displayName, actionTemplate } =
        activeActionItem

      Api.request<ActionItem>(
        {
          url: `${baseActionApi}/${actionId}`,
          method: "PUT",
          data: {
            resourceId,
            actionType,
            displayName,
            actionTemplate,
          },
        },
        ({ data }) => {
          dispatch(
            actionActions.updateActionItemReducer({
              ...data,
              actionId,
            }),
          )

          setIsActionDirty?.(false)
          resolve("success")
          // // (get req) will run automatically whenever a parameter changes.
          // TODO: can't understand why this is needed
          // if (
          //   data.actionType === ACTION_TYPE.REST_API &&
          //   data.actionTemplate.method === "GET"
          // ) {
          //   run()
          // }
        },
        () => {
          resolve("success")
        },
        () => {},
        (loading) => {
          onLoadingActionResult(loading)
        },
      )
    })
  }, [activeActionItem, baseActionApi, onLoadingActionResult])

  const run = useCallback(() => {
    executeAction(
      activeActionItem,
      params.versionId || "",
      (response) => {
        handleUpdateResult(response)
        const successEvent = realAction?.successEvent
        if (successEvent) {
          successEvent.forEach((event: any) => {
            const eventObj = transformEvents(event)
            if (!eventObj) return
            const { script, enabled } = eventObj
            if (enabled || enabled == undefined) {
              evaluateDynamicString("events", script, globalData)
              return
            }
          })
        }
      },
      (response) => {
        handleUpdateResult(response)
        const failedEvents = realAction?.failedEvents
        if (failedEvents) {
          failedEvents.forEach((event: any) => {
            const eventObj = transformEvents(event)
            if (!eventObj) return
            const { script, enabled } = eventObj
            if (enabled || enabled == undefined) {
              evaluateDynamicString("events", script, globalData)
              return
            }
          })
        }
      },
      () => {},
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }, [activeActionItem, handleUpdateResult, onLoadingActionResult])

  const saveOrRun = useCallback(async () => {
    if (isActionDirty) {
      if (triggerMode === "manual") {
        // save only
        await save()
      } else {
        // save and run
        await save()
        run()
      }
    } else {
      // run
      run()
    }
  }, [isActionDirty, triggerMode, save, run])

  return (
    <Button
      buttonRadius="8px"
      size="medium"
      colorScheme="techPurple"
      variant="light"
      leftIcon={<CaretRightIcon />}
      loading={isRunning}
      disabled={isRunning || activeActionItem.actionId === ""}
      onClick={saveOrRun}
    >
      {runBtnText}
    </Button>
  )
}
