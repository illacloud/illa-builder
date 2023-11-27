import {
  ActionItem,
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbAggregateContent,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { MongoDbActionPartProps } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const AggregatePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as MongoDbAggregateContent

  const handleValueChange = useCallback(
    (name: string) => (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            typeContent: {
              ...typeContent,
              [name]: value,
            } as MongoDbAggregateContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.mongodb.aggregation")}
        value={typeContent.aggregation}
        onChange={handleValueChange("aggregation")}
        style={{ height: "188px" }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
        codeType={CODE_TYPE.EXPRESSION}
        placeholder={
          "[\n" +
          "   {\n" +
          '      "$match": { "size": "medium" }\n' +
          "   },\n" +
          "   {\n" +
          '      "$group": { "_id": "$type", "totalQuantity": { "$sum": "$price" } }\n' +
          "   }\n" +
          "] "
        }
        canShowCompleteInfo
        lineNumbers
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.options")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.options}
        style={{ height: "188px" }}
        onChange={handleValueChange("options")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={
          "{\n" +
          '"collation":{\n' +
          '    "locale": "simple",\n' +
          '    "caseLevel": true,\n' +
          '    "caseFirst": "upper",\n' +
          "...\n" +
          "}}"
        }
      />
    </>
  )
}

AggregatePart.displayName = "AggregatePart"
