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

export const FindOnePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const { control } = props

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.query")}
        </span>
        <Controller
          control={control}
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
          name="typeContent.query"
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.projection")}
        </span>
        <Controller
          control={control}
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
          name="typeContent.projection"
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.skip")}
        </span>
        <Controller
          control={control}
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
          name="typeContent.skip"
        />
      </div>
    </>
  )
}

FindOnePart.displayName = "FindOnePart"
