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

export const AggregatePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const { control } = props

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.aggregation")}
        </span>
        <CodeEditor
          lineNumbers
          height="88px"
          css={mongoItemCodeEditorStyle}
          mode="TEXT_JS"
          value="typeContent.aggregation"
          onChange={() => {}}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.options")}
        </span>
        <CodeEditor
          lineNumbers
          css={mongoItemCodeEditorStyle}
          mode="TEXT_JS"
          value={"typeContent.options"}
          onChange={() => {}}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

AggregatePart.displayName = "AggregatePart"
