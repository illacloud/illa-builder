import { DynamoPutItemStructParams } from "@illa-public/public-types"
import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { putItemPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const PutItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as DynamoPutItemStructParams
  const { handleValueChange } = props

  return (
    <>
      {putItemPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof DynamoPutItemStructParams]}
            onChange={(value) => handleValueChange(value, name)}
            expectedType={expectedType}
            title={title}
          />
        )
      })}
    </>
  )
}
PutItemPanel.displayName = "PutItemPanel"
