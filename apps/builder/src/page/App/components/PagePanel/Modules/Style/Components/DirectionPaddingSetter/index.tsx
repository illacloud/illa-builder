import { FC, FocusEventHandler, useRef } from "react"
import { useDispatch } from "react-redux"
import { Input } from "@illa-design/react"
import { configActions } from "@/redux/config/configSlice"
import { DirectionPaddingSetterProps } from "./interface"
import { directionPaddingContainerStyle, prefixContainerStyle } from "./style"

const formatValue = (value: string) => {
  const values = value
    .split(" ")
    .filter((v) => v !== "")
    .filter((v) => !isNaN(Number(v)))
  if (values.length === 2) {
    return `${values[0]} ${values[1]} 0 0`
  }
  if (values.length === 3) {
    return `${values[0]} ${values[1]} ${values[2]} 0`
  }
  if (values.length > 4) {
    return `${values[0]} ${values[1]} ${values[2]} ${values[3]}`
  }
  return values.join(" ")
}

const formatPartialValue = (value: string = "") => {
  if (!/^[0-9]+$/.test(value)) {
    return "0"
  }
  return value
}

export const DirectionPaddingSetter: FC<DirectionPaddingSetterProps> = (
  props,
) => {
  const { isAll, value, handleUpdateValue } = props
  const values = value.split(" ")

  const allInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleChangeAllValue = (value: string) => {
    handleUpdateValue(value)
  }

  const handleBlurAllValue: FocusEventHandler<HTMLInputElement> = (e) => {
    handleUpdateValue(formatValue(e.target.value ?? ""))
    dispatch(configActions.updateShowDot(false))
  }

  const handleChangePartialValue = (index: number) => {
    return (value: string) => {
      values[index] = value
      if (value !== "" && !/^[0-9]+$/.test(value)) return
      handleUpdateValue(values.join(" "))
    }
  }

  const handleOnFocus = () => {
    dispatch(configActions.updateShowDot(true))
  }

  const handleOnBlurPartialValue = (index: number) => {
    const fixFunc: FocusEventHandler<HTMLInputElement> = (e) => {
      dispatch(configActions.updateShowDot(false))
      const value = formatPartialValue(e.target.value)
      values[index] = value
      handleUpdateValue(values.join(" "))
    }
    return fixFunc
  }

  return (
    <div css={directionPaddingContainerStyle}>
      {isAll ? (
        <Input
          prefix={<span css={prefixContainerStyle}>All</span>}
          colorScheme="techPurple"
          value={value}
          ref={allInputRef}
          onFocus={handleOnFocus}
          onChange={handleChangeAllValue}
          onBlur={handleBlurAllValue}
        />
      ) : (
        <>
          <Input
            prefix={<span css={prefixContainerStyle}>T</span>}
            colorScheme="techPurple"
            bdRadius="8px 0 0 8px"
            value={values[0]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlurPartialValue(0)}
            onChange={handleChangePartialValue(0)}
          />
          <Input
            prefix={<span css={prefixContainerStyle}>R</span>}
            colorScheme="techPurple"
            bdRadius="0"
            pos="relative"
            l="-1px"
            value={values[1]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlurPartialValue(1)}
            onChange={handleChangePartialValue(1)}
          />
          <Input
            prefix={<span css={prefixContainerStyle}>B</span>}
            colorScheme="techPurple"
            bdRadius="0"
            pos="relative"
            l="-2px"
            value={values[2]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlurPartialValue(2)}
            onChange={handleChangePartialValue(2)}
          />
          <Input
            prefix={<span css={prefixContainerStyle}>L</span>}
            colorScheme="techPurple"
            bdRadius="0 8px 8px 0"
            pos="relative"
            l="-3px"
            value={values[3]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlurPartialValue(3)}
            onChange={handleChangePartialValue(3)}
          />
        </>
      )}
    </div>
  )
}
