import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DynamoDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel/interface"
import { InputEditor } from "@/page/App/components/InputEditor"
import { QueryStructParams } from "@/redux/currentApp/action/dynamoDBAction"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const QueryPanel: FC<DynamoDBSubPanelProps> = (props) => {
  const { handleValueChange } = props
  const { t } = useTranslation()
  const structParams = props.structParams as QueryStructParams

  return (
    <>
      {[
        {
          title: t("editor.action.panel.dynamo.label.index"),
          name: "indexName",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: t("editor.action.panel.dynamo.label.key_condition"),
          name: "keyConditionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: t("editor.action.panel.dynamo.label.projection_expression"),
          name: "projectionExpression",
          expectedType: VALIDATION_TYPES.STRING,
        },
        {
          title: t("editor.action.panel.dynamo.label.filter_expression"),
          name: "filterExpression",
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
        {
          title: t("editor.action.panel.dynamo.label.limit"),
          name: "limit",
          expectedType: VALIDATION_TYPES.NUMBER,
        },
        {
          title: t("editor.action.panel.dynamo.label.select"),
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
