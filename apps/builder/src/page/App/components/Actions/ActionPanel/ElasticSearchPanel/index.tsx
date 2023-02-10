import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { publicCodeMirrorStyleInActionPanel } from "@/page/App/components/Actions/ActionPanel/style"
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
import {
  actionItemContainer,
  codeEditorLabelStyle,
  esContainerStyle,
  esItemCodeEditorStyle,
  esItemLabelStyle,
  esItemStyle,
} from "./style"

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
      <div css={actionItemContainer}>
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
            w="100%"
            onChange={(value) => {
              const content = {
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
            <div css={esItemCodeEditorStyle}>
              <CodeEditor
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
                showLineNumbers
                expectValueType={VALIDATION_TYPES.STRING}
                lang={CODE_LANG.JAVASCRIPT}
                height="88px"
                codeType={CODE_TYPE.EXPRESSION}
                canShowCompleteInfo
              />
            </div>
          </div>
        )}
        {isQueryContent && (
          <div css={esItemStyle}>
            <span css={codeEditorLabelStyle}>
              {t("editor.action.panel.elastic.query")}
            </span>
            <div css={esItemCodeEditorStyle}>
              <CodeEditor
                key={cachedAction.content.operation}
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
                showLineNumbers
                expectValueType={VALIDATION_TYPES.STRING}
                lang={CODE_LANG.JAVASCRIPT}
                height="88px"
                codeType={CODE_TYPE.EXPRESSION}
                canShowCompleteInfo
              />
            </div>
          </div>
        )}
        <div css={esItemStyle}>
          <span css={esItemLabelStyle}>
            {t("editor.action.panel.elastic.index")}
          </span>
          <div css={esItemCodeEditorStyle}>
            <CodeEditor
              singleLine
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
              expectValueType={VALIDATION_TYPES.STRING}
              lang={CODE_LANG.JAVASCRIPT}
              codeType={CODE_TYPE.EXPRESSION}
            />
          </div>
        </div>
        {isShowID && (
          <div css={esItemStyle}>
            <span css={esItemLabelStyle}>
              {t("editor.action.panel.elastic.id")}
            </span>
            <div css={esItemCodeEditorStyle}>
              <CodeEditor
                singleLine
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
                expectValueType={VALIDATION_TYPES.STRING}
                lang={CODE_LANG.JAVASCRIPT}
                codeType={CODE_TYPE.EXPRESSION}
                canShowCompleteInfo
              />
            </div>
          </div>
        )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

ElasticSearchPanel.displayName = "ElasticSearchPanel"
