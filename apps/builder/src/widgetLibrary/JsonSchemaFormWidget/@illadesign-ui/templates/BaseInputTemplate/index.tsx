import {
  BaseInputTemplateProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  ariaDescribedByIds,
  examplesId,
  getInputProps,
} from "@rjsf/utils"
import { FocusEvent } from "react"
import { Input, Password } from "@illa-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@illadesign-ui/labelWrapper"

export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: BaseInputTemplateProps<T, S, F>) {
  const {
    id,
    type,
    value,
    label,
    schema,
    onChange,
    onBlur,
    onFocus,
    options,
    required,
    readonly,
    rawErrors,
    autofocus,
    placeholder,
    disabled,
    formContext,
  } = props
  const inputProps = getInputProps<T, S, F>(schema, type, options)

  const _onChange = (value: string) =>
    onChange(value === "" ? options.emptyValue : value)
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  return (
    <LabelWrapper required={required} label={label}>
      {type === "password" ? (
        <Password
          id={id}
          error={rawErrors && rawErrors.length > 0}
          disabled={disabled}
          readOnly={readonly}
          value={value || value === 0 ? value : ""}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          autoFocus={autofocus}
          placeholder={placeholder}
          colorScheme={formContext?.themeColor}
          aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
        />
      ) : (
        <>
          <Input
            id={id}
            error={rawErrors && rawErrors.length > 0}
            disabled={disabled}
            readOnly={readonly}
            value={value || value === 0 ? value : ""}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            autoFocus={autofocus}
            placeholder={placeholder}
            colorScheme={formContext?.themeColor}
            {...inputProps}
            list={schema.examples ? examplesId<T>(id) : undefined}
            aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
          />
          {Array.isArray(schema.examples) ? (
            <datalist id={examplesId<T>(id)}>
              {(schema.examples as string[])
                .concat(
                  schema.default && !schema.examples.includes(schema.default)
                    ? ([schema.default] as string[])
                    : [],
                )
                .map((example: string) => {
                  return <option key={example} value={example} />
                })}
            </datalist>
          ) : null}
        </>
      )}
    </LabelWrapper>
  )
}
