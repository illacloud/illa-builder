import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  codeMirrorWrapperLabelStyle,
  codeMirrorWrapperValueStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/components/CollectionRecordEditor/style"
import { actionItemRecordEditorStyle } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { BasicSheetConfig } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/BasicSheetConfig"
import { GoogleSheetsActionSubPanelProps } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel/interface"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { InputEditor } from "@/page/App/components/InputEditor"
import { GoogleSheetsActionUpdateOpts } from "@/redux/currentApp/action/googleSheetsAction"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UpdateSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange } = props
  const opts = props.opts as GoogleSheetsActionUpdateOpts

  const isFiltersType = opts.filterType === "filter"

  const handleOnChangeKeyOrValue = useCallback(
    (
      index: number,
      key: string,
      value: string,
      operator: string,
      name?: string,
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
      />
      {isFiltersType ? (
        <RecordEditor
          label={t("editor.action.form.label.gs.filter_by")}
          subLabel={
            isFiltersType
              ? t("editor.action.form.option.gs.filter_by.use_row_filters")
              : t("editor.action.form.option.gs.filter_by.use_a1_notation")
          }
          onSubLabelClick={handleSubLabelClick}
          records={(opts.filters ?? []) as Params[]}
          customRender={(record, index) => (
            <>
              <div css={actionItemRecordEditorStyle}>
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
                />
              </div>
              <Select
                colorScheme="techPurple"
                showSearch={true}
                defaultValue={record.operator}
                value={record.operator}
                w="0"
                // ml="-0.5px"
                // mr="-0.5px"
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
                options={["in", "="]}
              />
              <div css={actionItemRecordEditorStyle}>
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
          tips={t("editor.action.form.tips.gs.a1_notation")}
          expectedType={VALIDATION_TYPES.STRING}
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
