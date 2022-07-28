import { FC, useState } from "react"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import {
  actionTitleBarDisplayNameStyle,
  actionTitleBarRunStyle,
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
import { configActions } from "@/redux/config/configSlice"
import { ActionTitleBarProps } from "./interface"
import store from "@/store"
import { EditableText } from "@/components/EditableText"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"

const Item = DropList.Item
export type RunMode = "save" | "run" | "save_and_run"

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { action, onCopy, onDelete } = props

  const originAction = store.getState().currentApp.action.find((v) => {
    return v.displayName === action.displayName
  })

  const isChanged = JSON.stringify(action) !== JSON.stringify(originAction)

  const currentApp = useSelector(getAppInfo)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  let runMode: RunMode = "run"
  if (isChanged) {
    if (action.triggerMode === "manually") {
      runMode = "save"
    } else if (action.triggerMode === "automate") {
      runMode = "save_and_run"
    } else {
      runMode = "save"
    }
  }

  return (
    <div css={actionTitleBarStyle}>
      <div css={editableTitleBarWrapperStyle}>
        <EditableText
          key={action.displayName}
          displayName={action.displayName}
          updateDisplayNameByBlur={() => {}}
        />
      </div>
      <div css={actionTitleBarSpaceStyle} />
      <Dropdown
        position="br"
        trigger="click"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                onCopy(action)
              }}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
              onClick={() => {
                onDelete(action)
              }}
            />
          </DropList>
        }
      >
        <Button colorScheme="grayBlue" leftIcon={<MoreIcon size="14px" />} />
      </Dropdown>
      <Button
        _css={actionTitleBarRunStyle}
        colorScheme="techPurple"
        variant={isChanged ? "fill" : "light"}
        size="medium"
        loading={loading}
        leftIcon={<CaretRightIcon />}
        onClick={() => {
          switch (runMode) {
            case "run":
              runAction(action)
              break
            case "save":
              Api.request(
                {
                  method: "PUT",
                  url: `/apps/${currentApp.appId}/actions/${action.actionId}`,
                  data: action,
                },
                () => {
                  dispatch(actionActions.updateActionItemReducer(action))
                  dispatch(configActions.changeSelectedAction(action))
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
                  url: `/apps/${currentApp.appId}/actions/${action.actionId}`,
                  data: action,
                },
                () => {
                  dispatch(actionActions.updateActionItemReducer(action))
                  dispatch(configActions.changeSelectedAction(action))
                  runAction(action)
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
          }
        }}
      >
        {t(`editor.action.panel.btn.${runMode}`)}
      </Button>
    </div>
  )
}

ActionTitleBar.displayName = "ActionTitleBar"
