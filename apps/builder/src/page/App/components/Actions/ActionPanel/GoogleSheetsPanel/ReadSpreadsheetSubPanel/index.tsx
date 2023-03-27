import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"
import { Divider, RadioGroup } from "@illa-design/react"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import {
  sheetConfigContainerStyle,
  spreadsheetContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/style"
import { ReadGoogleSheetsActionOptions } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/values"
import { InputEditor } from "@/page/App/components/InputEditor"
import { TextLink } from "@/page/User/components/TextLink"
import { GoogleSheetsActionReadOpts } from "@/redux/currentApp/action/googleSheetsAction"
import {
  optionLabelContainerStyle,
  optionLabelStyle,
  radioGroupContainerStyle,
} from "./style"

export const ReadSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()

  const { onChange } = props
  const opts = props.opts as GoogleSheetsActionReadOpts
  const { spreadsheet, sheetName } = opts

  return (
    <>
      <BasicSheetConfig
        spreadsheet={spreadsheet}
        sheetName={sheetName}
        onChange={onChange}
      />
      <Divider direction="horizontal" w="unset" />
      <div css={optionLabelContainerStyle}>
        <span css={optionLabelStyle}>
          {t("editor.action.form.label.gs.data_range")}
        </span>
        <div css={radioGroupContainerStyle}>
          <RadioGroup
            type="button"
            value={opts.dataRange}
            options={ReadGoogleSheetsActionOptions}
          />
        </div>
      </div>
      <div css={sheetConfigContainerStyle}>
        <div css={spreadsheetContainerStyle}>
          <InputEditor
            value={opts.limit ?? ""}
            onChange={onChange("limit")}
            title={t("editor.action.form.label.gs.limit")}
          />
        </div>
        <div css={spreadsheetContainerStyle}>
          <InputEditor
            value={opts.offset ?? ""}
            onChange={onChange("offset")}
            title={t("editor.action.form.label.gs.offset")}
          />
        </div>
      </div>
      {opts.dataRange === "notation" && (
        <InputEditor
          title={t("editor.action.form.label.gs.a1_notation")}
          value={opts.notation}
          onChange={onChange("notation")}
          tips={
            <Trans
              i18nKey="editor.action.form.tips.gs.to_select_the_first_"
              t={t}
              components={[
                <TextLink
                  key="notation-link"
                  onClick={() => {
                    window.open(
                      "https://developers.google.com/sheets/api/guides/concepts#a1_notation",
                      "_blank",
                    )
                  }}
                />,
              ]}
            />
          }
        />
      )}
    </>
  )
}

ReadSpreadsheetSubPanel.displayName = "ReadSpreadsheetSubPanel"
