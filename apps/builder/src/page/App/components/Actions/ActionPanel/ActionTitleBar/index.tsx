import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { isEqual } from "lodash"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
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
import { EditableText } from "@/components/EditableText"
import { SimpleTabs } from "@/components/Tabs"
import { ACTION_PANEL_TABS } from "@/components/Tabs/constant"
import i18n from "@/i18n/config"
import { isFileOversize } from "@/page/App/components/Actions/ActionPanel/utils/calculateFileSize"
import { onCopyActionItem } from "@/page/App/components/Actions/api"
import {
  getCachedAction,
  getIsILLAGuideMode,
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
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { fetchUpdateAction } from "@/services/action"
import { RootState } from "@/store"
import { runOriginAction } from "@/utils/action/runAction"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { ActionTitleBarProps } from "./interface"
import {
  actionFailBlockStyle,
  actionSuccessBlockStyle,
  actionTextStyle,
  actionTitleBarStyle,
  applyOpenStateStyle,
  editableTitleBarWrapperStyle,
  runResultAndRunContainerStyle,
  tabsContainerStyle,
} from "./style"

const Item = DropListItem
export type RunMode = "save" | "run" | "test_run" | "save_and_run"
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
        const { id: _id = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedAction,
          content: { ...otherContent },
        }
        content = otherContent
      }
      if (!BodyContentType.includes(content.operation)) {
        const { body: _body = "", ...otherContent } = content
        cachedActionValue = {
          ...cachedActionValue,
          content: { ...otherContent },
        }
        content = otherContent
      }
      if (!QueryContentType.includes(content.operation)) {
        const { query: _query = "", ...otherContent } = content
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
  const { onResultVisibleChange, openState, activeTab, handleChangeTab } = props

  const message = useMessage()
  const [saveLoading, setSaveLoading] = useState(false)
  const shortcut = useContext(ShortCutContext)

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

  const isChanged = !isEqual(selectedAction, cachedAction)

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [canRunAction, canNotRunMessage] = getCanRunAction(cachedAction)

  const executionResult = useSelector(getExecutionResult)
  const isGuideOpen = useSelector(getIsILLAGuideMode)

  const renderResult =
    executionResult[selectedAction.displayName]?.data !== undefined ||
    executionResult[selectedAction.displayName]?.runResult !== undefined

  const runError = executionResult[selectedAction.displayName]?.runResult?.error

  let runMode: RunMode = useMemo(() => {
    if (isGuideOpen) {
      if (isChanged) {
        return "save"
      }
      return "test_run"
    }
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
  }, [isChanged, cachedAction, isGuideOpen])

  const innerTabItems = useMemo(() => {
    if (selectedAction.actionType === "transformer") {
      return [ACTION_PANEL_TABS[0]]
    }
    return ACTION_PANEL_TABS
  }, [selectedAction.actionType])

  useEffect(() => {
    if (selectedAction.actionType === "transformer") {
      handleChangeTab("general")
    }
  }, [handleChangeTab, selectedAction.actionType])

  useEffect(() => {
    switch (runMode) {
      case "save": {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
          element: "action_edit_save",
          parameter1: cachedAction.actionType,
        })
        break
      }
      case "run": {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
          element: "action_edit_run",
          parameter1: cachedAction.actionType,
        })
        break
      }
      case "save_and_run": {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
          element: "action_edit_save_run",
          parameter1: cachedAction.actionType,
        })
        break
      }
    }
  }, [cachedAction.actionType, runMode])

  const runCachedAction = useCallback(
    async (cachedActionValue: ActionItem<ActionContent>) => {
      if (cachedActionValue) {
        try {
          await runOriginAction(cachedActionValue)
        } catch (e) {
        } finally {
          onResultVisibleChange(true)
        }
      }
    },
    [onResultVisibleChange],
  )

  const updateAndRunCachedAction = useCallback(
    (cachedActionValue: ActionItem<ActionContent>) => {
      if (cachedActionValue) {
        dispatch(actionActions.updateActionItemReducer(cachedActionValue))
        runCachedAction(cachedActionValue)
      }
    },
    [dispatch, runCachedAction],
  )

  const handleActionOperation = useCallback(async () => {
    let cachedActionValue: ActionItem<ActionContent> =
      getActionFilteredContent(cachedAction)

    switch (runMode) {
      case "test_run":
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        updateAndRunCachedAction(cachedActionValue)
        break
      case "run":
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "action_edit_run",
          parameter1: cachedAction.actionType,
          parameter2: cachedAction,
        })
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        runCachedAction(cachedActionValue)
        break
      case "save":
        if (isGuideOpen) {
          cachedActionValue &&
            dispatch(actionActions.updateActionItemReducer(cachedActionValue))
          return
        }
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "action_edit_save",
          parameter1: cachedAction.actionType,
          parameter2: cachedAction,
        })
        setSaveLoading(true)
        try {
          await fetchUpdateAction(cachedActionValue)
          if (cachedActionValue) {
            dispatch(actionActions.updateActionItemReducer(cachedActionValue))
          }
        } catch (e) {
          message.error({
            content: t("create_fail"),
          })
        }
        setSaveLoading(false)

        break
      case "save_and_run":
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "action_edit_save_run",
          parameter1: cachedAction.actionType,
          parameter2: cachedAction,
        })
        if (!canRunAction) {
          message.error({
            content: canNotRunMessage,
          })
          return
        }
        setSaveLoading(true)
        try {
          await fetchUpdateAction(cachedActionValue)
          updateAndRunCachedAction(cachedActionValue)
        } catch (e) {
          message.error({
            content: t("editor.action.panel.btn.save_fail"),
          })
        }
        setSaveLoading(false)
        break
    }
  }, [
    cachedAction,
    canNotRunMessage,
    canRunAction,
    dispatch,
    isGuideOpen,
    message,
    runCachedAction,
    runMode,
    t,
    updateAndRunCachedAction,
  ])

  const renderButton = useMemo(() => {
    return runMode === "run" || runMode === "test_run"
      ? cachedAction?.actionType !== "transformer"
      : true
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
    <>
      <div css={actionTitleBarStyle}>
        <SimpleTabs
          items={innerTabItems}
          activeKey={activeTab}
          handleClickChangeTab={handleChangeTab}
          containerStyle={tabsContainerStyle}
        />
        <div css={editableTitleBarWrapperStyle}>
          <EditableText
            key={selectedAction.displayName}
            displayName={selectedAction.displayName}
            updateDisplayNameByBlur={async (value) => {
              const newAction = {
                ...selectedAction,
                displayName: value,
              }
              if (isGuideOpen) {
                dispatch(
                  actionActions.updateActionDisplayNameReducer({
                    newDisplayName: value,
                    oldDisplayName: selectedAction.displayName,
                    actionID: newAction.actionID,
                  }),
                )
                return
              }
              setSaveLoading(true)
              try {
                await fetchUpdateAction(newAction)
                dispatch(
                  actionActions.updateActionDisplayNameReducer({
                    newDisplayName: value,
                    oldDisplayName: selectedAction.displayName,
                    actionID: newAction.actionID,
                  }),
                )
              } catch (e) {
                message.error({
                  content: t("change_fail"),
                })
              }
              setSaveLoading(false)
            }}
            onClick={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.RENAME, {
                element: "action_rename",
                parameter1: selectedAction.actionType,
                parameter2: "hover",
              })
            }}
          />
        </div>
        <div css={runResultAndRunContainerStyle}>
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
                    shortcut.showDeleteDialog(
                      [selectedAction.displayName],
                      "action",
                    )
                  }}
                />
              </DropList>
            }
          >
            <Button
              colorScheme="grayBlue"
              leftIcon={<MoreIcon size="14px" />}
            />
          </Dropdown>
          {renderButton && (
            <Button
              pos="relative"
              className={`${cachedAction.displayName}-run`}
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
      </div>
    </>
  )
}

ActionTitleBar.displayName = "ActionTitleBar"
