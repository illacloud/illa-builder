import { FC } from "react"
import { DynamoDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { ScanStructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const ScanPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as ScanStructParams
  const { handleValueChange } = props

  return (
    <>
      {[
        {
          title: "indexName",
          name: "indexName",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "projectionExpression",
          name: "projectionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "filterExpression",
          name: "filterExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "expressionAttributeNames",
          name: "expressionAttributeNames",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
        {
          title: "expressionAttributeValues",
          name: "expressionAttributeValues",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
        {
          title: "limit",
          name: "limit",
          expectedType: VALIDATION_TYPES.NUMBER,
        },
        {
          title: "select",
          name: "select",
          expectedType: VALIDATION_TYPES.STRING,
        },
      ].map((info) => {
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
