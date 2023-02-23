import { FC } from "react"
import {
  DynamoDBPanelItemsInfo,
  DynamoDBSubPanelProps,
} from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { scanPanelItems } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/items"
import { InputEditor } from "@/page/App/components/InputEditor"
import { ScanStructParams } from "@/redux/currentApp/action/dynamoDBAction"

export const ScanPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as ScanStructParams
  const { handleValueChange } = props

  return (
    <>
      {scanPanelItems.map((info: DynamoDBPanelItemsInfo) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof ScanStructParams]}
            onChange={(value) => handleValueChange(value, name)}
            expectedType={expectedType}
            title={title}
          />
        )
      })}
    </>
  )
}
ScanPanel.displayName = "ScanPanel"
