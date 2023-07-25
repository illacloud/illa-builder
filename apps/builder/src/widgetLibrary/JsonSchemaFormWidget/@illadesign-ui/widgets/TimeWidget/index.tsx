import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
} from "@rjsf/utils"
import { TimePicker } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function TimeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    readonly,
    disabled,
    label,
    value,
    onChange,
    rawErrors,
    required,
    formContext,
  } = props

  const _onChange = (value: undefined | string) => onChange(value)

  return (
    <LabelWrapper required={required} label={label}>
      <TimePicker
        colorScheme={formContext?.themeColor}
        error={rawErrors && rawErrors.length > 0}
        disabled={disabled || readonly}
        value={value ?? ""}
        onChange={_onChange}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </LabelWrapper>
  )
}
