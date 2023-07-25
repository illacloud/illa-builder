import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { Col, Input, Row } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WrapIfAdditionalTemplateProps<T, S, F>) {
  const {
    children,
    classNames,
    style,
    disabled,
    id,
    label,
    onDropPropertyClick,
    onKeyChange,
    readonly,
    registry,
    required,
    schema,
    uiSchema,
  } = props
  const { templates, translateString } = registry
  const { RemoveButton } = templates.ButtonTemplates
  const keyLabel = translateString(TranslatableString.KeyLabel, [label])
  const additional = ADDITIONAL_PROPERTY_FLAG in schema
  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    )
  }

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) =>
    onKeyChange(target.value)

  return (
    <Row
      key={`${id}-key`}
      className={classNames}
      style={style}
      align="center"
      verticalGap="8px"
      horizontalGap="8px"
    >
      <Col>
        <LabelWrapper required={required} label={keyLabel}>
          <Input
            id={`${id}-key`}
            defaultValue={label}
            disabled={disabled}
            onBlur={!readonly ? handleBlur : undefined}
            type="text"
            readOnly={readonly}
          />
        </LabelWrapper>
      </Col>
      <Col>{children}</Col>
      <Col>
        <RemoveButton
          disabled={disabled || readonly}
          onClick={onDropPropertyClick(label)}
          uiSchema={uiSchema}
          registry={registry}
        />
      </Col>
    </Row>
  )
}
