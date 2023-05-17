import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { MongoDbActionPartProps } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  FindOneContent,
  MongoDbAction,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const FindOnePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as FindOneContent

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
            } as FindOneContent,
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
        style={{ height: "88px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.query}
        onChange={handleValueChange("query")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={'{"type":"cheese"}'}
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.projection")}
        lineNumbers
        style={{ height: "88px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.projection}
        onChange={handleValueChange("projection")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={'{"_id":1}'}
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.skip")}
        lineNumbers
        style={{ height: "88px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.skip}
        onChange={handleValueChange("skip")}
        expectedType={VALIDATION_TYPES.STRING}
        placeholder={"10"}
      />
    </>
  )
}

FindOnePart.displayName = "FindOnePart"
