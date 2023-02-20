import { FC } from "react"
import { DynamoDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { UpdateItemStructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const UpdateItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as UpdateItemStructParams
  const { handleValueChange } = props

  return (
    <>
      {[
        {
          title: "key",
          name: "key",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
        {
          title: "update Expression",
          name: "updateExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: "condition Expression",
          name: "conditionExpression",
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
      ].map((info) => {
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
