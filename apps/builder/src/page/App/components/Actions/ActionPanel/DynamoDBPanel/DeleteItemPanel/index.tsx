import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DynamoDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { DeleteItemStructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DeleteItemPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const structParams = props.structParams as DeleteItemStructParams
  const { handleValueChange } = props
  const { t } = useTranslation()

  return (
    <>
      {[
        {
          title: t("editor.action.panel.dynamo.label.key"),
          name: "key",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
        {
          title: t("editor.action.panel.dynamo.label.condition_expression"),
          name: "conditionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: t("editor.action.panel.dynamo.label.attribute_name"),
          name: "expressionAttributeNames",
          expectedType: VALIDATION_TYPES.OBJECT,
        },
        {
          title: t("editor.action.panel.dynamo.label.attribute_value"),
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
            value={structParams[name as keyof DeleteItemStructParams]}
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
