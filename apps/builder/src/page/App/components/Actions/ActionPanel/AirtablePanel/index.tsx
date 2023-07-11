import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { CreateRecordsPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/CreateRecordsPart"
import { DeleteMultipleRecordsPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/DeleteMultipleRecordsPart"
import { DeleteRecordPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/DeleteRecordPart"
import { GetRecordPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/GetRecordPart"
import { ListRecordsPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/ListRecordsPart"
import { UpdateMultipleRecordsPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/UpdateMultipleRecordsPart"
import { UpdateRecordPart } from "@/page/App/components/Actions/ActionPanel/AirtablePanel/UpdateRecordPart"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  actionItemContainer,
  panelContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  AirtableAction,
  AirtableActionConfigType,
  AirtableActionMethodsType,
  AirtableCreateRecordInitial,
  AirtableDeleteMultipleRecordInitial,
  AirtableDeleteRecordInitial,
  AirtableGetRecordInitial,
  AirtableListRecordInitial,
  AirtableMethodList,
  AirtableUpdateMultipleRecordInitial,
  AirtableUpdateRecordInitial,
} from "@/redux/currentApp/action/airtableAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const AirtablePanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    AirtableAction<AirtableActionConfigType>
  >

  const dispatch = useDispatch()

  let content = cachedAction.content as AirtableAction<AirtableActionConfigType>

  const part = useMemo(() => {
    switch (content.method) {
      case "list":
        return <ListRecordsPart />
      case "get":
        return <GetRecordPart />
      case "create":
        return <CreateRecordsPart />
      case "update":
        return <UpdateRecordPart />
      case "bulkUpdate":
        return <UpdateMultipleRecordsPart />
      case "bulkDelete":
        return <DeleteMultipleRecordsPart />
      case "delete":
        return <DeleteRecordPart />
      default:
        return <></>
    }
  }, [content.method])

  return (
    <div css={panelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <InputEditor
          title={t("editor.action.panel.label.airtable.base_id")}
          value={content.baseConfig.baseId}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  baseConfig: {
                    ...cachedAction.content.baseConfig,
                    baseId: value,
                  },
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
          mode={CODE_LANG.JAVASCRIPT}
          codeType={CODE_TYPE.EXPRESSION}
          tips={t("editor.action.panel.label.tips.airtable.base_id")}
          canShowCompleteInfo
        />
        <InputEditor
          title={t("editor.action.panel.label.airtable.table_name")}
          value={content.baseConfig.tableName}
          onChange={(value) => {
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  baseConfig: {
                    ...cachedAction.content.baseConfig,
                    tableName: value,
                  },
                },
              }),
            )
          }}
          expectedType={VALIDATION_TYPES.STRING}
          mode={CODE_LANG.JAVASCRIPT}
          codeType={CODE_TYPE.EXPRESSION}
          canShowCompleteInfo
        />
        <SingleTypeComponent
          componentType="select"
          showSearch={true}
          value={content.method}
          onSelectedValueChange={(value) => {
            let config = selectedAction.content.config
            if (selectedAction.content.method !== value) {
              switch (value) {
                case "list":
                  config = AirtableListRecordInitial
                  break
                case "get":
                  config = AirtableGetRecordInitial
                  break
                case "create":
                  config = AirtableCreateRecordInitial
                  break
                case "update":
                  config = AirtableUpdateRecordInitial
                  break
                case "bulkUpdate":
                  config = AirtableUpdateMultipleRecordInitial
                  break
                case "bulkDelete":
                  config = AirtableDeleteMultipleRecordInitial
                  break
                case "delete":
                  config = AirtableDeleteRecordInitial
                  break
                default:
                  break
              }
            }
            dispatch(
              configActions.updateCachedAction({
                ...cachedAction,
                content: {
                  ...cachedAction.content,
                  method: value as AirtableActionMethodsType,
                  config: config,
                },
              }),
            )
          }}
          options={AirtableMethodList}
          title={t("editor.action.panel.mongodb.action_type")}
        />
        {part}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

AirtablePanel.displayName = "AirtablePanel"
export default AirtablePanel
