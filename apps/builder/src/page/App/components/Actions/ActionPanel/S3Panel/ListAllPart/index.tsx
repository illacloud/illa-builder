import { FC } from "react"
import {
  codeEditorLabelStyle,
  s3ItemCodeEditorStyle,
  s3ItemStyle,
} from "@/page/App/components/Actions/ActionPanel/S3Panel/style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Popover } from "@illa-design/popover"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  ListAllContent,
  S3Action,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { Select } from "@illa-design/select"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import { ActionItem } from "@/redux/currentApp/action/actionState"

const SelectOption = [
  {
    label: "No",
    value: 0,
  },
  {
    label: "Yes",
    value: 1,
  },
]

export const ListAllPart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as ListAllContent
  const isShowSignedURL = commandArgs.signedURL

  const handleValueChange = (value: string | boolean, name: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          commandArgs: {
            ...commandArgs,
            [name]: value,
          } as ListAllContent,
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
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.bucketName}
          onChange={(value) => handleValueChange(value, "bucketName")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.prefix_to_filter_reseults")}
        </span>
        <CodeEditor
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.prefix}
          onChange={(value) => handleValueChange(value, "prefix")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <Popover
          title={t("editor.action.panel.s3.tips.delimiter")}
          trigger="hover"
        >
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.s3.delimiter")}
          </span>
        </Popover>
        <CodeEditor
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.delimiter}
          onChange={(value) => handleValueChange(value, "delimiter")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.generate_signed_url")}
        </span>
        <Select
          colorScheme="techPurple"
          showSearch={true}
          value={+commandArgs.signedURL}
          ml="16px"
          width="100%"
          onChange={(value) => handleValueChange(!!value, "signedURL")}
          options={SelectOption}
        />
      </div>
      {isShowSignedURL && (
        <div css={s3ItemStyle}>
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.s3.expiry_duration_of_signed_url")}
          </span>
          <CodeEditor
            css={s3ItemCodeEditorStyle}
            mode="TEXT_JS"
            value={String(commandArgs.expiry)}
            onChange={(value) => handleValueChange(value, "expiry")}
            expectedType={VALIDATION_TYPES.NUMBER}
          />
        </div>
      )}
      <div css={s3ItemStyle}>
        <Popover
          title={t("editor.action.panel.s3.tips.max_keys")}
          trigger="hover"
        >
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.s3.max_keys")}
          </span>
        </Popover>
        <CodeEditor
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.maxKeys}
          onChange={(value) => handleValueChange(value, "maxKeys")}
          expectedType={VALIDATION_TYPES.NUMBER}
        />
      </div>
    </>
  )
}

ListAllPart.displayName = "ListAllPart"
