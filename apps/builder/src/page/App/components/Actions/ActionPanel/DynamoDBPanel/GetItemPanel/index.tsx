import { FC } from "react"
import { DynamoDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { GetItemStructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const GetItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as GetItemStructParams
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
          title: "projectionExpression",
          name: "projectionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },

        {
          title: "expressionAttributeNames",
          name: "expressionAttributeNames",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
      ].map((info) => {
        const { title, name, expectedType } = info
        return (
          <InputEditor
            key={name}
            lineNumbers
            style={{ maxHeight: "88px" }}
            value={structParams[name as keyof GetItemStructParams]}
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
