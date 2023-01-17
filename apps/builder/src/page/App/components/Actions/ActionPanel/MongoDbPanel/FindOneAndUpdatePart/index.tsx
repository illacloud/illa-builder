import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { MongoDbActionPartProps } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/interface"
import {
  codeEditorLabelStyle,
  mongoItemCodeEditorStyle,
  mongoItemStyle,
} from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  FindOneAndUpdateContent,
  MongoDbAction,
  MongoDbActionTypeContent,
} from "@/redux/currentApp/action/mongoDbAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const FindOneAndUpdatePart: FC<MongoDbActionPartProps> = (props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    MongoDbAction<MongoDbActionTypeContent>
  >
  const typeContent = props.typeContent as FindOneAndUpdateContent

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.filter")}
        </span>
        <CodeEditor
          showLineNumbers
          height="88px"
          wrapperCss={mongoItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={typeContent.filter}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  typeContent: {
                    ...typeContent,
                    filter: value,
                  } as FindOneAndUpdateContent,
                },
              }),
            )
          }}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.update")}
        </span>
        <CodeEditor
          showLineNumbers
          height="88px"
          wrapperCss={mongoItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={typeContent.update}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  typeContent: {
                    ...typeContent,
                    update: value,
                  } as FindOneAndUpdateContent,
                },
              }),
            )
          }}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.options")}
        </span>
        <CodeEditor
          showLineNumbers
          height="88px"
          wrapperCss={mongoItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={typeContent.options}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  typeContent: {
                    ...typeContent,
                    options: value,
                  } as FindOneAndUpdateContent,
                },
              }),
            )
          }}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

FindOneAndUpdatePart.displayName = "FindOneAndUpdatePart"
