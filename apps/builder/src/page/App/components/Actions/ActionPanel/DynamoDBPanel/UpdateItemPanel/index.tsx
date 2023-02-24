import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { updateItemPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/InputEditor"
import { UpdateItemStructParams } from "@/redux/currentApp/action/dynamoDBAction"

export const UpdateItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as UpdateItemStructParams
  const { handleValueChange } = props

  return (
    <>
      {updateItemPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof UpdateItemStructParams]}
            onChange={(value) => handleValueChange(value, name)}
            expectedType={expectedType}
            title={title}
          />
        )
      })}
    </>
  )
}
UpdateItemPanel.displayName = "UpdateItemPanel"
