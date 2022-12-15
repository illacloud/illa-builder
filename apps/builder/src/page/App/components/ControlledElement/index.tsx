import {
  applyConfigItemLabelText,
  labelContainer,
  hostInputContainer,
  applyConfigItemContainer,
} from "./style"
import { FC, useCallback } from "react"
import {
  Input,
  Password,
  Switch,
  getColor,
  InputNumber,
  TextArea,
} from "@illa-design/react"
import { Controller } from "react-hook-form"
import {
  configItemTip,
  sslStyle,
} from "@/page/App/components/Actions/S3ConfigElement/style"
import { ContrilledElementProps } from "@/page/App/components/ControlledElement/interface"

export const ControlledElement: FC<ContrilledElementProps> = (props) => {
  const {
    title,
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
    rules,
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
                  borderColor="techPurple"
                  placeholder={placeholder}
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
                  borderColor="techPurple"
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
                  borderColor="techPurple"
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
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  autoSize
                  placeholder={placeholder}
                  {...style}
                />
              )}
              name={name}
            />
          )
      }
    },
    [contentLabel, control, error, onValueChange, rules],
  )

  return (
    <>
      <div css={applyConfigItemContainer(hasTextArea)}>
        <div css={labelContainer}>
          {isRequired && (
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          )}
          <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
            {title}
          </span>
        </div>
        {!!filteredType.length && (
          <div css={hostInputContainer}>
            {filteredType.map((type, index) =>
              getElementByControlledType(
                type,
                names[index],
                defaultValues[index],
                placeholders[index],
                styles[index],
              ),
            )}
          </div>
        )}
      </div>
      {tips && <div css={configItemTip}>{tips}</div>}
    </>
  )
}

ControlledElement.displayName = "ControlledElement"
