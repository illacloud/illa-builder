import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Popover, Select, SelectOptionObject } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import {
  codeEditorLabelStyle,
  s3ItemCodeEditorStyle,
  s3ItemStyle,
} from "@/page/App/components/Actions/ActionPanel/S3Panel/style"
import { SelectOptions } from "@/page/App/components/PanelSetters/TableSetter/interface"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  ListAllContent,
  S3Action,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const SelectOption: SelectOptionObject[] = [
  {
    label: "No",
    value: 0,
  } as SelectOptionObject,
  {
    label: "Yes",
    value: 1,
  } as SelectOptionObject,
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
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.bucketName}
          onChange={(value) => handleValueChange(value, "bucketName")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.prefix_to_filter_reseults")}
        </span>
        <CodeEditor
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.prefix}
          onChange={(value) => handleValueChange(value, "prefix")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <Popover
          content={t("editor.action.panel.s3.tips.delimiter")}
          hasCloseIcon={false}
          trigger="hover"
          colorScheme="gray"
          showArrow={false}
        >
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.s3.delimiter")}
          </span>
        </Popover>
        <CodeEditor
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.delimiter}
          onChange={(value) => handleValueChange(value, "delimiter")}
          expectValueType={VALIDATION_TYPES.STRING}
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
          w="100%"
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
            wrapperCss={s3ItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            value={String(commandArgs.expiry)}
            onChange={(value) => handleValueChange(value, "expiry")}
            expectValueType={VALIDATION_TYPES.NUMBER}
          />
        </div>
      )}
      <div css={s3ItemStyle}>
        <Popover
          content={t("editor.action.panel.s3.tips.max_keys")}
          colorScheme="gray"
          showArrow={false}
          trigger="hover"
          hasCloseIcon={false}
        >
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.s3.max_keys")}
          </span>
        </Popover>
        <CodeEditor
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.maxKeys}
          onChange={(value) => handleValueChange(value, "maxKeys")}
          expectValueType={VALIDATION_TYPES.NUMBER}
        />
      </div>
    </>
  )
}

ListAllPart.displayName = "ListAllPart"
