import {
  ActionItem,
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbCommandContent,
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

export const CommandPart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as MongoDbCommandContent

  const handleValueChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            typeContent: {
              ...typeContent,
              document: value,
            } as MongoDbCommandContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <InputEditor
      title={t("editor.action.panel.mongodb.document")}
      lineNumbers
      style={{ height: "120px" }}
      mode={CODE_LANG.JAVASCRIPT}
      value={typeContent.document}
      onChange={handleValueChange}
      expectedType={VALIDATION_TYPES.STRING}
      placeholder={
        "{\n" +
        '      "find": "fruit",\n' +
        '      "filter": {"price":10000}\n' +
        "}"
      }
    />
  )
}

CommandPart.displayName = "CommandPart"
