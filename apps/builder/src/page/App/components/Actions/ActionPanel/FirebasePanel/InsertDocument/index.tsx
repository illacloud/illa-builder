import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  codeEditorLabelStyle,
  actionItemCodeEditorStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { Checkbox } from "@illa-design/react"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import {
  FirebaseAction,
  FirebaseContentType,
  InsertDocument,
} from "@/redux/currentApp/action/firebaseAction"
import {
  checkboxItemStyle,
  actionBodyTypeStyle,
  actionItemLabelStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { InputRecordEditor } from "@/page/App/components/InputRecordEditor"
import { Controller, useForm } from "react-hook-form"
import { SMTPActionContenType } from "@/redux/currentApp/action/smtpAction"

export const InsertDocumentPart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    FirebaseAction<FirebaseContentType>
  >
  const options = props.options as InsertDocument
  const isDropdown = options.collectionType === "dropdown"

  const { control } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const handleValueChange = (value: string | boolean, name: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          options: {
            ...options,
            [name]: value,
          },
        },
      }),
    )
  }

  const handleCollectionTypeChange = useCallback(() => {
    const contentType = isDropdown ? "raw" : "dropdown"
    handleValueChange(contentType, "collectionType")
  }, [handleValueChange])

  return (
    <>
      <div css={actionItemStyle}>
        <span css={actionItemLabelStyle}>
          {t("editor.action.panel.firebase.collection")}
          <span css={actionBodyTypeStyle} onClick={handleCollectionTypeChange}>
            {isDropdown
              ? t("editor.action.panel.firebase.use_raw_id")
              : t("editor.action.panel.firebase.use_a_dropdown")}
          </span>
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.collection}
          onChange={(value) => handleValueChange(value, "collection")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>

      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.firebase.document_id")}
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.documentID}
          onChange={(value) => handleValueChange(value, "documentID")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}></span>
        <span>{t("editor.action.panel.firebase.tips.document_id")}</span>
      </div>

      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.firebase.value")}
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.value}
          onChange={(value) => handleValueChange(value, "value")}
          placeholder={t(
            "editor.action.panel.firebase.placeholder.document_value",
          )}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

InsertDocumentPart.displayName = "InsertDocumentPart"
