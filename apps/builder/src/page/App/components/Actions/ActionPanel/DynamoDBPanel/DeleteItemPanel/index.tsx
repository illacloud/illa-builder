import { DynamoDeleteItemStructParams } from "@illa-public/public-types"
import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { deleteItemPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const DeleteItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as DynamoDeleteItemStructParams
  const { handleValueChange } = props

  return (
    <>
      {deleteItemPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof DynamoDeleteItemStructParams]}
            onChange={(value) => handleValueChange(value, name)}
            expectedType={expectedType}
            title={title}
          />
        )
      })}
    </>
  )
}
DeleteItemPanel.displayName = "DeleteItemPanel"
