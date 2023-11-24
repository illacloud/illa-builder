import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableCreateRecord,
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

export const CreateRecordsPart: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const config = cachedAction.content.config as AirtableCreateRecord

  const dispatch = useDispatch()

  return (
    <InputEditor
      title={t("editor.action.panel.label.airtable.records")}
      value={config.records}
      lineNumbers={true}
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
      style={{ height: "188px" }}
      expectedType={VALIDATION_TYPES.ARRAY}
      mode={CODE_LANG.JAVASCRIPT}
      placeholder={
        '{{\n  [\n    {"fields": {"name":"mongo", "price":"$3.5"}},\n    {"fields":  {"name":"apple", "price":"$2.7"}}\n  ]\n}}'
      }
      codeType={CODE_TYPE.EXPRESSION}
      canShowCompleteInfo
    />
  )
}

CreateRecordsPart.displayName = "CreateRecordsPart"
