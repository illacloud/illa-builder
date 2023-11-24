import { DynamoQueryStructParams } from "@illa-public/public-types"
import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { queryPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const QueryPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const { handleValueChange } = props
  const structParams = props.structParams as DynamoQueryStructParams

  return (
    <>
      {queryPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof DynamoQueryStructParams]}
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
