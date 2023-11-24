import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableUpdateMultipleRecords,
} from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UpdateMultipleRecordsPart: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const content =
    cachedAction.content as AirtableAction<AirtableUpdateMultipleRecords>

  const config = content.config as AirtableUpdateMultipleRecords
  return (
    <InputEditor
      title={t("editor.action.panel.label.airtable.records")}
      value={config.records}
      style={{ height: "188px" }}
      onChange={(value) => {
        dispatch(
          configActions.updateCachedAction({
            ...cachedAction,
            content: {
              ...cachedAction.content,
              config: {
                ...config,
                records: value,
              },
            },
          }),
        )
      }}
      lineNumbers={true}
      expectedType={VALIDATION_TYPES.ARRAY}
      placeholder={
        '{{\n  [\n    {"id":"xxxxxx","fields":{"name":"mongo", "price":"$3.5"}},\n    {"id":"xxxxxx","fields":{"name":"apple", "price":"$2.7"}}\n  ]\n}}'
      }
      mode={CODE_LANG.JAVASCRIPT}
      codeType={CODE_TYPE.EXPRESSION}
      canShowCompleteInfo
    />
  )
}

UpdateMultipleRecordsPart.displayName = "UpdateMultipleRecordsPart"
