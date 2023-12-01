import {
  ActionItem,
  S3Action,
  S3ActionTypeContent,
  S3UploadContent,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import ContentTypeSelect from "../components/ContentTypeSelect"

export const UploadPart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as S3UploadContent
  const handleValueChange = useCallback(
    (name: string) => (value: string | boolean) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            commandArgs: {
              ...commandArgs,
              [name]: value,
            } as S3UploadContent,
          },
        }),
      )
    },
    [cachedAction, commandArgs, dispatch],
  )

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.s3.bucket_name")}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.bucketName}
        onChange={handleValueChange("bucketName")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <ContentTypeSelect
        value={commandArgs.contentType}
        onChange={handleValueChange}
        fx={commandArgs.fx}
      />
      <InputEditor
        title={t("editor.action.panel.s3.upload_object_name")}
        mode={CODE_LANG.JAVASCRIPT}
        placeholder={t("editor.action.panel.s3.placeholder.object_name")}
        value={commandArgs.objectKey}
        onChange={handleValueChange("objectKey")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.s3.upload_data")}
        lineNumbers
        style={{ height: "88px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.objectData}
        onChange={handleValueChange("objectData")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.s3.timeout_upload")}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.expiry}
        onChange={handleValueChange("expiry")}
        expectedType={VALIDATION_TYPES.NUMBER}
      />
    </>
  )
}

UploadPart.displayName = "UploadPart"
