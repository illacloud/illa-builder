import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
  enumOptionsValueForIndex,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { CheckboxGroup } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    disabled,
    options,
    value,
    readonly,
    onChange,
    onBlur,
    onFocus,
    required,
    className,
    label,
    formContext,
  } = props
  const { enumOptions, enumDisabled, emptyValue } = options
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))

  const row = options ? options.inline : false

  return (
    <div className={className}>
      <LabelWrapper required={required} label={label}>
        <CheckboxGroup
          id={id}
          colorScheme={formContext?.themeColor}
          direction={row ? "horizontal" : "vertical"}
          disabled={disabled || readonly}
          value={value}
          onChange={(option) => onChange(option)}
          onBlur={_onBlur}
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
    </div>
  )
}
