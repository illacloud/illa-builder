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
  BulkWriteContent,
  MongoDbAction,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const BulkWritePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as BulkWriteContent

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
            } as BulkWriteContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <>
      <InputEditor
        title={t("editor.action.panel.mongodb.operations")}
        lineNumbers
        style={{ height: "88px" }}
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.operations}
        onChange={handleValueChange("operations")}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <InputEditor
        title={t("editor.action.panel.mongodb.options")}
        lineNumbers
        mode={CODE_LANG.JAVASCRIPT}
        value={typeContent.options}
        onChange={handleValueChange("options")}
        expectedType={VALIDATION_TYPES.STRING}
      />
    </>
  )
}

BulkWritePart.displayName = "BulkWritePart"
