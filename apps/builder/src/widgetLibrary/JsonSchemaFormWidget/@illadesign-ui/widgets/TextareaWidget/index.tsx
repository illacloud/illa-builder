import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { TextArea } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({
  id,
  placeholder,
  value,
  label,
  disabled,
  readonly,
  onBlur,
  onFocus,
  onChange,
  options,
  required,
  rawErrors,
  formContext,
}: WidgetProps<T, S, F>) {
  const _onChange = (value: string | undefined) =>
    onChange(value === "" ? options.emptyValue : value)
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onFocus(id, value)

  return (
    <LabelWrapper required={required} label={label}>
      <TextArea
        id={id}
        colorScheme={formContext?.themeColor}
        error={rawErrors && rawErrors.length > 0}
        disabled={disabled}
        readOnly={readonly}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </LabelWrapper>
  )
}
