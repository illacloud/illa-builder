import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { InputNumber } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function UpDownWidget<
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
    onBlur,
    onFocus,
    rawErrors,
    required,
    formContext,
  } = props

  const _onChange = (value: undefined | number) => onChange(value)
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  return (
    <LabelWrapper required={required} label={label}>
      <InputNumber
        id={id}
        colorScheme={formContext?.themeColor}
        mode="button"
        error={rawErrors && rawErrors.length > 0}
        disabled={disabled}
        readOnly={readonly}
        value={value ?? ""}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </LabelWrapper>
  )
}
