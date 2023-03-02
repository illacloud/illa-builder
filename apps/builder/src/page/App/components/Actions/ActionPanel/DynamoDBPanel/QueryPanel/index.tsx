import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { queryPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/InputEditor"
import { QueryStructParams } from "@/redux/currentApp/action/dynamoDBAction"

export const QueryPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const { handleValueChange } = props
  const structParams = props.structParams as QueryStructParams

  return (
    <>
      {queryPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof QueryStructParams]}
            onChange={(value) => handleValueChange(value, name)}
            expectedType={expectedType}
            title={title}
          />
        )
      })}
    </>
  )
}
QueryPanel.displayName = "QueryPanel"
