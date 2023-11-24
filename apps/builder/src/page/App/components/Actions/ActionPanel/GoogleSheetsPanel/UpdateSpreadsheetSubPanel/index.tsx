import { GoogleSheetsActionUpdateOpts, Params } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { FC, useCallback } from "react"
import { Trans, useTranslation } from "react-i18next"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import {
  codeMirrorWrapperLabelStyle,
  codeMirrorWrapperValueStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionRecordEditor/style"
import { actionItemRecordEditorStyle } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import {
  updateEditorKeyContainerStyle,
  updateEditorValueContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/style"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UpdateSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange, spreadsheetsOption } = props
  const opts = props.opts as GoogleSheetsActionUpdateOpts

  const isFiltersType = opts.filterType === "filter"

  const handleOnChangeKeyOrValue = useCallback(
    (
      index: number,
      key: string,
      value: string,
      operator: string,
      _name?: string,
    ) => {
      const params = opts.filters as Params[]
      let newList = [...params]
      newList[index] = {
        key,
        value,
        operator,
      }
      onChange("filters")(newList)
    },
    [onChange, opts.filters],
  )

  const handleOnAddKeys = useCallback(() => {
    const params = opts.filters as Params[]
    let newList: Params[] = [
      ...params,
      { key: "", value: "", operator: "" } as Params,
    ]
    onChange("filters")(newList)
  }, [onChange, opts.filters])

  const handleOnDeleteKeys = useCallback(
    (index: number) => {
      const params = opts.filters as Params[]
      let newList = [...params]
      newList.splice(index, 1)
      if (newList.length === 0) {
        newList = [{ key: "", value: "", operator: "" } as Params]
      }
      onChange("filters")(newList)
    },
    [onChange, opts.filters],
  )

  const handleSubLabelClick = useCallback(() => {
    const updateValue = opts.filterType === "filter" ? "a1" : "filter"
    onChange("filterType")(updateValue)
  }, [onChange, opts.filterType])

  return (
    <>
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        onChange={onChange}
        isHiddenSheetName={!isFiltersType}
        spreadsheetsOption={spreadsheetsOption}
        fx={opts.fx}
      />
      {isFiltersType ? (
        <RecordEditor
          label={t("editor.action.form.label.gs.filter_by")}
          subLabel={
            isFiltersType
              ? t("editor.action.form.option.gs.filter_by.use_a1_notation")
              : t("editor.action.form.option.gs.filter_by.use_row_filters")
          }
          onSubLabelClick={handleSubLabelClick}
          records={(opts.filters ?? []) as Params[]}
          customRender={(record, index) => (
            <>
              <div
                css={[
                  actionItemRecordEditorStyle,
                  updateEditorKeyContainerStyle,
                ]}
              >
                <CodeEditor
                  value={record.key}
                  singleLine
                  onChange={(val) => {
                    handleOnChangeKeyOrValue(
                      index,
                      val,
                      record.value,
                      record.operator,
                    )
                  }}
                  wrapperCss={codeMirrorWrapperLabelStyle}
                  expectValueType={VALIDATION_TYPES.STRING}
                  lang={CODE_LANG.JAVASCRIPT}
                  codeType={CODE_TYPE.EXPRESSION}
                  canShowCompleteInfo
                  placeholder={t(
                    "editor.action.form.placeholder.gs.row_filter.column_name",
                  )}
                />
              </div>
              <Select
                colorScheme="techPurple"
                showSearch={true}
                defaultValue={record.operator}
                value={record.operator}
                w="0"
                h="32px"
                bdRadius="0"
                flexGrow="1"
                onChange={(val) =>
                  handleOnChangeKeyOrValue(
                    index,
                    record.key,
                    record.value,
                    val as string,
                  )
                }
                options={["="]}
              />
              <div
                css={[
                  actionItemRecordEditorStyle,
                  updateEditorValueContainerStyle,
                ]}
              >
                <CodeEditor
                  singleLine
                  value={record.value}
                  onChange={(val) => {
                    handleOnChangeKeyOrValue(
                      index,
                      record.key,
                      val,
                      record.operator,
                    )
                  }}
                  wrapperCss={codeMirrorWrapperValueStyle}
                  expectValueType={VALIDATION_TYPES.STRING}
                  lang={CODE_LANG.JAVASCRIPT}
                  codeType={CODE_TYPE.EXPRESSION}
                  canShowCompleteInfo
                  placeholder={t(
                    "editor.action.form.placeholder.gs.row_filter.value",
                  )}
                />
              </div>
            </>
          )}
          name="filter"
          onAdd={handleOnAddKeys}
          onDelete={handleOnDeleteKeys}
          onChangeKey={() => {}}
          onChangeValue={() => {}}
        />
      ) : (
        <InputEditor
          title={t("editor.action.form.label.gs.filter_by")}
          value={opts.a1Notation}
          onChange={onChange("a1Notation")}
          tips={
            <Trans
              i18nKey="editor.action.form.tips.gs.a1_notation"
              t={t}
              components={[
                <TextLink
                  key="editor.action.form.tips.gs.a1_notation"
                  onClick={() =>
                    window.open(
                      "https://developers.google.com/sheets/api/guides/concepts#a1_notation",
                      "_blank",
                    )
                  }
                />,
              ]}
            />
          }
          expectedType={VALIDATION_TYPES.STRING}
          subtitle={
            isFiltersType
              ? t("editor.action.form.option.gs.filter_by.use_a1_notation")
              : t("editor.action.form.option.gs.filter_by.use_row_filters")
          }
          handleSubtitleClick={handleSubLabelClick}
        />
      )}
      <InputEditor
        title={t("editor.action.form.label.gs.update_value")}
        value={opts.values}
        lineNumbers
        style={{ height: "88px" }}
        onChange={onChange("values")}
        placeholder={t("editor.action.form.placeholder.gs.update_value")}
        expectedType={VALIDATION_TYPES.ARRAY}
      />
    </>
  )
}
UpdateSpreadsheetSubPanel.displayName = "UpdateSpreadsheetSubPanel"
