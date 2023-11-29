import { DynamoDBInitialMap } from "@illa-public/public-configs"
import {
  ActionItem,
  DynamoActionMethods,
  DynamoDBAction,
  DynamoStructParams,
} from "@illa-public/public-types"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { DeleteItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/DeleteItemPanel"
import { GetItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/GetItemPanel"
import { PutItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/PutItemPanel"
import { QueryPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/QueryPanel"
import { ScanPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/ScanPanel"
import { UpdateItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/UpdateItemPanel"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { actionItemContainer } from "@/page/App/components/Actions/ActionPanel/style"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { fetchResourceMeta } from "@/services/resource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const DynamoActionMap = {
  query: QueryPanel,
  scan: ScanPanel,
  getItem: GetItemPanel,
  putItem: PutItemPanel,
  updateItem: UpdateItemPanel,
  deleteItem: DeleteItemPanel,
}

export const dynamoDBSelectOptions = [
  "query",
  "scan",
  "getItem",
  "putItem",
  "updateItem",
  "deleteItem",
]

const DynamoDBPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    DynamoDBAction<DynamoStructParams>
  >
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    DynamoDBAction<DynamoStructParams>
  >
  const content = cachedAction.content
  const { content: selectedContent } = selectedAction

  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()

  useEffect(() => {
    if (cachedAction.resourceID == undefined) return
    fetchResourceMeta(cachedAction.resourceID).then(({ data }) => {
      setSqlTable(data?.Schema ?? {})
    })
  }, [cachedAction.resourceID])

  const handleValueChange = useCallback(
    (value: string | boolean, name: string) => {
      let newContent: DynamoDBAction<DynamoStructParams>
      if (name === "method") {
        if (value === selectedContent.method) {
          newContent = { ...selectedContent }
        } else {
          newContent = {
            ...content,
            method: value as DynamoActionMethods,
            structParams: {
              ...DynamoDBInitialMap[value as DynamoActionMethods],
            },
          }
        }
      } else {
        newContent = {
          ...content,
          [name]: value,
        }
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: newContent,
        }),
      )
    },
    [cachedAction, content, dispatch, selectedContent],
  )

  const handleStructParamsValueChange = useCallback(
    (value: string, name: string) => {
      const { structParams } = content
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            structParams: {
              ...structParams,
              [name]: value,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const PanelComponent = DynamoActionMap[content.method] ?? QueryPanel

  return (
    <div css={actionItemContainer}>
      <SingleTypeComponent
        title={t("editor.action.panel.dynamo.label.method")}
        componentType="select"
        onChange={(value) => handleValueChange(value as string, "method")}
        value={content.method}
        options={dynamoDBSelectOptions}
      />
      <InputEditor
        title={t("editor.action.panel.dynamo.label.table")}
        lineNumbers={false}
        expectedType={VALIDATION_TYPES.STRING}
        sqlScheme={sqlTable}
        mode={CODE_LANG.SQL}
        value={content.table}
        onChange={(value) => handleValueChange(value as string, "table")}
      />
      <SingleTypeComponent
        title=""
        componentType="checkbox"
        value={content.useJson}
        onChange={(value) => handleValueChange(value as boolean, "useJson")}
        options={dynamoDBSelectOptions}
        checkoutTitle={t("editor.action.panel.dynamo.label.json_input")}
      />
      {content.useJson ? (
        <InputEditor
          title={t("editor.action.panel.dynamo.label.parameters")}
          style={{ height: "88px" }}
          lineNumbers={true}
          expectedType={VALIDATION_TYPES.STRING}
          value={content.parameters}
          placeholder={t("editor.action.panel.dynamo.placeholder.parameters")}
          onChange={(value) => handleValueChange(value, "parameters")}
        />
      ) : (
        <PanelComponent
          structParams={content.structParams}
          handleValueChange={handleStructParamsValueChange}
        />
      )}
      <TransformerComponent />
    </div>
  )
}
DynamoDBPanel.displayName = "DynamoDBPanel"
export default DynamoDBPanel
