import { GoogleSheetsActionReadOpts } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
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
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  optionLabelContainerStyle,
  optionLabelStyle,
  radioGroupContainerStyle,
} from "./style"

export const ReadSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange, spreadsheetsOption } = props
  const opts = props.opts as GoogleSheetsActionReadOpts
  const { spreadsheet, sheetName, fx } = opts

  return (
    <>
      <BasicSheetConfig
        spreadsheet={spreadsheet}
        sheetName={sheetName}
        onChange={onChange}
        spreadsheetsOption={spreadsheetsOption}
        fx={fx}
        isHiddenSheetName={opts.rangeType === "a1"}
      />
      <Divider direction="horizontal" w="unset" />
      <div css={optionLabelContainerStyle}>
        <span css={optionLabelStyle}>
          {t("editor.action.form.label.gs.data_range")}
        </span>
        <div css={radioGroupContainerStyle}>
          <RadioGroup
            type="button"
            value={opts.rangeType}
            defaultValue={opts.rangeType}
            options={ReadGoogleSheetsActionOptions}
            onChange={onChange("rangeType")}
          />
        </div>
      </div>
      {opts.rangeType === "limit" && (
        <div css={sheetConfigContainerStyle}>
          <div css={spreadsheetContainerStyle}>
            <InputEditor
              value={opts.limit ?? ""}
              onChange={onChange("limit")}
              title={t("editor.action.form.label.gs.limit")}
              expectedType={VALIDATION_TYPES.NUMBER}
            />
          </div>
          <div css={spreadsheetContainerStyle}>
            <InputEditor
              value={opts.offset ?? ""}
              onChange={onChange("offset")}
              title={t("editor.action.form.label.gs.offset")}
              expectedType={VALIDATION_TYPES.NUMBER}
            />
          </div>
        </div>
      )}
      {opts.rangeType === "a1" && (
        <InputEditor
          title={t("editor.action.form.label.gs.a1_notation")}
          value={opts.a1Notation}
          onChange={onChange("a1Notation")}
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
