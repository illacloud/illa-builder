import {
  ActionItem,
  S3Action,
  S3ActionTypeContent,
  S3DeleteMultipleContent,
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

export const DeleteMultiplePart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as S3DeleteMultipleContent

  const handleValueChange = useCallback(
    (name: string) => (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            commandArgs: {
              ...commandArgs,
              [name]: value,
            } as S3DeleteMultipleContent,
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
      <InputEditor
        title={t("editor.action.panel.s3.object_key_list")}
        mode={CODE_LANG.JAVASCRIPT}
        placeholder={t("editor.action.panel.s3.placeholder.object_key_list")}
        value={commandArgs.objectKeyList}
        onChange={handleValueChange("objectKeyList")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
    </>
  )
}

DeleteMultiplePart.displayName = "DeleteMultiplePart"
