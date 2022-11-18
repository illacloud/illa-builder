import { useTranslation } from "react-i18next"
import { FC, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  BodyContentType,
  ElasticSearchAction,
  ElasticSearchActionList,
  IDEditorType,
  QueryContentType,
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
            let content = {
              operation: value,
              index: cachedAction.content.index,
            } as ElasticSearchAction
            if (
              cachedAction.resourceId === selectedAction.resourceId &&
              (selectedAction.content as ElasticSearchAction).operation ===
                value
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
          }}
          options={ElasticSearchActionList}
        />
      </div>
      {isBodyContent && (
        <div css={esItemStyle}>
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.elastic.body")}
          </span>
          <CodeEditor
            lineNumbers
            css={esItemCodeEditorStyle}
            mode="TEXT_JS"
            height="88px"
            key={cachedAction.content.operation}
            value={content.body}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...cachedAction,
                  content: {
                    ...cachedAction.content,
                    body: value,
                  },
                }),
              )
            }}
            expectedType={VALIDATION_TYPES.STRING}
          />
        </div>
      )}
      {isQueryContent && (
        <div css={esItemStyle}>
          <span css={codeEditorLabelStyle}>
            {t("editor.action.panel.elastic.query")}
          </span>
          <CodeEditor
            lineNumbers
            css={esItemCodeEditorStyle}
            mode="TEXT_JS"
            key={cachedAction.content.operation}
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
      )}
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
      {isShowID && (
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
