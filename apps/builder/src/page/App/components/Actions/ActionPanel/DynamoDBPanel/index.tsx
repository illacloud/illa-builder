import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { Api } from "@/api/base"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
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
  DynamoDBAction,
  DynamoDBSelectOptions,
} from "@/redux/currentApp/action/dynamoDBAction"
import { ResourcesData } from "@/redux/resource/resourceState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DynamoDBPanel: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedAction = useSelector(
    getSelectedAction,
  ) as ActionItem<DynamoDBAction>
  const cachedAction = useSelector(
    getCachedAction,
  ) as ActionItem<DynamoDBAction>
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
    (value: string, name: string) => {
      let newContent
      if (name === "method" && value === selectedContent.method) {
        newContent = { ...selectedContent }
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
          placeholder="select * from users;"
          lineNumbers={false}
          expectedType={VALIDATION_TYPES.STRING}
          sqlScheme={sqlTable}
          value={content.table}
          onChange={(value) => handleValueChange(value, "table")}
        />
        <InputEditor
          title={"Parameter"}
          style={{ height: "88px" }}
          placeholder="select * from users;"
          lineNumbers={true}
          expectedType={VALIDATION_TYPES.STRING}
          value={content.parameters}
          onChange={(value) => handleValueChange(value, "parameters")}
        />
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}
DynamoDBPanel.displayName = "DynamoDBPanel"
