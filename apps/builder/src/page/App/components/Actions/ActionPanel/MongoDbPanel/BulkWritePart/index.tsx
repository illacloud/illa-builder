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

  return (
    <>
      <div css={mongoItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.mongodb.operations")}
        </span>

        <CodeEditor
          showLineNumbers
          height="88px"
          wrapperCss={mongoItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={typeContent.operations}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  typeContent: {
                    ...typeContent,
                    operations: value,
                  } as BulkWriteContent,
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
                  } as BulkWriteContent,
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

BulkWritePart.displayName = "BulkWritePart"
