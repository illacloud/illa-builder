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
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"

export const RunActionButton: FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const { t } = useTranslation()
  const { isActionDirty, baseActionApi, setIsActionDirty } =
    useContext(ActionEditorContext)

  const activeActionItem = useSelector(getSelectedAction)
  const triggerMode = activeActionItem.actionTemplate?.triggerMode ?? "manual"

  const dispatch = useDispatch()
  const runningIntervalRef = useRef<NodeJS.Timer>()
  const [duration, setDuration] = useState<string>()
  const [result, setResult] = useState<ActionResultType>()
  const [actionResVisible, setActionResVisible] = useState(false)

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
      runningIntervalRef.current = setInterval(() => {
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
      },
      () => {},
      () => {},
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }, [activeActionItem, baseActionApi, onLoadingActionResult])

  const run = useCallback(() => {
    const { resourceId, actionType, actionTemplate, displayName } =
      activeActionItem

    if (actionType === "transformer") {
      // TODO: run transformer
      // setResult(activeActionItem.actionTemplate?.transformer)
      // setActionResVisible(true)
      return
    }

    Api.request(
      {
        url: `${baseActionApi}/${activeActionItem?.actionId}/run`,
        method: "POST",
        data: {
          resourceId,
          actionType,
          actionTemplate,
          displayName,
        },
        // TODO: @spike temporay set `User-Agent` in headers,
        // will be removed after handle by server later
        transformRequest: [
          function (data) {
            if (actionType === ACTION_TYPE.REST_API) {
              data.actionTemplate.headers = [
                ...data.actionTemplate.headers,
                ["User-Agent", navigator.userAgent],
              ]
            }

            return JSON.stringify(data)
          },
        ],
      },
      (response) => {
        // save data to action
        dispatch(
          actionActions.updateActionItemReducer({
            ...activeActionItem,
            // TODO: apply Transfomer
            data: response.data,
            rawData: response.data,
            error: false,
          }),
        )

        setResult(response)
        setActionResVisible(true)
      },
      (response) => {
        // empty data if has error
        dispatch(
          actionActions.updateActionItemReducer({
            ...activeActionItem,
            // TODO: apply Transfomer
            data: response.data,
            rawData: response.data,
            error: true,
          }),
        )
        setResult(response)
        setActionResVisible(true)
      },
      () => {},
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }, [activeActionItem, baseActionApi, onLoadingActionResult])

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
