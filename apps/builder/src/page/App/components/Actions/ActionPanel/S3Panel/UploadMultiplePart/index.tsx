import { FC } from "react"
import {
  codeEditorLabelStyle,
  s3ItemCodeEditorStyle,
  s3ItemStyle,
} from "@/page/App/components/Actions/ActionPanel/S3Panel/style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  S3Action,
  S3ActionTypeContent,
  UploadMultipleContent,
} from "@/redux/currentApp/action/s3Action"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"

export const UploadMultiplePart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >

  const commandArgs = props.commandArgs as UploadMultipleContent

  return (
    <>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.bucket_name")}
        </span>
        <CodeEditor
          lineNumbers
          height="88px"
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.bucketName}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    bucketName: value,
                  } as UploadMultipleContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.content_type")}
        </span>
        <CodeEditor
          lineNumbers
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.contentType}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    contentType: value,
                  } as UploadMultipleContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.upload_object_name_list")}
        </span>
        <CodeEditor
          lineNumbers
          height="88px"
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          //   value={commandArgs.objectKeyList}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    objectKeyList: value,
                  } as UploadMultipleContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.upload_data_list")}
        </span>
        <CodeEditor
          lineNumbers
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          //   value={commandArgs.objectDataList}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    objectDataList: value,
                  } as UploadMultipleContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

UploadMultiplePart.displayName = "UploadMultiplePart"
