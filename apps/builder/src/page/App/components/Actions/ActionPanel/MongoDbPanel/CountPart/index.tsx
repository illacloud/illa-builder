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

export const CountPart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const { control } = props

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.query")}
        </span>
        <CodeEditor
          lineNumbers
          height="88px"
          css={mongoItemCodeEditorStyle}
          mode="TEXT_JS"
          value={"typeContent.query"}
          onChange={() => {}}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

CountPart.displayName = "CountPart"
