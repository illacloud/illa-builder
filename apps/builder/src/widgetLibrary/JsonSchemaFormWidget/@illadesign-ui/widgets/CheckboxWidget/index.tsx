import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  schemaRequiresTrueValue,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { Checkbox } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    label,
    hideLabel,
    registry,
    options,
    uiSchema,
    schema,
    formContext,
  } = props

  const required = schemaRequiresTrueValue<S>(schema)
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, options)
  const description = options.description || schema.description

  const _onChange = (value: boolean) => onChange(value)
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement | any>) =>
    onBlur(id, value)
  const _onFocus = ({
    target: { value },
  }: FocusEvent<HTMLInputElement | any>) => onFocus(id, value)

  return (
    <>
      <LabelWrapper required={required} label={label} isSingleLine>
        <Checkbox
          colorScheme={formContext?.themeColor}
          id={id}
          disabled={disabled || readonly}
          checked={value ?? false}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          aria-describedby={ariaDescribedByIds<T>(id)}
        />
      </LabelWrapper>
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </>
  )
}
