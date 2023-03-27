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

  const isFiltersType = opts.filterBy.type === "filters"

  const handleOnChangeKeyOrValue = useCallback(
    (
      index: number,
      key: string,
      value: string,
      operator: string,
      name?: string,
    ) => {
      const params = opts.filterBy.value as Params[]
      // if (!(name && params.hasOwnProperty(name))) {
      //   return
      // }
      let newList = [...params]
      newList[index] = {
        key,
        value,
        operator,
      }
      // handleValueChange(name)(newList)
    },
    [opts.filterBy.value],
  )

  const handleOnAddKeys = useCallback((name?: string) => {
    // if (name && content.hasOwnProperty(name)) {
    //   const oldList = content[name as keyof typeof content] as Params[]
    //   let newList: Params[] = [...oldList, { key: "", value: "" } as Params]
    // dispatch(
    //   configActions.updateCachedAction({
    //     ...cachedAction,
    //     content: {
    //       ...content,
    //       variables: newList,
    //     },
    //   }),
    // )
    // }
  }, [])

  const handleOnDeleteKeys = useCallback(() => {}, [])

  return (
    <>
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        onChange={onChange}
      />
      {/*{isFiltersType ? (*/}
      {/*  <RecordEditor*/}
      {/*    label={t("editor.action.form.label.gs.filter_by")}*/}
      {/*    records={(opts.filterBy.value ?? []) as Params[]}*/}
      {/*    customRender={(record, index) => (*/}
      {/*      <>*/}
      {/*        <div css={actionItemRecordEditorStyle}>*/}
      {/*          <CodeEditor*/}
      {/*            value={record.key}*/}
      {/*            singleLine*/}
      {/*            onChange={(val) => {*/}
      {/*              handleOnChangeKeyOrValue(*/}
      {/*                index,*/}
      {/*                val,*/}
      {/*                record.value,*/}
      {/*                record.operator,*/}
      {/*              )*/}
      {/*            }}*/}
      {/*            wrapperCss={codeMirrorWrapperLabelStyle}*/}
      {/*            expectValueType={VALIDATION_TYPES.STRING}*/}
      {/*            lang={CODE_LANG.JAVASCRIPT}*/}
      {/*            codeType={CODE_TYPE.EXPRESSION}*/}
      {/*            canShowCompleteInfo*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <Select*/}
      {/*          colorScheme="techPurple"*/}
      {/*          showSearch={true}*/}
      {/*          defaultValue={record.operator}*/}
      {/*          value={record.operator}*/}
      {/*          w="0"*/}
      {/*          // ml="-0.5px"*/}
      {/*          // mr="-0.5px"*/}
      {/*          bdRadius="0"*/}
      {/*          flexGrow="1"*/}
      {/*          onChange={(val) =>*/}
      {/*            handleOnChangeKeyOrValue(*/}
      {/*              index,*/}
      {/*              record.key,*/}
      {/*              record.value,*/}
      {/*              val as string,*/}
      {/*            )*/}
      {/*          }*/}
      {/*          options={["in", "="]}*/}
      {/*        />*/}
      {/*        <div css={actionItemRecordEditorStyle}>*/}
      {/*          <CodeEditor*/}
      {/*            singleLine*/}
      {/*            value={record.value}*/}
      {/*            onChange={(val) => {*/}
      {/*              handleOnChangeKeyOrValue(*/}
      {/*                index,*/}
      {/*                record.key,*/}
      {/*                val,*/}
      {/*                record.operator,*/}
      {/*              )*/}
      {/*            }}*/}
      {/*            wrapperCss={codeMirrorWrapperValueStyle}*/}
      {/*            expectValueType={VALIDATION_TYPES.STRING}*/}
      {/*            lang={CODE_LANG.JAVASCRIPT}*/}
      {/*            codeType={CODE_TYPE.EXPRESSION}*/}
      {/*            canShowCompleteInfo*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*    name="filter"*/}
      {/*    onAdd={handleOnAddKeys}*/}
      {/*    onDelete={handleOnDeleteKeys}*/}
      {/*    onChangeKey={() => {}}*/}
      {/*    onChangeValue={() => {}}*/}
      {/*  />*/}
      {/*) : (*/}
      <InputEditor
        title={t("editor.action.form.label.gs.filter_by")}
        value={JSON.stringify(opts.filterBy.value)}
        onChange={() => {}}
        tips={t("editor.action.form.tips.gs.a1_notation")}
      />
      {/*)}*/}
      <InputEditor
        title={t("editor.action.form.label.gs.update_value")}
        value={opts.updateValue}
        lineNumbers
        style={{ height: "88px" }}
        onChange={onChange("updateValue")}
        placeholder={t("editor.action.form.placeholder.gs.update_value")}
      />
    </>
  )
}
UpdateSpreadsheetSubPanel.displayName = "UpdateSpreadsheetSubPanel"
