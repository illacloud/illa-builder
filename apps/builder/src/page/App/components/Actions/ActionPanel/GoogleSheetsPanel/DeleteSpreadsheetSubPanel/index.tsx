import { FC } from "react"
import { useTranslation } from "react-i18next"
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
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { GoogleSheetsActionDeleteOpts } from "@/redux/currentApp/action/googleSheetsAction"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DeleteSpreadsheetSubPanel: FC<GoogleSheetsActionSubPanelProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { onChange } = props
  const opts = props.opts as GoogleSheetsActionDeleteOpts

  return (
    <>
      <BasicSheetConfig
        sheetName={opts.sheetName}
        spreadsheet={opts.spreadsheet}
        onChange={onChange}
      />
      {/*<RecordEditor*/}
      {/*  label={t("editor.action.form.label.gs.filter_by")}*/}
      {/*  records={(opts.filters ?? []) as Params[]}*/}
      {/*  customRender={(record, index) => (*/}
      {/*    <>*/}
      {/*      <div css={actionItemRecordEditorStyle}>*/}
      {/*        <CodeEditor*/}
      {/*          value={record.key}*/}
      {/*          singleLine*/}
      {/*          onChange={(val) => {*/}
      {/*            // handleOnChangeKeyOrValue(*/}
      {/*            //   index,*/}
      {/*            //   val,*/}
      {/*            //   record.value,*/}
      {/*            //   record.operator,*/}
      {/*            // )*/}
      {/*          }}*/}
      {/*          wrapperCss={codeMirrorWrapperLabelStyle}*/}
      {/*          expectValueType={VALIDATION_TYPES.STRING}*/}
      {/*          lang={CODE_LANG.JAVASCRIPT}*/}
      {/*          codeType={CODE_TYPE.EXPRESSION}*/}
      {/*          canShowCompleteInfo*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      /!*<Select*!/*/}
      {/*      /!*  colorScheme="techPurple"*!/*/}
      {/*      /!*  showSearch={true}*!/*/}
      {/*      /!*  defaultValue={record.operator}*!/*/}
      {/*      /!*  value={record.operator}*!/*/}
      {/*      /!*  w="0"*!/*/}
      {/*      /!*  // ml="-0.5px"*!/*/}
      {/*      /!*  // mr="-0.5px"*!/*/}
      {/*      /!*  bdRadius="0"*!/*/}
      {/*      /!*  flexGrow="1"*!/*/}
      {/*      /!*  // onChange={(val) =>*!/*/}
      {/*      /!*  //   // handleOnChangeKeyOrValue(*!/*/}
      {/*      /!*  //   //   index,*!/*/}
      {/*      /!*  //   //   record.key,*!/*/}
      {/*      /!*  //   //   record.value,*!/*/}
      {/*      /!*  //   //   val as string,*!/*/}
      {/*      /!*  //   // )*!/*/}
      {/*      /!*  // }*!/*/}
      {/*      /!*  options={["in", "="]}*!/*/}
      {/*      <div css={actionItemRecordEditorStyle}>*/}
      {/*        <CodeEditor*/}
      {/*          singleLine*/}
      {/*          value={record.value}*/}
      {/*          // onChange={(val) => {*/}
      {/*          //   handleOnChangeKeyOrValue(*/}
      {/*          //     index,*/}
      {/*          //     record.key,*/}
      {/*          //     val,*/}
      {/*          //     record.operator,*/}
      {/*          //   )*/}
      {/*          // }}*/}
      {/*          wrapperCss={codeMirrorWrapperValueStyle}*/}
      {/*          expectValueType={VALIDATION_TYPES.STRING}*/}
      {/*          lang={CODE_LANG.JAVASCRIPT}*/}
      {/*          codeType={CODE_TYPE.EXPRESSION}*/}
      {/*          canShowCompleteInfo*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*  name="filter"*/}
      {/*  // onAdd={handleOnAddKeys}*/}
      {/*  // onDelete={handleOnDeleteKeys}*/}
      {/*  onChangeKey={() => {}}*/}
      {/*  onChangeValue={() => {}}*/}
      {/*/>*/}
      <SingleTypeComponent
        componentType="checkbox"
        value={opts.consider}
        checkoutTitle={t("editor.action.form.label.gs.consider_queries_tha")}
        onBooleanValueChange={onChange("consider")}
      />
    </>
  )
}
DeleteSpreadsheetSubPanel.displayName = "DeleteSpreadsheetSubPanel"
