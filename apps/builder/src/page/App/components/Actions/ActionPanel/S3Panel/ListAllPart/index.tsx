import {
  ActionItem,
  S3Action,
  S3ActionTypeContent,
  S3ListAllContent,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { SelectOption } from "../constants"

export const ListAllPart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as S3ListAllContent
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
            } as S3ListAllContent,
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
        title={t("editor.action.panel.s3.prefix_to_filter_reseults")}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.prefix}
        onChange={handleValueChange("prefix")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.s3.delimiter")}
        popoverContent={t("editor.action.panel.s3.tips.delimiter")}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.delimiter}
        onChange={handleValueChange("delimiter")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <SingleTypeComponent
        componentType="select"
        value={+commandArgs.signedURL}
        title={t("editor.action.panel.s3.generate_signed_url")}
        showSearch
        onSelectedValueChange={(value) =>
          handleValueChange("signedURL")(!!value)
        }
        options={SelectOption}
        style={{
          position: "relative",
          zIndex: 0,
        }}
      />
      {isShowSignedURL && (
        <InputEditor
          title={t("editor.action.panel.s3.expiry_duration_of_signed_url")}
          mode={CODE_LANG.JAVASCRIPT}
          value={String(commandArgs.expiry)}
          onChange={handleValueChange("expiry")}
          expectedType={VALIDATION_TYPES.NUMBER}
        />
      )}
      <InputEditor
        title={t("editor.action.panel.s3.max_keys")}
        popoverContent={t("editor.action.panel.s3.tips.max_keys")}
        mode={CODE_LANG.JAVASCRIPT}
        value={commandArgs.maxKeys}
        onChange={handleValueChange("maxKeys")}
        expectedType={VALIDATION_TYPES.NUMBER}
      />
    </>
  )
}

ListAllPart.displayName = "ListAllPart"
