import {
  ActionItem,
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbUpdateManyContent,
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

export const UpdateManyPart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as MongoDbUpdateManyContent

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
            } as MongoDbUpdateManyContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.mongodb.filter")}
        lineNumbers
        style={{ height: "88px" }}
        value={typeContent.filter}
        onChange={handleValueChange("filter")}
        mode={CODE_LANG.JAVASCRIPT}
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
        title={t("editor.action.panel.mongodb.update")}
        lineNumbers
        style={{ height: "88px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.update}
        onChange={handleValueChange("update")}
        expectedType={VALIDATION_TYPES.STRING}
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

UpdateManyPart.displayName = "UpdateManyPart"
