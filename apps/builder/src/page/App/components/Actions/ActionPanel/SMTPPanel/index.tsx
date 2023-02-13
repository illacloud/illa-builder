import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  SMPTAction,
  SMTPActionContenType,
} from "@/redux/currentApp/action/smtpAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  actionItemContainer,
  checkboxItemStyle,
  checkoutContentStyle,
  checkoutItemStyle,
  smtpBodyTypeStyle,
  smtpContainerStyle,
  smtpItemCodeEditorStyle,
  smtpItemLabelStyle,
  smtpItemStyle,
} from "./style"

export const SMTPPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<SMPTAction>
  const content = cachedAction.content as SMPTAction
  const isHTML = content.contentType === SMTPActionContenType.HTML
  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (value: string | boolean, name: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            [name]: value,
          },
        }),
      )
    },
    [dispatch, cachedAction],
  )

  const handleShowReplyToEmail = useCallback(
    (show: boolean) => {
      handleValueChange(show, "setReplyTo")
    },
    [handleValueChange],
  )

  const handleBodyTypeChange = useCallback(() => {
    const contentType = isHTML
      ? SMTPActionContenType.PLAIN
      : SMTPActionContenType.HTML
    handleValueChange(contentType, "contentType")
  }, [handleValueChange, isHTML])

  return (
    <div css={smtpContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            {t("editor.action.panel.smtp.from_email")}
          </span>
          <CodeEditor
            singleLine
            wrapperCss={smtpItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            value={content.from}
            onChange={(value) => handleValueChange(value, "from")}
            expectValueType={VALIDATION_TYPES.STRING}
          />
        </div>
        <div css={checkoutItemStyle}>
          <span css={smtpItemLabelStyle}></span>
          <div css={checkoutContentStyle}>
            <Checkbox
              colorScheme="techPurple"
              checked={content.setReplyTo}
              ml="16px"
              onChange={handleShowReplyToEmail}
            />
            <span css={checkboxItemStyle}>
              {t("editor.action.panel.smtp.set_replay_email")}
            </span>
          </div>
        </div>
        {content.setReplyTo && (
          <div css={smtpItemStyle}>
            <span css={smtpItemLabelStyle}>
              {t("editor.action.panel.smtp.replay_email")}
            </span>
            <CodeEditor
              singleLine
              wrapperCss={smtpItemCodeEditorStyle}
              lang={CODE_LANG.JAVASCRIPT}
              value={content.replyTo}
              onChange={(value) => handleValueChange(value, "replyTo")}
              expectValueType={VALIDATION_TYPES.STRING}
            />
          </div>
        )}
        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            {t("editor.action.panel.smtp.to_email")}
          </span>
          <CodeEditor
            singleLine
            wrapperCss={smtpItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            value={content.to}
            placeholder={t("editor.action.panel.smtp.placeholder.emails")}
            onChange={(value) => handleValueChange(value, "to")}
            expectValueType={VALIDATION_TYPES.ARRAY}
          />
        </div>
        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            {t("editor.action.panel.smtp.bcc_email")}
          </span>
          <CodeEditor
            singleLine
            wrapperCss={smtpItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            placeholder={t("editor.action.panel.smtp.placeholder.emails")}
            value={content.bcc}
            onChange={(value) => handleValueChange(value, "bcc")}
            expectValueType={VALIDATION_TYPES.ARRAY}
          />
        </div>

        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            {t("editor.action.panel.smtp.cc_email")}
          </span>
          <CodeEditor
            singleLine
            wrapperCss={smtpItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            value={content.cc}
            placeholder={t("editor.action.panel.smtp.placeholder.emails")}
            onChange={(value) => handleValueChange(value, "cc")}
            expectValueType={VALIDATION_TYPES.ARRAY}
          />
        </div>

        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            {t("editor.action.panel.smtp.subject")}
          </span>
          <CodeEditor
            singleLine
            wrapperCss={smtpItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            value={content.subject}
            onChange={(value) => handleValueChange(value, "subject")}
            expectValueType={VALIDATION_TYPES.STRING}
          />
        </div>
        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            <span>{t("editor.action.panel.smtp.body")}</span>
            <span css={smtpBodyTypeStyle} onClick={handleBodyTypeChange}>
              {isHTML
                ? t("editor.action.panel.smtp.use_raw")
                : t("editor.action.panel.smtp.use_html")}
            </span>
          </span>
          <CodeEditor
            showLineNumbers
            height="88px"
            wrapperCss={smtpItemCodeEditorStyle}
            lang={isHTML ? CODE_LANG.HTML : CODE_LANG.JAVASCRIPT}
            value={content.body}
            onChange={(value) => handleValueChange(value, "body")}
            expectValueType={VALIDATION_TYPES.STRING}
          />
        </div>
        <div css={smtpItemStyle}>
          <span css={smtpItemLabelStyle}>
            {t("editor.action.panel.smtp.attachment")}
          </span>
          <CodeEditor
            singleLine
            wrapperCss={smtpItemCodeEditorStyle}
            lang={CODE_LANG.JAVASCRIPT}
            value={content.attachment}
            placeholder={t("editor.action.panel.smtp.placeholder.attachment")}
            onChange={(value) => handleValueChange(value, "attachment")}
            expectValueType={VALIDATION_TYPES.ARRAY}
          />
        </div>
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

SMTPPanel.displayName = "SMTPPanel"
