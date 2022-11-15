import { useTranslation } from "react-i18next"
import { FC, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  ElasticSearchAction,
  ElasticSearchActionList,
  IDEditorType,
} from "@/redux/currentApp/action/elasticSearchAction"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  codeEditorLabelStyle,
  esContainerStyle,
  esItemCodeEditorStyle,
  esItemLabelStyle,
  esItemStyle,
} from "./style"
import { Select } from "@illa-design/select"
import { CodeEditor } from "@/components/CodeEditor"
import { configActions } from "@/redux/config/configSlice"

export const ElasticSearchPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(
    getCachedAction,
  ) as ActionItem<ElasticSearchAction>

  const selectedAction = useSelector(getSelectedAction)!!

  const dispatch = useDispatch()

  let content = cachedAction.content as ElasticSearchAction

  const isShowIdEditor = useMemo(
    () => IDEditorType.includes(cachedAction.content.operation),
    [cachedAction.content],
  )

  return (
    <div css={esContainerStyle}>
      <ResourceChoose />
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.elastic.action_type")}
        </span>
        <Select
          colorScheme="techPurple"
          showSearch={true}
          defaultValue={content.operation}
          value={content.operation}
          ml="16px"
          width="100%"
          onChange={(value) => {
            let newID = ""
            if (
              cachedAction.resourceId === selectedAction.resourceId &&
              (selectedAction.content as ElasticSearchAction).operation ===
                value
            ) {
              newID = (selectedAction.content as ElasticSearchAction)?.id
            }

            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  operation: value,
                  id: newID,
                },
              }),
            )
          }}
          options={ElasticSearchActionList}
        />
      </div>
      <div css={esItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.elastic.query")}
        </span>
        <CodeEditor
          lineNumbers
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          height="88px"
          value={content.query}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  query: value,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={esItemStyle}>
        <span css={esItemLabelStyle}>
          {t("editor.action.panel.elastic.index")}
        </span>
        <CodeEditor
          css={esItemCodeEditorStyle}
          mode="TEXT_JS"
          value={content.index}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  index: value,
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
      {isShowIdEditor && (
        <div css={esItemStyle}>
          <span css={esItemLabelStyle}>
            {t("editor.action.panel.elastic.id")}
          </span>
          <CodeEditor
            css={esItemCodeEditorStyle}
            mode="TEXT_JS"
            value={content.id}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...cachedAction,
                  content: {
                    ...cachedAction.content,
                    id: value,
                  },
                }),
              )
            }}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      )}
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

ElasticSearchPanel.displayName = "ElasticSearchPanel"
