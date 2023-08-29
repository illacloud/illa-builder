import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
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
import { ResourcesData } from "@/redux/resource/resourceState"
import { fetchResourceMeta } from "@/services/resource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const OracleDBPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    OracleDBAction<OracleDBActionType>
  >
  const currentAction = useSelector(getCachedAction)!!
  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()
  const content = cachedAction.content ?? OracleDBActionInitial

  useEffect(() => {
    if (currentAction.resourceID == undefined) return
    fetchResourceMeta(currentAction.resourceID).then(
      ({ data }: { data: ResourcesData }) => {
        setSqlTable(data?.schema ?? {})
      },
    )
  }, [currentAction.resourceID])

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
      <ActionEventHandler />
    </div>
  )
}
OracleDBPanel.displayName = "OracleDBPanel"
export default OracleDBPanel
