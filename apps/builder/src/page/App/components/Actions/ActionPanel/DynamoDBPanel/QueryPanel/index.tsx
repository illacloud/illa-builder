import { FC } from "react"
import { DynamoDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { QueryStructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const QueryPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const { handleValueChange } = props
  const structParams = props.structParams as QueryStructParams

  return (
    <>
      {[
        {
          title: "indexName",
          name: "indexName",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "keyCondition Expression",
          name: "keyConditionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "projection Expression",
          name: "projectionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "filter Expression",
          name: "filterExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "expression AttributeNames",
          name: "expressionAttributeNames",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
        {
          title: "expression AttributeValues",
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
