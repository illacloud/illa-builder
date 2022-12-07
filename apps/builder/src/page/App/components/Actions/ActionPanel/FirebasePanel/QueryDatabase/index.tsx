import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  codeEditorLabelStyle,
  actionItemCodeEditorStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { FirebaseActionPartProps } from "@/page/App/components/Actions/ActionPanel/FirebasePanel/intreface"
import {
  FirebaseAction,
  FirebaseContentType,
  QueryDatabase,
} from "@/redux/currentApp/action/firebaseAction"

export const QueryDatabasePart: FC<FirebaseActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    FirebaseAction<FirebaseContentType>
  >
  const options = props.options as QueryDatabase

  const handleValueChange = useCallback(
    (value: string, name: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...cachedAction.content,
            options: {
              ...options,
              [name]: value,
            },
          },
        }),
      )
    },
    [dispatch, cachedAction, options],
  )

  return (
    <>
      <div css={actionItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.firebase.database_ref")}
        </span>
        <CodeEditor
          css={actionItemCodeEditorStyle}
          mode="TEXT_JS"
          value={options.databaseRef}
          // TODO: refactor inline function
          onChange={(value) => handleValueChange(value, "databaseRef")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      </div>
    </>
  )
}

QueryDatabasePart.displayName = "QueryDatabasePart"
