import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  CaretRightIcon,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  SuccessCircleIcon,
  UpIcon,
  WarningCircleIcon,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { EditableText } from "@/components/EditableText"
import i18n from "@/i18n/config"
import { isFileOversize } from "@/page/App/components/Actions/ActionPanel/utils/calculateFileSize"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import {
  onCopyActionItem,
  onDeleteActionItem,
} from "@/page/App/components/Actions/api"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  BodyContentType,
  ElasticSearchAction,
  IDEditorType,
  QueryContentType,
} from "@/redux/currentApp/action/elasticSearchAction"
import { SMPTAction } from "@/redux/currentApp/action/smtpAction"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ActionTitleBarProps } from "./interface"
import {
  actionFailBlockStyle,
  actionSuccessBlockStyle,
  actionTextStyle,
  actionTitleBarSpaceStyle,
  actionTitleBarStyle,
  applyOpenStateStyle,
  editableTitleBarWrapperStyle,
} from "./style"

const Item = DropListItem
export type RunMode = "save" | "run" | "save_and_run"
const FILE_SIZE_LIMIT_TYPE = ["s3", "smtp"]

const getCanRunAction = (cachedAction: ActionItem<ActionContent> | null) => {
  if (
    !cachedAction ||
    !FILE_SIZE_LIMIT_TYPE.includes(cachedAction.actionType)
  ) {
    return [true, ""]
  }
  switch (cachedAction.actionType) {
    case "smtp":
      const smtpContent = cachedAction.content as SMPTAction
      return [
        !isFileOversize(smtpContent?.attachment || "", "smtp"),
        i18n.t("editor.action.panel.error.max_file"),
      ]
  }
  return [true, ""]
}

const getActionFilteredContent = (cachedAction: ActionItem<ActionContent>) => {
  let cachedActionValue: ActionItem<ActionContent> | null = cachedAction
  if (!cachedActionValue) {
    return cachedActionValue
  }
  switch (cachedAction?.actionType) {
    case "elasticsearch":
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
      break
    case "smtp":
      const smtpContent = cachedAction.content as SMPTAction
      const { to, cc, bcc, attachment, ...otherContent } = smtpContent
      cachedActionValue = {
        ...cachedAction,
        content: {
          ...otherContent,
          // if to, cc, bcc or attachment is empty, remove it from the content
          ...(to && { to }),
          ...(cc && { cc }),
          ...(bcc && { bcc }),
          ...(attachment && { attachment }),
        },
      }
      break
  }
  return cachedActionValue
}

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { onResultVisibleChange, openState } = props

  const message = useMessage()
  const [saveLoading, setSaveLoading] = useState(false)
  const selectedAction = useSelector(getSelectedAction)!
  const cachedAction = useSelector(getCachedAction)!
  const selectedActionExecutionResult = useSelector<
    RootState,
    Record<string, any>
  >((rootState) => {
    const executionResult = getExecutionResult(rootState)
    return executionResult[selectedAction.displayName] || {}
  })
  const isRunning = !!selectedActionExecutionResult.isRunning

  const isChanged =
    JSON.stringify(selectedAction) !== JSON.stringify(cachedAction)
  const currentApp = useSelector(getAppInfo)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [canRunAction, canNotRunMessage] = getCanRunAction(cachedAction)

  const executionResult = useSelector(getExecutionResult)

  const renderResult =
    executionResult[selectedAction.displayName]?.data !== undefined ||
    executionResult[selectedAction.displayName]?.runResult !== undefined

  const runError = executionResult[selectedAction.displayName]?.runResult?.error

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
    let cachedActionValue: ActionItem<ActionContent> =
      getActionFilteredContent(cachedAction)

    switch (runMode) {
      case "run":
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        if (cachedActionValue) {
          runAction(cachedActionValue, () => {
            onResultVisibleChange(true)
          })
        }
        break
      case "save":
        setSaveLoading(true)
        BuilderApi.teamRequest(
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
            message.error({
              content: t("create_fail"),
            })
          },
          () => {
            message.error({
              content: t("create_fail"),
            })
          },
          (loading) => {
            setSaveLoading(loading)
          },
        )
        break
      case "save_and_run":
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        setSaveLoading(true)
        BuilderApi.teamRequest(
          {
            method: "PUT",
            url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
            data: cachedActionValue,
          },
          () => {
            if (cachedActionValue) {
              dispatch(actionActions.updateActionItemReducer(cachedActionValue))
              runAction(cachedActionValue, () => {
                onResultVisibleChange(true)
              })
            }
          },
          () => {
            message.error({
              content: t("editor.action.panel.btn.save_fail"),
            })
          },
          () => {
            message.error({
              content: t("editor.action.panel.btn.save_fail"),
            })
          },
          (loading) => {
            setSaveLoading(loading)
          },
        )
        break
    }
  }, [
    cachedAction,
    runMode,
    canRunAction,
    currentApp.appId,
    selectedAction.actionId,
    message,
    canNotRunMessage,
    onResultVisibleChange,
    dispatch,
    t,
  ])

  const renderButton = useMemo(() => {
    return runMode === "run" ? cachedAction?.actionType !== "transformer" : true
  }, [cachedAction?.actionType, runMode])

  if (cachedAction === undefined) {
    return <></>
  }

  const successBlock = (
    <div
      css={actionSuccessBlockStyle}
      onClick={() => {
        onResultVisibleChange(!openState)
      }}
    >
      <SuccessCircleIcon fs="16px" size="16px" />
      <span css={actionTextStyle}>
        {t("editor.action.panel.status.ran_successfully")}
      </span>
      <UpIcon css={applyOpenStateStyle(openState)} />
    </div>
  )

  const failBlock = (
    <div
      css={actionFailBlockStyle}
      onClick={() => {
        onResultVisibleChange(!openState)
      }}
    >
      <WarningCircleIcon fs="16px" size="16px" />
      <span css={actionTextStyle}>
        {t("editor.action.panel.status.ran_failed")}
      </span>
      <UpIcon css={applyOpenStateStyle(openState)} />
    </div>
  )

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
            setSaveLoading(true)
            BuilderApi.teamRequest(
              {
                method: "PUT",
                url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
                data: newAction,
              },
              () => {
                dispatch(actionActions.updateActionItemReducer(newAction))
              },
              () => {
                message.error({
                  content: t("change_fail"),
                })
              },
              () => {
                message.error({
                  content: t("change_fail"),
                })
              },
              (loading) => {
                setSaveLoading(loading)
              },
            )
          }}
        />
      </div>
      <div css={actionTitleBarSpaceStyle} />
      {renderResult && (runError ? failBlock : successBlock)}
      <Dropdown
        position="bottom-end"
        trigger="click"
        dropList={
          <DropList w="184px">
            <Item
              value="duplicate"
              key="duplicate"
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                onCopyActionItem(selectedAction)
              }}
            />
            <Item
              key="delete"
              value="delete"
              title={t("editor.action.action_list.contextMenu.delete")}
              deleted
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
          loading={isRunning || saveLoading}
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
