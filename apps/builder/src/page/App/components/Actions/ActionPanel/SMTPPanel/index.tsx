import {
  ActionItem,
  SMPTAction,
  SMTPActionContenType,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { actionItemContainer } from "./style"

const SMTPPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(getCachedAction) as ActionItem<SMPTAction>
  const content = cachedAction.content as SMPTAction
  const isHTML = content.contentType === SMTPActionContenType.HTML
  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (name: string) => (value: string | boolean) => {
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
      handleValueChange("setReplyTo")(show)
    },
    [handleValueChange],
  )

  const handleBodyTypeChange = useCallback(() => {
    const contentType = isHTML
      ? SMTPActionContenType.PLAIN
      : SMTPActionContenType.HTML
    handleValueChange("contentType")(contentType)
  }, [handleValueChange, isHTML])

  return (
    <div css={actionItemContainer}>
      <InputEditor
        title={t("editor.action.panel.smtp.from_email")}
        mode={CODE_LANG.JAVASCRIPT}
        value={content.from}
        onChange={handleValueChange("from")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <SingleTypeComponent
        componentType="checkbox"
        value={content.setReplyTo}
        onChange={handleShowReplyToEmail}
        checkoutTitle={t("editor.action.panel.smtp.set_replay_email")}
      />
      {content.setReplyTo && (
        <InputEditor
          title={t("editor.action.panel.smtp.replay_email")}
          mode={CODE_LANG.JAVASCRIPT}
          value={content.replyTo}
          onChange={handleValueChange("replyTo")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      )}
      <InputEditor
        title={t("editor.action.panel.smtp.to_email")}
        mode={CODE_LANG.JAVASCRIPT}
        value={content.to ?? ""}
        placeholder={t("editor.action.panel.smtp.placeholder.emails")}
        onChange={handleValueChange("to")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
      <InputEditor
        title={t("editor.action.panel.smtp.bcc_email")}
        mode={CODE_LANG.JAVASCRIPT}
        placeholder={t("editor.action.panel.smtp.placeholder.emails")}
        value={content.bcc ?? ""}
        onChange={handleValueChange("bcc")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
      <InputEditor
        title={t("editor.action.panel.smtp.cc_email")}
        mode={CODE_LANG.JAVASCRIPT}
        value={content.cc ?? ""}
        placeholder={t("editor.action.panel.smtp.placeholder.emails")}
        onChange={handleValueChange("cc")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
      <InputEditor
        title={t("editor.action.panel.smtp.subject")}
        mode={CODE_LANG.JAVASCRIPT}
        value={content.subject}
        onChange={handleValueChange("subject")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.smtp.body")}
        subtitle={
          isHTML
            ? t("editor.action.panel.smtp.use_raw")
            : t("editor.action.panel.smtp.use_html")
        }
        handleSubtitleClick={handleBodyTypeChange}
        lineNumbers
        style={{ height: "88px" }}
        mode={isHTML ? CODE_LANG.HTML : CODE_LANG.JAVASCRIPT}
        value={content.body}
        onChange={handleValueChange("body")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.smtp.attachment")}
        mode={CODE_LANG.JAVASCRIPT}
        value={content.attachment ?? ""}
        placeholder={t("editor.action.panel.smtp.placeholder.attachment")}
        onChange={handleValueChange("attachment")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
      <TransformerComponent />
    </div>
  )
}

SMTPPanel.displayName = "SMTPPanel"
export default SMTPPanel
