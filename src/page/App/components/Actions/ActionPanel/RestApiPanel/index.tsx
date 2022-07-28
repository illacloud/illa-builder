import { FC } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  restApiItemBaseUrlStyle,
  restapiItemInputStyle,
  restapiItemLabelStyle,
  restApiItemSelectStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/select"
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
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  Resource,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/resourceState"
import { Input } from "@illa-design/input"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"

export const RestApiPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const currentAction = useSelector(getSelectedAction) as ActionItem<
    RestApiAction<BodyContent>
  >

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === currentAction.resourceId)
  }) as Resource<RestApiResource<RestApiAuth>>

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
          colorScheme="techPurple"
          css={restApiItemSelectStyle}
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
        <Input
          borderRadius="0px"
          borderColor="techPurple"
          css={restApiItemBaseUrlStyle}
          readOnly
          value={currentResource.content.baseUrl}
        />
        <CodeEditor
          borderRadius="0 8px 8px 0"
          css={restapiItemInputStyle}
          expectedType={VALIDATION_TYPES.STRING}
          mode="TEXT_JS"
        />
      </div>
      <TransformerComponent />
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
