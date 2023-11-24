import {
  ActionItem,
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbUpdateOneContent,
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

export const UpdateOnePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as MongoDbUpdateOneContent

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
            } as MongoDbUpdateOneContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <>
      <InputEditor
        value={typeContent.filter}
        onChange={handleValueChange("filter")}
        title={t("editor.action.panel.mongodb.filter")}
        lineNumbers
        style={{ height: "88px" }}
        expectedType={VALIDATION_TYPES.STRING}
        mode={CODE_LANG.JAVASCRIPT}
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
        lineNumbers
        style={{ height: "88px" }}
        value={typeContent.update}
        onChange={handleValueChange("update")}
        mode={CODE_LANG.JAVASCRIPT}
        expectedType={VALIDATION_TYPES.STRING}
        title={t("editor.action.panel.mongodb.update")}
        placeholder={'{"$set":{"type":"chicken", "price":100}}'}
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.options")}
        lineNumbers
        style={{ height: "188px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.options}
        onChange={handleValueChange("options")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={
          "{\n" +
          '"collation":{\n' +
          '   "locale": "simple",\n' +
          '   "caseLevel": true,\n' +
          '   "caseFirst": "upper",\n' +
          "...\n" +
          "}}"
        }
      />
    </>
  )
}

UpdateOnePart.displayName = "UpdateOnePart"
