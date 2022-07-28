import { FC, useState } from "react"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import {
  actionTitleBarDisplayNameStyle,
  actionTitleBarRunStyle,
  actionTitleBarSpaceStyle,
  actionTitleBarStyle,
} from "./style"
import { Button } from "@illa-design/button"
import { WrappedEditableText } from "@/widgetLibrary/EditableWidget"
import { useTranslation } from "react-i18next"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { useDispatch, useSelector } from "react-redux"
import {
  getSelectedAction,
  isCurrentSelectedActionChanged,
} from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Api } from "@/api/base"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { Message } from "@illa-design/message"

const Item = DropList.Item
export type RunMode = "save" | "run" | "save_and_run"

export const ActionTitleBar: FC = () => {
  const action = useSelector(getSelectedAction)!!
  const isChanged = useSelector(isCurrentSelectedActionChanged)
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
      {/*TODO @weichen change new component*/}
      <WrappedEditableText
        css={actionTitleBarDisplayNameStyle}
        colorScheme={"techPurple"}
        value={action.displayName}
        handleUpdateDsl={() => {}}
      />
      <div css={actionTitleBarSpaceStyle} />
      <Dropdown
        position="br"
        trigger="click"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
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
