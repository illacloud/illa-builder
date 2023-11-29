import { ActionItem, GraphQLAction } from "@illa-public/public-types"
import { Params } from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditor } from "@/components/RecordEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { actionItemContainer } from "./style"

const GraphQLPanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<GraphQLAction>
  const content = cachedAction.content as GraphQLAction

  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (value: string | Params[], name: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            [name]: value,
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleOnAddKeys = useCallback(
    (name?: string) => {
      if (name && content.hasOwnProperty(name)) {
        const oldList = content[name as keyof typeof content] as Params[]
        let newList: Params[] = [...oldList, { key: "", value: "" } as Params]
        dispatch(
          configActions.updateCachedAction({
            ...cachedAction,
            content: {
              ...content,
              [name]: newList,
            },
          }),
        )
      }
    },
    [cachedAction, content, dispatch],
  )

  const handleOnDeleteKeyValue = useCallback(
    (index: number, record: Params, name?: string) => {
      if (name && content.hasOwnProperty(name)) {
        const oldList = content[name as keyof typeof content] as Params[]
        let newList = [...oldList]
        newList.splice(index, 1)
        if (newList.length === 0) {
          newList = [{ key: "", value: "" }]
        }
        dispatch(
          configActions.updateCachedAction({
            ...cachedAction,
            content: {
              ...content,
              [name]: newList,
            },
          }),
        )
      }
    },
    [cachedAction, content, dispatch],
  )

  const handleOnChangeKeyOrValue = useCallback(
    (index: number, key: string, value: string, name?: string) => {
      if (name && content.hasOwnProperty(name)) {
        const oldList = content[name as keyof typeof content] as Params[]
        let newList: Params[] = [...oldList]
        newList[index] = { key, value } as Params
        dispatch(
          configActions.updateCachedAction({
            ...cachedAction,
            content: {
              ...content,
              [name]: newList,
            },
          }),
        )
      }
    },
    [cachedAction, content, dispatch],
  )

  return (
    <div css={actionItemContainer}>
      <InputEditor
        lineNumbers
        title={t("editor.action.panel.graphql.query")}
        placeholder={t("editor.action.panel.graphql.placeholder.query")}
        value={content.query}
        onChange={(value) => handleValueChange(value, "query")}
        mode={CODE_LANG.SQL}
        style={{ height: "88px" }}
        expectedType={VALIDATION_TYPES.STRING}
      />
      <RecordEditor
        key="variables"
        label={t("editor.action.panel.graphql.variables")}
        records={content.variables}
        name="variables"
        onAdd={handleOnAddKeys}
        onDelete={handleOnDeleteKeyValue}
        onChangeKey={handleOnChangeKeyOrValue}
        onChangeValue={handleOnChangeKeyOrValue}
        valueInputType={VALIDATION_TYPES.ANY}
      />
      <RecordEditor
        key="headers"
        label={t("editor.action.panel.graphql.headers")}
        name="headers"
        records={content.headers}
        onAdd={handleOnAddKeys}
        onDelete={handleOnDeleteKeyValue}
        onChangeKey={handleOnChangeKeyOrValue}
        onChangeValue={handleOnChangeKeyOrValue}
      />
      <TransformerComponent />
    </div>
  )
}

GraphQLPanel.displayName = "GraphQLPanel"
export default GraphQLPanel
