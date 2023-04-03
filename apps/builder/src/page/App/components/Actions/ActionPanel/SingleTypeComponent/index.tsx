import { FC, useCallback, useMemo } from "react"
import {
  Checkbox,
  RadioGroup,
  Select,
  SelectValue,
  Switch,
} from "@illa-design/react"
import { SingleComponentProps } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/interface"
import {
  actionLabelStyle,
  checkboxContentContainerStyle,
  checkboxItemStyle,
  checkboxTipsStyle,
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
    showSearch = false,
    tips,
    radioOptions,
    forceEqualWidth,
    type,
    loading,
    error,
    style = {},
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
      case "radio-group":
        return (
          <RadioGroup
            w="100%"
            colorScheme="gray"
            ml="16px"
            type={type}
            forceEqualWidth={forceEqualWidth}
            onChange={onChange}
            value={value}
            options={radioOptions}
          />
        )
      case "select":
        return (
          <Select
            w="100%"
            colorScheme="techPurple"
            ml="16px"
            loading={loading}
            error={error}
            showSearch={showSearch}
            onChange={handleSelectValueChange}
            value={value as SelectValue}
            options={options}
            placeholder={placeholder}
          />
        )
      case "checkbox":
        return (
          <div css={checkboxContentContainerStyle}>
            <div css={checkoutContentStyle}>
              <Checkbox
                colorScheme="techPurple"
                checked={!!value}
                ml="16px"
                onChange={handleBooleanValueChange}
              />
              <span css={checkboxItemStyle}>{checkoutTitle}</span>
            </div>
            {tips && <div css={checkboxTipsStyle}>{tips}</div>}
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
    error,
    forceEqualWidth,
    handleBooleanValueChange,
    handleSelectValueChange,
    loading,
    onChange,
    options,
    placeholder,
    radioOptions,
    showSearch,
    switchContent,
    tips,
    type,
    value,
  ])

  return (
    <div css={getActionItemStyle(componentType)} style={style}>
      <span css={actionLabelStyle}>{title}</span>
      <>{node}</>
    </div>
  )
}

SingleTypeComponent.displayName = "SingleTypeComponent"
