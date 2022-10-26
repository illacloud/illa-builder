import { FC } from "react"
import {
  codeEditorLabelStyle,
  mongoItemCodeEditorStyle,
  mongoItemStyle,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { Controller } from "react-hook-form"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { useTranslation } from "react-i18next"
import { MongoDbActionPartProps } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/interface"
import {
  BulkWriteContent,
  BulkWriteContentInitial,
} from "@/redux/currentApp/action/mongoDbAction"

export const BulkWritePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const { control, content, originalActionType } = props

  const fillContent: BulkWriteContent =
    originalActionType === "bulkWrite"
      ? (content as BulkWriteContent)
      : BulkWriteContentInitial

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.operations")}
        </span>
        <Controller
          control={control}
          defaultValue={fillContent.operations}
          render={({ field: { value, onChange, onBlur } }) => (
            <CodeEditor
              lineNumbers
              height="88px"
              css={mongoItemCodeEditorStyle}
              mode="TEXT_JS"
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              expectedType={VALIDATION_TYPES.STRING}
            />
          )}
          name="operations"
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.options")}
        </span>
        <Controller
          control={control}
          defaultValue={fillContent.options}
          render={({ field: { value, onChange, onBlur } }) => (
            <CodeEditor
              lineNumbers
              css={mongoItemCodeEditorStyle}
              mode="TEXT_JS"
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              expectedType={VALIDATION_TYPES.STRING}
            />
          )}
          name="options"
        />
      </div>
    </>
  )
}

BulkWritePart.displayName = "BulkWritePart"
