import { FC, useCallback, useMemo } from "react"
import { Checkbox, Select, SelectValue } from "@illa-design/react"
import { SingleComponentProps } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/interface"
import {
  actionLabelStyle,
  checkboxItemStyle,
  checkoutContentStyle,
  getActionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/style"
import { InputEditor } from "@/page/App/components/InputEditor"

export const SingleTypeComponent: FC<SingleComponentProps> = (props) => {
  const {
    componentType,
    title,
    onChange,
    value,
    options,
    placeholder,
    checkoutTitle,
  } = props

  const handleSelectValueChange = useCallback(
    (value?: SelectValue) => {
      if (value === undefined) {
        return
      }
      onChange(value)
    },
    [onChange],
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
              onChange={onChange}
            />
            <span css={checkboxItemStyle}>{checkoutTitle}</span>
          </div>
        )
    }
  }, [
    checkoutTitle,
    componentType,
    handleSelectValueChange,
    onChange,
    options,
    value,
  ])

  if (componentType === "editor") {
    return <InputEditor {...props} value={props.value as string} />
  }
  return (
    <div css={getActionItemStyle(componentType)}>
      <span css={actionLabelStyle}>{title}</span>
      <>{node}</>
    </div>
  )
}

SingleTypeComponent.displayName = "SingleTypeComponent"
