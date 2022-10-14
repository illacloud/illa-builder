import { FC, useState } from "react"
import { MongoDbPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  codeEditorLabelStyle,
  mongoContainerStyle,
  mongoItemCodeEditorStyle,
  mongoItemLabelStyle,
  mongoItemStyle,
  topDivider,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { Select } from "@illa-design/select"
import { useTranslation } from "react-i18next"
import {
  AggregateContent,
  MongoDbActionList,
} from "@/redux/currentApp/action/mongoDbAction"
import { Controller, useForm } from "react-hook-form"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AggregatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/AggregatePart"

export const MongoDbPanel: FC<MongoDbPanelProps> = (props) => {
  const currentAction = props.action

  const { t } = useTranslation()

  const [currentFunction, setCurrentFunction] = useState<string>(
    currentAction.content.actionType,
  )

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  })

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose action={currentAction} />
      <div css={topDivider} />
      <form>
        <div css={mongoItemStyle}>
          <span css={mongoItemLabelStyle}>
            {t("editor.action.panel.mongodb.action_type")}
          </span>
          <Controller
            control={control}
            defaultValue={currentAction.content.actionType}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                colorScheme="techPurple"
                showSearch={true}
                onBlur={onBlur}
                value={value}
                ml="16px"
                width="100%"
                onChange={(value, event) => {
                  setCurrentFunction(value)
                  onChange(value, event)
                }}
                options={MongoDbActionList}
              />
            )}
            name="actionType"
          />
        </div>
        <div css={mongoItemStyle}>
          <span css={mongoItemLabelStyle}>
            {t("editor.action.panel.mongodb.collection")}
          </span>
          <Controller
            control={control}
            defaultValue={currentAction.content.collection}
            render={({ field: { value, onChange, onBlur } }) => (
              <CodeEditor
                css={mongoItemCodeEditorStyle}
                mode="TEXT_JS"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                expectedType={VALIDATION_TYPES.STRING}
              />
            )}
            name="collection"
          />
        </div>
        {currentFunction === "aggregate" && (
          <AggregatePart
            control={control}
            content={currentAction.content.typeContent}
            originalActionType={currentAction.content.actionType}
          />
        )}
      </form>
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
