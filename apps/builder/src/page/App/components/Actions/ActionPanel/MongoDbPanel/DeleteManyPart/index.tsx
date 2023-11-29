import {
  ActionItem,
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbDeleteManyContent,
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

export const DeleteManyPart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as MongoDbDeleteManyContent

  const handleValueChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            typeContent: {
              ...typeContent,
              filter: value,
            } as MongoDbDeleteManyContent,
          },
        }),
      )
    },
    [cachedAction, dispatch, typeContent],
  )

  return (
    <InputEditor
      title={t("editor.action.panel.mongodb.filter")}
      lineNumbers
      style={{ height: "88px" }}
      mode={CODE_LANG.JAVASCRIPT}
      placeholder={
        "{\n" +
        '  "type":"cheese",\n' +
        '  "_id": {\n' +
        '    "$oid":"646385ae462e929b7a3d86bc"\n' +
        "  }\n" +
        "}"
      }
      value={typeContent.filter}
      onChange={handleValueChange}
      expectedType={VALIDATION_TYPES.STRING}
    />
  )
}

DeleteManyPart.displayName = "DeleteManyPart"
