import { FC, useEffect, useMemo, useState } from "react"
import {
  CaretRightIcon,
  MoreIcon,
  Button,
  Dropdown,
  DropList,
  globalColor,
  illaPrefix,
  Message,
} from "@illa-design/react"
import {
  actionTitleBarSpaceStyle,
  actionTitleBarStyle,
  editableTitleBarWrapperStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Api } from "@/api/base"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
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

const Item = DropList.Item
export type RunMode = "save" | "run" | "save_and_run"

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { onActionRun } = props

  const selectedAction = useSelector(getSelectedAction)
  const cachedAction = useSelector(getCachedAction)

  const isChanged =
    JSON.stringify(selectedAction) !== JSON.stringify(cachedAction)

  const currentApp = useSelector(getAppInfo)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

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
          onClick={() => {
            switch (runMode) {
              case "run":
                setLoading(true)
                if (cachedAction) {
                  runAction(
                    cachedAction,
                    (result: unknown, error?: boolean) => {
                      setLoading(false)
                      onActionRun(result, error)
                    },
                  )
                }
                break
              case "save":
                Api.request(
                  {
                    method: "PUT",
                    url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
                    data: cachedAction,
                  },
                  () => {
                    if (cachedAction) {
                      dispatch(
                        actionActions.updateActionItemReducer(cachedAction),
                      )
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
                Api.request(
                  {
                    method: "PUT",
                    url: `/apps/${currentApp.appId}/actions/${selectedAction.actionId}`,
                    data: cachedAction,
                  },
                  () => {
                    if (cachedAction) {
                      dispatch(
                        actionActions.updateActionItemReducer(cachedAction),
                      )
                      setLoading(true)
                      runAction(
                        cachedAction,
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
          }}
        >
          {t(`editor.action.panel.btn.${runMode}`)}
        </Button>
      )}
    </div>
  )
}

ActionTitleBar.displayName = "ActionTitleBar"
