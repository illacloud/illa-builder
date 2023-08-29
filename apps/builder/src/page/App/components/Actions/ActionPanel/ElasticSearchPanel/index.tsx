import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { SelectValue } from "@illa-design/react"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  BodyContentType,
  ElasticSearchAction,
  ElasticSearchActionList,
  IDEditorType,
  QueryContentType,
} from "@/redux/currentApp/action/elasticSearchAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { actionItemContainer, esContainerStyle } from "./style"

const ElasticSearchPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(
    getCachedAction,
  ) as ActionItem<ElasticSearchAction>

  const selectedAction = useSelector(getSelectedAction)!!
  let content = cachedAction.content as ElasticSearchAction

  const isShowID = useMemo(
    () => IDEditorType.includes(cachedAction.content.operation),
    [cachedAction.content],
  )
  const isBodyContent = useMemo(
    () => BodyContentType.includes(cachedAction.content.operation),
    [cachedAction.content],
  )
  const isQueryContent = useMemo(
    () => QueryContentType.includes(cachedAction.content.operation),
    [cachedAction.content],
  )

  const handleValueChange = useCallback(
    (key: string) => (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            [key]: value,
          },
        }),
      )
    },
    [cachedAction, dispatch],
  )

  const handleSelectedValueChange = useCallback(
    (value: SelectValue) => {
      const content = {
        operation: value,
        index: cachedAction.content.index,
      } as ElasticSearchAction
      if (
        cachedAction.resourceID === selectedAction.resourceID &&
        (selectedAction.content as ElasticSearchAction).operation === value
      ) {
        if (isShowID) {
          content["id"] =
            (selectedAction.content as ElasticSearchAction)?.id || ""
        }
        if (isBodyContent) {
          content["body"] =
            (selectedAction.content as ElasticSearchAction)?.body || ""
        }
        if (isQueryContent) {
          content["query"] =
            (selectedAction.content as ElasticSearchAction)?.query || ""
        }
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content,
        }),
      )
    },
    [
      cachedAction,
      dispatch,
      isBodyContent,
      isQueryContent,
      isShowID,
      selectedAction.content,
      selectedAction.resourceID,
    ],
  )

  return (
    <div css={esContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <SingleTypeComponent
          componentType="select"
          value={content.operation}
          title={t("editor.action.panel.elastic.action_type")}
          options={ElasticSearchActionList}
          onSelectedValueChange={handleSelectedValueChange}
        />
        {isBodyContent && (
          <InputEditor
            value={content.body ?? ""}
            onChange={handleValueChange("body")}
            title={t("editor.action.panel.elastic.body")}
            lineNumbers
            style={{ height: "88px" }}
            expectedType={VALIDATION_TYPES.STRING}
            mode={CODE_LANG.JAVASCRIPT}
            codeType={CODE_TYPE.EXPRESSION}
            canShowCompleteInfo
          />
        )}
        {isQueryContent && (
          <InputEditor
            value={content.query ?? ""}
            onChange={handleValueChange("query")}
            title={t("editor.action.panel.elastic.query")}
            lineNumbers
            expectedType={VALIDATION_TYPES.STRING}
            mode={CODE_LANG.JAVASCRIPT}
            style={{ height: "88px" }}
            codeType={CODE_TYPE.EXPRESSION}
            canShowCompleteInfo
          />
        )}
        <InputEditor
          value={content.index}
          onChange={handleValueChange("index")}
          title={t("editor.action.panel.elastic.index")}
          expectedType={VALIDATION_TYPES.STRING}
          mode={CODE_LANG.JAVASCRIPT}
          codeType={CODE_TYPE.EXPRESSION}
        />
        {isShowID && (
          <InputEditor
            value={content.id ?? ""}
            onChange={handleValueChange("id")}
            title={t("editor.action.panel.elastic.id")}
            expectedType={VALIDATION_TYPES.STRING}
            mode={CODE_LANG.JAVASCRIPT}
            codeType={CODE_TYPE.EXPRESSION}
            canShowCompleteInfo
          />
        )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

ElasticSearchPanel.displayName = "ElasticSearchPanel"
export default ElasticSearchPanel
