import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableUpdateRecord,
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

export const UpdateRecordPart: FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const content = cachedAction.content as AirtableAction<AirtableUpdateRecord>

  const config = content.config as AirtableUpdateRecord
  return (
    <>
      <InputEditor
        title={t("editor.action.panel.label.airtable.record_id")}
        value={config.recordID}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  recordID: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        canShowCompleteInfo
      />
      <InputEditor
        title={t("editor.action.panel.label.airtable.record")}
        value={config.record}
        lineNumbers={true}
        style={{ height: "188px" }}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...cachedAction.content,
                config: {
                  ...config,
                  record: value,
                },
              },
            }),
          )
        }}
        expectedType={VALIDATION_TYPES.OBJECT}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        placeholder={'{{{"fields":{"name":"mongo", "price":"$3.5"}}}}'}
        canShowCompleteInfo
      />
    </>
  )
}

UpdateRecordPart.displayName = "UpdateRecordPart"
