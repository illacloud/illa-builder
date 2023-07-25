import {
  EnumOptionsType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
} from "@rjsf/utils"
import { Select, SelectOptionObject } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    options,
    label,
    placeholder,
    multiple,
    required,
    disabled,
    readonly,
    value,
    formContext,
    onChange,
    onBlur,
    onFocus,
    rawErrors = [],
  } = props
  const { enumOptions, enumDisabled, emptyValue } = options

  const _onChange = (value: any) => {
    return onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))
  }

  const _onBlur = () =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))

  const _onFocus = () =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))

  const _valueLabelMap: any = {}
  const displayEnumOptions: SelectOptionObject[] = Array.isArray(enumOptions)
    ? enumOptions.map((option: EnumOptionsType<S>, index: number) => {
        const { value, label } = option
        _valueLabelMap[index] = label || String(value)
        return {
          label,
          value: String(index),
          isDisabled:
            Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1,
        }
      })
    : []

  const isMultiple = typeof multiple !== "undefined" && Boolean(enumOptions)
  const selectedIndex = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
    isMultiple,
  )
  const formValue: any = isMultiple
    ? ((selectedIndex as string[]) || []).map((v: string) => {
        return `${v || ""}`
      })
    : `${selectedIndex || ""}`

  return (
    <LabelWrapper required={required} label={label}>
      <Select
        id={id}
        colorScheme={formContext?.themeColor}
        disabled={disabled}
        error={rawErrors && rawErrors.length > 0}
        readOnly={readonly}
        value={formValue}
        placeholder={placeholder}
        multiple={isMultiple}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
        options={displayEnumOptions}
      />
    </LabelWrapper>
  )
}
