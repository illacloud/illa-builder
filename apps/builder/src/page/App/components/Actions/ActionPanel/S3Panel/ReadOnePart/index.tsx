import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  ReadOneContent,
  S3Action,
  S3ActionTypeContent,
  SelectOption,
} from "@/redux/currentApp/action/s3Action"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ReadOnePart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as ReadOneContent
  const isShowSignedURL = commandArgs.signedURL

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
            } as ReadOneContent,
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
        title={t("editor.action.panel.s3.object_key")}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.objectKey}
        onChange={handleValueChange("objectKey")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <SingleTypeComponent
        showSearch={true}
        componentType="select"
        onChange={(value) => handleValueChange("signedURL")(!!value)}
        options={SelectOption}
        value={+commandArgs.signedURL}
        title={t("editor.action.panel.s3.generate_signed_url")}
        style={{
          position: "relative",
          zIndex: 0,
        }}
      />
      {isShowSignedURL && (
        <InputEditor
          title={t("editor.action.panel.s3.generate_signed_url")}
          key="read"
          mode={CODE_LANG.JAVASCRIPT}
          value={String(commandArgs.expiry)}
          onChange={handleValueChange("expiry")}
          expectedType={VALIDATION_TYPES.NUMBER}
        />
      )}
    </>
  )
}

ReadOnePart.displayName = "ReadOnePart"
