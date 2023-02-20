import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox, Select } from "@illa-design/react"
import { Api } from "@/api/base"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { DeleteItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/DeleteItemPanel"
import { GetItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/GetItemPanel"
import { PutItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/PutItemPanel"
import { QueryPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/QueryPanel"
import { ScanPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/ScanPanel"
import { UpdateItemPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/UpdateItemPanel"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  checkboxItemStyle,
  checkoutContentStyle,
  checkoutItemStyle,
  smtpItemLabelStyle,
} from "@/page/App/components/Actions/ActionPanel/SMTPPanel/style"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import {
  actionItemContainer,
  actionItemLabelStyle,
  actionItemStyle,
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
  DynamoActionMethods,
  DynamoDBAction,
  DynamoDBInitialMap,
  DynamoDBSelectOptions,
  StructParams,
} from "@/redux/currentApp/action/dynamoDBAction"
import { ResourcesData } from "@/redux/resource/resourceState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const DynamoActionMap = {
  query: QueryPanel,
  scan: ScanPanel,
  getItem: GetItemPanel,
  putItem: PutItemPanel,
  updateItem: UpdateItemPanel,
  deleteItem: DeleteItemPanel,
}

export const DynamoDBPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    DynamoDBAction<StructParams>
  >
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    DynamoDBAction<StructParams>
  >
  const content = cachedAction.content
  const { content: selectedContent } = selectedAction

  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()

  useEffect(() => {
    Api.request(
      {
        url: `resources/${cachedAction.resourceId}/meta`,
        method: "GET",
      },
      ({ data }: { data: ResourcesData }) => {
        setSqlTable(data?.schema ?? {})
      },
      () => {},
      () => {},
      () => {},
    )
  }, [cachedAction.resourceId])

  const handleValueChange = useCallback(
    (value: string | boolean, name: string) => {
      let newContent: DynamoDBAction<StructParams>
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
    <div css={panelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={actionItemStyle}>
          <span css={actionItemLabelStyle}>
            {t("editor.action.panel.mssql.config_type")}
          </span>
          <Select
            w="100%"
            colorScheme="techPurple"
            ml="16px"
            onChange={(value) => handleValueChange(value as string, "method")}
            value={content.method}
            options={DynamoDBSelectOptions}
          />
        </div>
        <InputEditor
          title={"Table"}
          lineNumbers={false}
          expectedType={VALIDATION_TYPES.STRING}
          sqlScheme={sqlTable}
          value={content.table}
          onChange={(value) => handleValueChange(value, "table")}
        />
        <div css={checkoutItemStyle}>
          <span css={smtpItemLabelStyle}></span>
          <div css={checkoutContentStyle}>
            <Checkbox
              colorScheme="techPurple"
              checked={content.useJson}
              ml="16px"
              onChange={(value) => handleValueChange(value, "useJson")}
            />
            <span css={checkboxItemStyle}>Use JSON parameter editor</span>
          </div>
        </div>
        {content.useJson ? (
          <InputEditor
            title={"Parameter"}
            style={{ height: "88px" }}
            placeholder="select * from users;"
            lineNumbers={true}
            expectedType={VALIDATION_TYPES.STRING}
            value={content.parameters}
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
      <ActionEventHandler />
    </div>
  )
}
DynamoDBPanel.displayName = "DynamoDBPanel"
