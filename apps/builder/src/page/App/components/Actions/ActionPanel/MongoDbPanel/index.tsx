import { FC, useState } from "react"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  mongoContainerStyle,
  mongoItemCodeEditorStyle,
  mongoItemLabelStyle,
  mongoItemStyle,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { Select } from "@illa-design/select"
import { useTranslation } from "react-i18next"
import {
  MongoDbAction,
  MongoDbActionList,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"
import { Controller, useForm } from "react-hook-form"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { AggregatePart } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/AggregatePart"
import { useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"

export const MongoDbPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction)!!

  let content = cachedAction.content as MongoDbAction<MongoDbActionTypeContent>

  const [currentFunction, setCurrentFunction] = useState<string>(
    content.actionType,
  )

  const { control } = useForm()

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose />
      <div css={mongoItemStyle}>
        <span css={mongoItemLabelStyle}>
          {t("editor.action.panel.mongodb.action_type")}
        </span>
        <Controller
          control={control}
          defaultValue={content.actionType}
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
          defaultValue={content.collection}
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
          content={content.typeContent}
          originalActionType={content.actionType}
        />
      )}
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
