import {
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps,
  FormContextType,
  GenericObjectType,
  RJSFSchema,
  StrictRJSFSchema,
  getTemplate,
  getUiOptions,
} from "@rjsf/utils"
import { Col, Row } from "@illa-design/react"
import { fieldsetStyle } from "./style"

const DESCRIPTION_COL_STYLE = {
  paddingBottom: "8px",
}

export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    className,
    disabled,
    formContext,
    idSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
  } = props
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions)
  const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate", T, S, F>(
    "ArrayFieldItemTemplate",
    registry,
    uiOptions,
  )
  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions)
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates
  const { rowGutter = 24 } = formContext as GenericObjectType

  return (
    <fieldset className={className} id={idSchema.$id} css={fieldsetStyle}>
      <Row>
        {(uiOptions.title || title) && (
          <Col span={24}>
            <ArrayFieldTitleTemplate
              idSchema={idSchema}
              required={required}
              title={uiOptions.title || title}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          </Col>
        )}
        {(uiOptions.description || schema.description) && (
          <Col span={24} style={DESCRIPTION_COL_STYLE}>
            <ArrayFieldDescriptionTemplate
              description={uiOptions.description || schema.description}
              idSchema={idSchema}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          </Col>
        )}
        <Col span={24}>
          {items &&
            Array.isArray(items) &&
            items.map(
              ({ key, ...itemProps }: ArrayFieldTemplateItemType<T, S, F>) => (
                <ArrayFieldItemTemplate key={key} {...itemProps} />
              ),
            )}
        </Col>

        {canAdd && (
          <Col span={24}>
            <Row verticalGap={rowGutter} justify="end">
              <Col flex="192px">
                <AddButton
                  className="array-item-add"
                  disabled={disabled || readonly}
                  onClick={onAddClick}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </fieldset>
  )
}
