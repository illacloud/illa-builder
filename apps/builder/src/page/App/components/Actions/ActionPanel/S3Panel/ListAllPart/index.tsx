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
  ListAllContent,
  S3Action,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { Option, Select } from "@illa-design/select"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export const ListAllPart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >

  const commandArgs = props.commandArgs as ListAllContent
  const isShowSignedURL = commandArgs.signedURL

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
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    bucketName: value,
                  } as ListAllContent,
                },
              }),
            )
          }}
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
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    prefix: value,
                  } as ListAllContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.delimiter")}
        </span>
        <CodeEditor
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          value={commandArgs.delimiter}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    delimiter: value,
                  } as ListAllContent,
                },
              }),
            )
          }}
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
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    signedURL: !!value,
                  } as ListAllContent,
                },
              }),
            )
          }}
        >
          <Option value={0} defaultChecked>
            No
          </Option>
          <Option value={1} defaultChecked>
            Yes
          </Option>
        </Select>
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
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...cachedAction,
                  content: {
                    ...cachedAction.content,
                    commandArgs: {
                      ...commandArgs,
                      expiry: +value,
                    } as ListAllContent,
                  },
                }),
              )
            }}
            expectedType={VALIDATION_TYPES.NUMBER}
          />
        </div>
      )}
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.max_keys")}
        </span>
        <CodeEditor
          css={s3ItemCodeEditorStyle}
          mode="TEXT_JS"
          //   value={commandArgs.maxKeys}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  commandArgs: {
                    ...commandArgs,
                    maxKeys: +value,
                  } as ListAllContent,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.NUMBER}
        />
      </div>
    </>
  )
}

ListAllPart.displayName = "ListAllPart"
