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
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/config/configSlice"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Input } from "@illa-design/input"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { RestApiPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"

export const RestApiPanel: FC<RestApiPanelProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const currentAction = props.action

  const currentContent = props.action.content

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
          borderColor="techPurple"
          css={restApiItemBaseUrlStyle}
          readOnly
        />
        <CodeEditor
          borderRadius="0 8px 8px 0"
          css={restapiItemInputStyle}
          expectedType={VALIDATION_TYPES.STRING}
          value={currentContent.url}
          mode="TEXT_JS"
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...currentAction,
                content: {
                  ...currentContent,
                  url: value,
                },
              }),
            )
          }}
        />
      </div>
      <TransformerComponent />
    </div>
  )
}

RestApiPanel.displayName = "RestApiPanel"
