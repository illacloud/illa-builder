import {
  FormContextType,
  GenericObjectType,
  ObjectFieldTemplatePropertyType,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  UiSchema,
  canExpand,
  descriptionId,
  getTemplate,
  getUiOptions,
  titleId,
} from "@rjsf/utils"
import { isNumber, isObject, isString } from "lodash-es"
import { Col, Row } from "@illa-design/react"

export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: ObjectFieldTemplateProps<T, S, F>) {
  const {
    description,
    title,
    properties,
    formContext,
    required,
    disabled,
    readonly,
    uiSchema,
    idSchema,
    schema,
    formData,
    onAddClick,
    registry,
  } = props
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate", T, S, F>(
    "TitleFieldTemplate",
    registry,
    uiOptions,
  )
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, uiOptions)
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates

  const { colSpan = 24 } = formContext as GenericObjectType

  const findSchema = (element: ObjectFieldTemplatePropertyType): S =>
    element.content.props.schema

  const findSchemaType = (element: ObjectFieldTemplatePropertyType) =>
    findSchema(element).type

  const findUiSchema = (
    element: ObjectFieldTemplatePropertyType,
  ): UiSchema<T, S, F> | undefined => element.content.props.uiSchema

  const findUiSchemaField = (element: ObjectFieldTemplatePropertyType) =>
    getUiOptions(findUiSchema(element)).field

  const findUiSchemaWidget = (element: ObjectFieldTemplatePropertyType) =>
    getUiOptions(findUiSchema(element)).widget

  const calculateColSpan = (element: ObjectFieldTemplatePropertyType) => {
    const type = findSchemaType(element)
    const field = findUiSchemaField(element)
    const widget = findUiSchemaWidget(element)

    const defaultColSpan =
      properties.length < 2 || // Single or no field in object.
      type === "object" ||
      type === "array" ||
      widget === "textarea"
        ? 24
        : 12

    if (isObject(colSpan)) {
      const colSpanObj: GenericObjectType = colSpan
      if (isString(widget)) {
        return colSpanObj[widget]
      }
      if (isString(field)) {
        return colSpanObj[field]
      }
      if (isString(type)) {
        return colSpanObj[type]
      }
    }
    if (isNumber(colSpan)) {
      return colSpan
    }
    return defaultColSpan
  }

  return (
    <>
      <Row w="100%">
        {title && (
          <TitleFieldTemplate
            id={titleId<T>(idSchema)}
            title={title}
            required={required}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        )}
      </Row>
      <Row>
        {description && (
          <DescriptionFieldTemplate
            id={descriptionId<T>(idSchema)}
            description={description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        )}
        {properties.map((element, index) =>
          element.hidden ? (
            element.content
          ) : (
            <Col
              key={`${idSchema.$id}-${element.name}-${index}`}
              span={calculateColSpan(element)}
            >
              {element.content}
            </Col>
          ),
        )}
      </Row>

      {canExpand(schema, uiSchema, formData) && (
        <Col span={24}>
          <Row justify="end">
            <Col flex="192px">
              <AddButton
                className="object-property-expand"
                disabled={disabled || readonly}
                onClick={onAddClick(schema)}
                uiSchema={uiSchema}
                registry={registry}
              />
            </Col>
          </Row>
        </Col>
      )}
    </>
  )
}
