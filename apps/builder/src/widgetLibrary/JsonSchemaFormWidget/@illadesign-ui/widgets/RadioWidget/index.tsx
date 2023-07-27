import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
  enumOptionsValueForIndex,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { RadioGroup } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({
  id,
  options,
  required,
  disabled,
  value,
  readonly,
  label,
  formContext,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options

  const _onChange = (value: unknown) => {
    onChange(value)
  }
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))

  return (
    <LabelWrapper required={required} label={label}>
      <RadioGroup
        colorScheme={formContext?.themeColor}
        disabled={disabled || readonly}
        id={id}
        name={id}
        onChange={_onChange}
        onBlur={_onBlur}
        value={value}
        onFocus={_onFocus}
        options={enumOptions?.map(({ value, label }) => ({
          value,
          label,
          disabled:
            Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1,
        }))}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </LabelWrapper>
  )
}
