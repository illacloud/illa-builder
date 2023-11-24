import { GoogleSheetsActionCreateOpts } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const CreateSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { onChange } = props
  const { t } = useTranslation()
  const opts = props.opts as GoogleSheetsActionCreateOpts

  return (
    <InputEditor
      title={t("editor.action.form.label.gs.title_of_spreadsheet")}
      value={opts.title}
      onChange={onChange("title")}
    />
  )
}
CreateSpreadsheetSubPanel.displayName = "CreateSpreadsheetSubPanel"
