import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import {
  actionTitleBarSpaceStyle,
  actionTitleBarStyle,
  editableTitleBarWrapperStyle,
} from "./style"
import { Button } from "@illa-design/button"
import { useTranslation } from "react-i18next"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { useDispatch, useSelector } from "react-redux"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Api } from "@/api/base"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { Message } from "@illa-design/message"
import { ActionTitleBarProps } from "./interface"
import { EditableText } from "@/components/EditableText"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import {
  onCopyActionItem,
  onDeleteActionItem,
} from "@/page/App/components/Actions/api"
import {
  BodyContentType,
  ElasticSearchAction,
  IDEditorType,
  QueryContentType,
} from "@/redux/currentApp/action/elasticSearchAction"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  S3Action,
  S3ActionRequestType,
  S3ActionTypeContent,
  UploadContent,
} from "@/redux/currentApp/action/s3Action"
import { calculateFileSize } from "../utils/calculateFileSize"

const Item = DropList.Item
export type RunMode = "save" | "run" | "save_and_run"
const MAX_SIZE = 5

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { onActionRun } = props

  const selectedAction = useSelector(getSelectedAction)!
  const cachedAction = useSelector(getCachedAction)

  const getActionFilteredContent = (
    cachedAction: ActionItem<ActionContent> | null,
  ) => {
    let cachedActionValue: ActionItem<ActionContent> | null = cachedAction
    if (!!cachedActionValue && cachedAction?.actionType === "elasticsearch") {
      let content = cachedAction.content as ElasticSearchAction
      if (!IDEditorType.includes(content.operation)) {
        const { id = "", ...otherContent } = content

        cachedActionValue = {
          ...cachedAction,
          content: { ...otherContent },
        }
        content = otherContent
      }
      if (!BodyContentType.includes(content.operation)) {
        const { body = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedActionValue,
          content: { ...otherContent },
        }
        content = otherContent
      }
      if (!QueryContentType.includes(content.operation)) {
        const { query = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedActionValue,
          content: { ...otherContent },
        }
      }
    }
    return cachedActionValue
  }

  const getCanRunS3Action = (
    cachedAction: ActionItem<ActionContent> | null,
  ) => {
    if (!cachedAction || cachedAction.actionType !== "s3") {
      return true
    }
    const content = cachedAction.content as S3Action<S3ActionTypeContent>
    let commandArgs, size

    switch (content.commands) {
      case S3ActionRequestType.UPLOAD:
        commandArgs = content.commandArgs as UploadContent
        size = calculateFileSize(commandArgs.objectData)
        if (size > MAX_SIZE) {
          return false
        }
        break
      case S3ActionRequestType.UPLOAD_MULTIPLE:
        commandArgs = content.commandArgs as UploadContent
        size = calculateFileSize(commandArgs.objectData)
        if (size > MAX_SIZE) {
          return false
        }
        break
    }
    return true
  }

  const isChanged =
    JSON.stringify(selectedAction) !== JSON.stringify(cachedAction)

  const currentApp = useSelector(getAppInfo)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const canRunS3Action = useMemo(
    () => getCanRunS3Action(cachedAction),
    [cachedAction],
  )

  let runMode: RunMode = useMemo(() => {
    if (cachedAction != undefined && isChanged) {
      if (cachedAction.triggerMode === "manually") {
        return "save"
      } else if (cachedAction.triggerMode === "automate") {
        return "save_and_run"
      } else {
        return "save"
      }
    } else {
      return "run"
    }
  }, [isChanged, cachedAction])

  const handleActionOperation = useCallback(() => {
    let cachedActionValue: ActionItem<ActionContent> | null =
      getActionFilteredContent(cachedAction)

    switch (runMode) {
      case "run":
        if (!canRunS3Action) {
          Message.error(t("editor.action.panel.s3.error.max_file"))
          return
        }
        setLoading(true)
        if (cachedActionValue) {
          runAction(cachedActionValue, (result: unknown, error?: boolean) => {
            setLoading(false)
            onActionRun(result, error)
          })
        }
        break
      case "save":
        Api.request(
          {
            method: "PUT",
            url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
            data: cachedActionValue,
          },
          () => {
            if (cachedActionValue) {
              dispatch(actionActions.updateActionItemReducer(cachedActionValue))
            }
          },
          () => {
            Message.error(t("create_fail"))
          },
          () => {
            Message.error(t("create_fail"))
          },
          (l) => {
            setLoading(l)
          },
        )
        break
      case "save_and_run":
        if (!canRunS3Action) {
          Message.error(t("editor.action.panel.s3.error.max_file"))
          return
        }
        Api.request(
          {
            method: "PUT",
            url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
            data: cachedActionValue,
          },
          () => {
            if (cachedActionValue) {
              dispatch(actionActions.updateActionItemReducer(cachedActionValue))
              setLoading(true)

              runAction(
                cachedActionValue,
                (result: unknown, error?: boolean) => {
                  setLoading(false)
                  onActionRun(result, error)
                },
              )
            }
          },
          () => {
            Message.error(t("editor.action.panel.btn.save_fail"))
          },
          () => {
            Message.error(t("editor.action.panel.btn.save_fail"))
          },
          (l) => {
            setLoading(l)
          },
        )
        break
    }
  }, [
    cachedAction,
    runMode,
    canRunS3Action,
    currentApp.appId,
    selectedAction.actionId,
    t,
    onActionRun,
    dispatch,
  ])

  const renderButton = useMemo(() => {
    return runMode === "run" ? cachedAction?.actionType !== "transformer" : true
  }, [cachedAction?.actionType, runMode])

  useEffect(() => {
    // Clear the previous result when changing the selected action
    onActionRun(undefined)
  }, [cachedAction?.actionId, onActionRun])

  if (selectedAction == undefined || cachedAction === undefined) {
    return <></>
  }

  return (
    <div css={actionTitleBarStyle}>
      <div css={editableTitleBarWrapperStyle}>
        <EditableText
          key={selectedAction.displayName}
          displayName={selectedAction.displayName}
          updateDisplayNameByBlur={(value) => {
            const newAction = {
              ...selectedAction,
              displayName: value,
            }
            Api.request(
              {
                method: "PUT",
                url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
                data: newAction,
              },
              () => {
                dispatch(actionActions.updateActionItemReducer(newAction))
              },
              () => {
                Message.error(t("change_fail"))
              },
              () => {
                Message.error(t("change_fail"))
              },
              (l) => {
                setLoading(l)
              },
            )
          }}
        />
      </div>
      <div css={actionTitleBarSpaceStyle} />
      <Dropdown
        position="bottom-end"
        trigger="click"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                onCopyActionItem(selectedAction)
              }}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
              onClick={() => {
                onDeleteActionItem(selectedAction)
              }}
            />
          </DropList>
        }
      >
        <Button colorScheme="grayBlue" leftIcon={<MoreIcon size="14px" />} />
      </Dropdown>
      {renderButton && (
        <Button
          ml="8px"
          colorScheme="techPurple"
          variant={isChanged ? "fill" : "light"}
          size="medium"
          loading={loading}
          leftIcon={<CaretRightIcon />}
          onClick={handleActionOperation}
        >
          {t(`editor.action.panel.btn.${runMode}`)}
        </Button>
      )}
    </div>
  )
}

ActionTitleBar.displayName = "ActionTitleBar"
