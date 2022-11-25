import { useTranslation } from "react-i18next"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  checkboxItemStyle,
  esContainerStyle,
  esItemCodeEditorStyle,
  esItemLabelStyle,
  esItemStyle,
} from "./style"
import { Checkbox } from "@illa-design/Checkbox"
import { CodeEditor } from "@/components/CodeEditor"
import { configActions } from "@/redux/config/configSlice"
import { SMPTAction } from "@/redux/currentApp/action/smtpAction"

export const SMTPPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<SMPTAction>
  const [showReplyToEmail, setShowReplyToEmail] = useState(false)

  const dispatch = useDispatch()

  let content = cachedAction.content as SMPTAction

  const handleValueChange = (value: string | boolean, name: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          [name]: value,
        },
      }),
    )
  }

  const handleShowReplyToEmail = (show: boolean) => {
    setShowReplyToEmail(show)
    handleValueChange(show, "setReplyTo")
  }

  return (
    <div css={esContainerStyle}>
      <ResourceChoose />
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.smtp.from_email")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.replyTo}
          onChange={(value) => handleValueChange(value, "from")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}></span>
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
      {showReplyToEmail && (
        <div css={esItemStyle}>
          <span css={esItemLabelStyle}>
            {t("editor.action.panel.smtp.replay_email")}
          </span>
          <CodeEditor
            css={esItemCodeEditorStyle}
            mode="TEXT_JS"
            value={content.replyTo}
            onChange={(value) => handleValueChange(value, "replyTo")}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      )}
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.smtp.to_email")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.to}
          placeholder={t("editor.action.panel.smtp.placeholder.emails")}
          onChange={(value) => handleValueChange(value, "to")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.smtp.bcc_email")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          placeholder={t("editor.action.panel.smtp.placeholder.emails")}
          value={content.bcc}
          onChange={(value) => handleValueChange(value, "bcc")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>

      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.smtp.cc_email")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.cc}
          placeholder={t("editor.action.panel.smtp.placeholder.emails")}
          onChange={(value) => handleValueChange(value, "cc")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>

      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.smtp.subject")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.subject}
          onChange={(value) => handleValueChange(value, "subject")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>{t("editor.action.panel.smtp.body")}</span>
        <CodeEditor
          lineNumbers
          height="88px"
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.body}
          onChange={(value) => handleValueChange(value, "body")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.smtp.attachment")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.attachment}
          placeholder={t("editor.action.panel.smtp.placeholder.attachment")}
          onChange={(value) => handleValueChange(value, "attachment")}
          expectedType={VALIDATION_TYPES.ARRAY}
        />
      </div>
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

SMTPPanel.displayName = "SMTPPanel"
