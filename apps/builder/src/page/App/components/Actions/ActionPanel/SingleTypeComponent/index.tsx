import { FC, useCallback, useMemo } from "react"
import { Checkbox, Select, SelectValue, Switch } from "@illa-design/react"
import { SingleComponentProps } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/interface"
import {
  actionLabelStyle,
  checkboxItemStyle,
  checkoutContentStyle,
  getActionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/style"

export const SingleTypeComponent: FC<SingleComponentProps> = (props) => {
  const {
    componentType,
    title,
    onChange,
    value,
    options,
    checkoutTitle,
    switchContent,
    onSelectedValueChange,
    onBooleanValueChange,
    placeholder,
  } = props

  const handleSelectValueChange = useCallback(
    (value?: boolean | SelectValue) => {
      if (value === undefined) {
        return
      }
      onChange?.(value)
      if (typeof value !== "boolean") {
        onSelectedValueChange?.(value)
      }
    },
    [onChange, onSelectedValueChange],
  )

  const handleBooleanValueChange = useCallback(
    (value: boolean) => {
      onChange?.(value)
      onBooleanValueChange?.(value)
    },
    [onBooleanValueChange, onChange],
  )

  const node = useMemo(() => {
    switch (componentType) {
      case "select":
        return (
          <Select
            w="100%"
            colorScheme="techPurple"
            ml="16px"
            onChange={handleSelectValueChange}
            value={value as SelectValue}
            options={options}
            placeholder={placeholder}
          />
        )
      case "checkbox":
        return (
          <div css={checkoutContentStyle}>
            <Checkbox
              colorScheme="techPurple"
              checked={!!value}
              ml="16px"
              onChange={handleBooleanValueChange}
            />
            <span css={checkboxItemStyle}>{checkoutTitle}</span>
          </div>
        )
      case "switch":
        return (
          <>
            <Switch
              colorScheme="techPurple"
              checked={!!value}
              ml="16px"
              onChange={handleBooleanValueChange}
            />
            <span css={checkboxItemStyle}>{switchContent}</span>
          </>
        )
    }
  }, [
    checkoutTitle,
    componentType,
    handleBooleanValueChange,
    handleSelectValueChange,
    options,
    placeholder,
    switchContent,
    value,
  ])

  return (
    <div css={getActionItemStyle(componentType)}>
      <span css={actionLabelStyle}>{title}</span>
      <>{node}</>
    </div>
  )
}

SingleTypeComponent.displayName = "SingleTypeComponent"
