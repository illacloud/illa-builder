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
  DeleteManyContent,
  DeleteManyContentInitial,
} from "@/redux/currentApp/action/mongoDbAction"

export const DeleteManyPart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const { control, content, originalActionType } = props

  const fillContent: DeleteManyContent =
    originalActionType === "deleteMany"
      ? (content as DeleteManyContent)
      : DeleteManyContentInitial

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.filter")}
        </span>
        <Controller
          control={control}
          defaultValue={fillContent.filter}
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
          name="filter"
        />
      </div>
    </>
  )
}

DeleteManyPart.displayName = "DeleteManyPart"
