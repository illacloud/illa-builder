import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Trigger } from "@illa-design/react"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  actionItemContainer,
  panelContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import { InputEditor } from "@/page/App/components/InputEditor"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  OracleDBAction,
  OracleDBActionInitial,
  OracleDBActionSQLMode,
  OracleDBActionType,
} from "@/redux/currentApp/action/oracleDBAction"
import { fetchResourceMeta } from "@/services/resource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { SQLModeSelector } from "../pulicComponent/SQLModeSelector"
import { labelStyle, labelTipsStyle, modeContainerStyle } from "./style"

const OracleDBPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    OracleDBAction<OracleDBActionType>
  >
  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()
  const content = cachedAction.content ?? OracleDBActionInitial

  useEffect(() => {
    if (cachedAction.resourceID == undefined) return
    fetchResourceMeta(cachedAction.resourceID).then(({ data }) => {
      setSqlTable(data?.Schema ?? {})
    })
  }, [cachedAction.resourceID])

  const handleValueChange = useCallback(
    (name: string) => (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            opts: {
              ...content.opts,
              [name]: value,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  return (
    <div css={panelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <InputEditor
          style={{ height: "88px" }}
          placeholder={t("editor.action.panel.mssql.placeholder.query")}
          lineNumbers
          mode={CODE_LANG.SQL}
          canShowCompleteInfo
          expectedType={VALIDATION_TYPES.STRING}
          value={(content.opts as OracleDBActionSQLMode).raw}
          onChange={handleValueChange("raw")}
          sqlScheme={sqlTable}
        />
        <TransformerComponent fullWidth />
      </div>
      {(content.mode === "sql" || content.mode === "sql-safe") && (
        <div css={modeContainerStyle}>
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
          <SQLModeSelector />
        </div>
      )}
      <ActionEventHandler />
    </div>
  )
}
OracleDBPanel.displayName = "OracleDBPanel"
export default OracleDBPanel
