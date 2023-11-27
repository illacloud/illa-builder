import { DynamoGetItemStructParams } from "@illa-public/public-types"
import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { getItemPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const GetItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as DynamoGetItemStructParams
  const { handleValueChange } = props

  return (
    <>
      {getItemPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof DynamoGetItemStructParams]}
            onChange={(value) => handleValueChange(value, name)}
            expectedType={expectedType}
            title={title}
          />
        )
      })}
    </>
  )
}

GetItemPanel.displayName = "GetItemPanel"
