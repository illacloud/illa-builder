import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import {
  codeEditorLabelStyle,
  s3ItemCodeEditorStyle,
  s3ItemStyle,
} from "@/page/App/components/Actions/ActionPanel/S3Panel/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  S3Action,
  S3ActionTypeContent,
  UploadContent,
} from "@/redux/currentApp/action/s3Action"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UploadPart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as UploadContent
  const handleValueChange = (value: string, name: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          commandArgs: {
            ...commandArgs,
            [name]: value,
          } as UploadContent,
        },
      }),
    )
  }

  return (
    <>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.bucket_name")}
        </span>
        <CodeEditor
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.bucketName}
          onChange={(value) => handleValueChange(value, "bucketName")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.content_type")}
        </span>
        <CodeEditor
          singleLine
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.contentType}
          onChange={(value) => handleValueChange(value, "contentType")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.upload_object_name")}
        </span>
        <CodeEditor
          singleLine
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          placeholder={t("editor.action.panel.s3.placeholder.object_name")}
          value={commandArgs.objectKey}
          onChange={(value) => handleValueChange(value, "objectKey")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.upload_data")}
        </span>
        <CodeEditor
          showLineNumbers
          height="88px"
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.objectData}
          onChange={(value) => handleValueChange(value, "objectData")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.timeout_upload")}
        </span>
        <CodeEditor
          singleLine
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.expiry}
          onChange={(value) => handleValueChange(value, "expiry")}
          expectValueType={VALIDATION_TYPES.NUMBER}
        />
      </div>
    </>
  )
}

UploadPart.displayName = "UploadPart"
