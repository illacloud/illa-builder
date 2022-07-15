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

export const RunActionButton: FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const { t } = useTranslation()
  const { isActionDirty, baseActionApi, setIsActionDirty } =
    useContext(ActionEditorContext)
  const params = useParams()

  const { handleUpdateResult } = useContext(ACTION_EDITOR_CONTEXT)
  const activeActionItem = useSelector(getSelectedAction)
  const triggerMode = activeActionItem.actionTemplate?.triggerMode ?? "manual"

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

        // // (get req) will run automatically whenever a parameter changes.
        // TODO: can't understand why this is needed
        // if (
        //   data.actionType === ACTION_TYPE.REST_API &&
        //   data.actionTemplate.method === "GET"
        // ) {
        //   run()
        // }
      },
      () => {},
      () => {},
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }, [activeActionItem, baseActionApi, onLoadingActionResult])

  const run = useCallback(() => {
    executeAction(
      activeActionItem,
      params.versionId || "",
      (response) => {
        handleUpdateResult(response)
      },
      (response) => {
        handleUpdateResult(response)
      },
      () => {},
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }, [activeActionItem, handleUpdateResult, onLoadingActionResult])

  const saveOrRun = useCallback(() => {
    if (isActionDirty) {
      if (triggerMode === "manual") {
        // save only
        save()
      } else {
        // save and run
        save()
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
