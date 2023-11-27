import {
  ActionItem,
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbDistinctContent,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { MongoDbActionPartProps } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DistinctPart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as MongoDbDistinctContent

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
            } as MongoDbDistinctContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.mongodb.query")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.query}
        onChange={handleValueChange("query")}
        style={{ height: "188px" }}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={
          "{\n" +
          '  "type":"cheese",\n' +
          '  "_id": {\n' +
          '    "$oid":"646385ae462e929b7a3d86bc"\n' +
          "  }\n" +
          "}"
        }
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.field")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.field}
        onChange={handleValueChange("field")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={"_id"}
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.options")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.options}
        style={{ height: "188px" }}
        placeholder={
          "{\n" +
          '"collation":{\n' +
          '   "locale": "simple",\n' +
          '   "caseLevel": true,\n' +
          '   "caseFirst": "upper",\n' +
          "...\n" +
          "}}"
        }
        onChange={handleValueChange("options")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

DistinctPart.displayName = "DistinctPart"
