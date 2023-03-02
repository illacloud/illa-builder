import { FC, Fragment, useCallback } from "react"
import { Controller, RegisterOptions } from "react-hook-form"
import {
  Checkbox,
  Input,
  InputNumber,
  Password,
  Select,
  Switch,
  TextArea,
  getColor,
} from "@illa-design/react"
import { ControlledElementProps } from "./interface"
import {
  applyConfigItemContainer,
  applyConfigItemLabelText,
  configItemTip,
  hostInputContainer,
  labelContainer,
  sslStyle,
} from "./style"

export const ControlledElement: FC<ControlledElementProps> = (props) => {
  const {
    title = "",
    contentLabel,
    isRequired = false,
    defaultValue,
    placeholders = [],
    styles = [],
    name,
    tips,
    controlledType,
    control,
    error,
    options = [],
    rules = [],
    tipsStyle,
    allowClear = false,
    labelStyle,
    onValueChange,
  } = props

  const filteredType = (
    Array.isArray(controlledType) ? controlledType : [controlledType]
  ).filter((type) => type.trim() && type !== "none")
  const names = Array.isArray(name) ? name : [name]
  const defaultValues = Array.isArray(defaultValue)
    ? defaultValue
    : [defaultValue]
  const hasTextArea = filteredType.includes("textarea")

  const getElementByControlledType = useCallback(
    (
      type: string,
      name: string,
      defaultValue: string | boolean,
      placeholder: string,
      rules: RegisterOptions,
      style: Record<string, string> | undefined = {},
    ) => {
      switch (type) {
        case "input":
          return (
            <Controller
              control={control}
              defaultValue={defaultValue}
              rules={rules}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  {...style}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={error}
                  colorScheme="techPurple"
                  placeholder={placeholder}
                />
              )}
              name={name}
            />
          )
        case "checkbox":
          return (
            <>
              <Controller
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Checkbox
                    {...style}
                    onBlur={onBlur}
                    onChange={(value) => {
                      onChange(value)
                      onValueChange?.(value)
                    }}
                    checked={value}
                    colorScheme="techPurple"
                    placeholder={placeholder}
                  />
                )}
                name={name}
              />
              <span css={sslStyle}>{contentLabel}</span>
            </>
          )
        case "select":
          return (
            <Controller
              control={control}
              defaultValue={defaultValue}
              rules={rules}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  value={value}
                  onBlur={onBlur}
                  allowClear={allowClear}
                  onChange={(value) => {
                    onValueChange?.(value as string)
                    onChange(value)
                  }}
                  colorScheme="techPurple"
                  options={options}
                />
              )}
              name={name}
            />
          )
        case "switch":
          return (
            <>
              <Controller
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Switch
                    checked={value}
                    colorScheme="techPurple"
                    onChange={(open) => {
                      onChange(open)
                      onValueChange?.(open)
                    }}
                    onBlur={onBlur}
                    {...style}
                  />
                )}
                name={name}
              />
              <span css={sslStyle}>{contentLabel}</span>
            </>
          )
        case "number":
          return (
            <Controller
              control={control}
              defaultValue={defaultValue}
              rules={rules}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputNumber
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  colorScheme="techPurple"
                  w="100%"
                  placeholder={placeholder}
                  {...style}
                />
              )}
              name={name}
            />
          )
        case "password":
          return (
            <Controller
              control={control}
              defaultValue={defaultValue}
              rules={rules}
              render={({ field: { value, onChange, onBlur } }) => (
                <Password
                  autoComplete="new-password"
                  colorScheme="techPurple"
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder={placeholder}
                  {...style}
                />
              )}
              name={name}
            />
          )
        case "textarea":
          return (
            <Controller
              control={control}
              defaultValue={defaultValue}
              rules={rules}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextArea
                  w="100%"
                  h="100%"
                  pb="16px"
                  minH="240px"
                  colorScheme="techPurple"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  autoSize={false}
                  placeholder={placeholder}
                  {...style}
                />
              )}
              name={name}
            />
          )
      }
    },
    [contentLabel, control, error, onValueChange, options],
  )

  return (
    <>
      {!!filteredType.length && (
        <div css={applyConfigItemContainer(hasTextArea)}>
          <div css={labelStyle ? labelStyle : labelContainer}>
            {isRequired && (
              <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                *
              </span>
            )}
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {title}
            </span>
          </div>
          <div css={hostInputContainer}>
            {filteredType.map((type, index) => (
              <Fragment key={index}>
                {getElementByControlledType(
                  type,
                  names[index],
                  defaultValues[index],
                  placeholders[index],
                  rules[index],
                  styles[index],
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}
      {tips && <div css={tipsStyle ? tipsStyle : configItemTip}>{tips}</div>}
    </>
  )
}

ControlledElement.displayName = "ControlledElement"
