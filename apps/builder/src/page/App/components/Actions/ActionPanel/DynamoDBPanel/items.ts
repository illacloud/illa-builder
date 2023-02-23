import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const deleteItemPanelItems = [
  {
    title: i18n.t("editor.action.panel.dynamo.label.key"),
    name: "key",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.condition_expression"),
    name: "conditionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_name"),
    name: "expressionAttributeNames",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_value"),
    name: "expressionAttributeValues",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
]

export const getItemPanelItems = [
  {
    title: i18n.t("editor.action.panel.dynamo.label.key"),
    name: "key",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.projection_expression"),
    name: "projectionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },

  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_name"),
    name: "expressionAttributeNames",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
]

export const putItemPanelItems = [
  {
    title: i18n.t("editor.action.panel.dynamo.label.item"),
    name: "item",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.condition_expression"),
    name: "conditionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_name"),
    name: "expressionAttributeNames",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_value"),
    name: "expressionAttributeValues",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
]

export const queryPanelItems = [
  {
    title: i18n.t("editor.action.panel.dynamo.label.index"),
    name: "indexName",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.key_condition"),
    name: "keyConditionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.projection_expression"),
    name: "projectionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.filter_expression"),
    name: "filterExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_name"),
    name: "expressionAttributeNames",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_value"),
    name: "expressionAttributeValues",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.limit"),
    name: "limit",
    expectedType: VALIDATION_TYPES.NUMBER,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.select"),
    name: "select",
    expectedType: VALIDATION_TYPES.STRING,
  },
]

export const scanPanelItems = [
  {
    title: i18n.t("editor.action.panel.dynamo.label.index"),
    name: "indexName",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.projection_expression"),
    name: "projectionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.filter_expression"),
    name: "filterExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_name"),
    name: "expressionAttributeNames",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_value"),
    name: "expressionAttributeValues",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.limit"),
    name: "limit",
    expectedType: VALIDATION_TYPES.NUMBER,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.select"),
    name: "select",
    expectedType: VALIDATION_TYPES.STRING,
  },
]

export const updateItemPanelItems = [
  {
    title: i18n.t("editor.action.panel.dynamo.label.key"),
    name: "key",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.update_expression"),
    name: "updateExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.condition_expression"),
    name: "conditionExpression",
    expectedType: VALIDATION_TYPES.STRING,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_name"),
    name: "expressionAttributeNames",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
  {
    title: i18n.t("editor.action.panel.dynamo.label.attribute_value"),
    name: "expressionAttributeValues",
    expectedType: VALIDATION_TYPES.OBJECT,
  },
]
