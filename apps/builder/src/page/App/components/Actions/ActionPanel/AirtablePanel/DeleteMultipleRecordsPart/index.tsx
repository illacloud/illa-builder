import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableDeleteMultipleRecords,
} from "@/redux/currentApp/action/airtableAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DeleteMultipleRecordsPart: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const content =
    cachedAction.content as AirtableAction<AirtableDeleteMultipleRecords>

  const config = content.config as AirtableDeleteMultipleRecords

  return (
    <InputEditor
      title={t("editor.action.panel.label.airtable.record_ids")}
      value={config.recordIDs}
      placeholder={'{{["1","2","3"]}}'}
      onChange={(value) => {
        dispatch(
          configActions.updateCachedAction({
            ...cachedAction,
            content: {
              ...cachedAction.content,
              config: {
                ...config,
                recordIDs: value,
              },
            },
          }),
        )
      }}
      expectedType={VALIDATION_TYPES.ARRAY}
      mode={CODE_LANG.JAVASCRIPT}
      codeType={CODE_TYPE.EXPRESSION}
      canShowCompleteInfo
    />
  )
}

DeleteMultipleRecordsPart.displayName = "DeleteMultipleRecordsPart"
