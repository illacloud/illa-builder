import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
  rangeSpec,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { Slider } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function RangeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({
  value,
  readonly,
  disabled,
  onBlur,
  onFocus,
  options,
  schema,
  required,
  onChange,
  label,
  id,
  formContext,
}: WidgetProps<T, S, F>) {
  const sliderWidgetProps = { value, label, id, ...rangeSpec<S>(schema) }

  const _onChange = (value: number | number[]) => {
    onChange(value === undefined ? options.emptyValue : value)
  }
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  return (
    <LabelWrapper label={label} required={required}>
      <Slider
        {...sliderWidgetProps}
        id={id}
        colorScheme={formContext?.themeColor}
        disabled={disabled || readonly}
        value={value}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </LabelWrapper>
  )
}
