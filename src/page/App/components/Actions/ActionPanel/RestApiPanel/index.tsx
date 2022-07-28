import { FC } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  restapiItemLabelStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
import { Input } from "@illa-design/input"
import { useDispatch, useSelector } from "react-redux"
import {
  getSelectedAction,
  getSelectedContent,
} from "@/redux/config/configSelector"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { RootState } from "@/store"
import { configActions } from "@/redux/config/configSlice"

export const RestApiPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const currentAction = useSelector(getSelectedAction) as ActionItem<
    RestApiAction<BodyContent>
  >

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === currentAction.resourceId)
  })!!

  const currentContent = (useSelector(getSelectedContent) ??
    getInitialContent(currentAction.actionType)) as RestApiAction<BodyContent>

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose />
      <div css={restapiItemStyle}>
        <span css={restapiItemLabelStyle}>
          {t("editor.action.resource.restapi.label.action_type")}
        </span>
        <Select
          value={currentContent.method}
          width="160px"
          options={["GET", "POST", "PUT", "PATCH", "DELETE"]}
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...currentAction,
                content: {
                  ...currentContent,
                  method: value,
                },
              }),
            )
          }}
        />
        <Input />
      </div>
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
