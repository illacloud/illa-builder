import {
  MicrosoftSqlActionGUIModeInitial,
  MicrosoftSqlActionSqlModeInitial,
} from "@illa-public/public-configs"
import {
  ActionItem,
  MicrosoftSqlAction,
  MicrosoftSqlActionType,
} from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Trigger } from "@illa-design/react"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
import { MSSQLGUIMode } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/MSSQLGUIMode"
import { MSSQLSqlMode } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel/MSSQLSqlMode"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { actionItemContainer } from "@/page/App/components/Actions/ActionPanel/style"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { SQLModeSelector } from "../pulicComponent/SQLModeSelector"
import {
  labelContainerStyle,
  labelStyle,
  labelTipsStyle,
  modeContainerStyle,
} from "./style"

const ConfigTypeOptions = [
  {
    value: "sql",
    label: "SQL",
  },
  {
    value: "gui",
    label: "Bulk insert",
  },
]

type MSSQLActionType = MicrosoftSqlAction<MicrosoftSqlActionType>

const MicrosoftSqlPanel: FC = () => {
  const { t } = useTranslation()
  const cachedAction = useSelector(
    getCachedAction,
  ) as ActionItem<MSSQLActionType>
  const selectedAction = useSelector(
    getSelectedAction,
  ) as ActionItem<MSSQLActionType>
  const content = cachedAction.content
  const selectedContent = selectedAction.content
  const dispatch = useDispatch()

  const sqlModeInitial =
    content.mode === "sql" || content.mode === "sql-safe"
      ? content.query
      : MicrosoftSqlActionSqlModeInitial
  const guiModeInitial =
    content.mode === "gui" ? content.query : MicrosoftSqlActionGUIModeInitial

  const handleValueChange = useCallback(
    (value: string) => {
      const isSameModeWithCached = value === selectedContent.mode
      const { query } = selectedContent
      const initialMode =
        value === "sql"
          ? MicrosoftSqlActionSqlModeInitial
          : MicrosoftSqlActionGUIModeInitial

      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            mode: value,
            query: {
              ...(isSameModeWithCached ? query : initialMode),
            },
          } as MSSQLActionType,
        }),
      )
    },
    [cachedAction, selectedContent, dispatch],
  )
  const handleQueryChange = useCallback(
    (value: string, name: string) => {
      if (!value) {
        return
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            query: {
              ...content.query,
              [name]: value,
            },
          } as MSSQLActionType,
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  return (
    <div css={actionItemContainer}>
      <SingleTypeComponent
        componentType="radio-group"
        type="button"
        title={t("editor.action.panel.mssql.config_type")}
        forceEqualWidth={true}
        onChange={handleValueChange}
        value={
          content.mode === "sql" || content.mode === "sql-safe" ? "sql" : "gui"
        }
        radioOptions={ConfigTypeOptions}
      />
      {content.mode === "sql" || content.mode === "sql-safe" ? (
        <MSSQLSqlMode
          modeContent={sqlModeInitial}
          onChange={handleQueryChange}
          showSafeModeTips={content.mode === "sql-safe"}
        />
      ) : (
        <MSSQLGUIMode
          modeContent={guiModeInitial}
          onChange={handleQueryChange}
          resourceID={cachedAction.resourceID}
        />
      )}
      {(content.mode === "sql" || content.mode === "sql-safe") && (
        <div css={modeContainerStyle}>
          <div css={labelContainerStyle}>
            <Trigger
              content={
                <ILLAMarkdown
                  textString={t(
                    "editor.action.panel.label.tips.general.safe_mode",
                  )}
                />
              }
              trigger="hover"
              position="left"
              maxW="240px"
            >
              <span css={labelStyle}>
                {t("editor.action.panel.label.general.safe_mode")}
                <span css={labelTipsStyle} />
              </span>
            </Trigger>
          </div>
          <SQLModeSelector />
        </div>
      )}
      <TransformerComponent />
    </div>
  )
}
MicrosoftSqlPanel.displayName = "MicrosoftSqlPanel"
export default MicrosoftSqlPanel
