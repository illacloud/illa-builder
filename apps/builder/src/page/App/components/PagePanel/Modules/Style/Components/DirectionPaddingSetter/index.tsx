import { FC, FocusEventHandler, useRef } from "react"
import { Input } from "@illa-design/react"
import { DirectionPaddingSetterProps } from "./interface"
import { directionPaddingContainerStyle } from "./style"

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

export const DirectionPaddingSetter: FC<DirectionPaddingSetterProps> = (
  props,
) => {
  const { isAll, value, handleUpdateValue } = props
  const values = value.split(" ")

  const allInputRef = useRef<HTMLInputElement>(null)

  const handleChangeAllValue = (value: string) => {
    handleUpdateValue(value)
  }

  const handleBlurAllValue: FocusEventHandler<HTMLInputElement> = (e) => {
    handleUpdateValue(formatValue(e.target.value ?? ""))
  }

  const handleChangePartialValue = (index: number) => {
    return (value: string) => {
      values[index] = value
      handleUpdateValue(values.join(" "))
    }
  }

  return (
    <div css={directionPaddingContainerStyle}>
      {isAll ? (
        <Input
          prefix="All"
          colorScheme="techPurple"
          value={value}
          ref={allInputRef}
          onChange={handleChangeAllValue}
          onBlur={handleBlurAllValue}
        />
      ) : (
        <>
          <Input
            prefix="T"
            colorScheme="techPurple"
            bdRadius="8px 0 0 8px"
            value={values[0]}
            onChange={handleChangePartialValue(0)}
          />
          <Input
            prefix="R"
            colorScheme="techPurple"
            bdRadius="0"
            pos="relative"
            l="-1px"
            value={values[1]}
            onChange={handleChangePartialValue(1)}
          />
          <Input
            prefix="B"
            colorScheme="techPurple"
            bdRadius="0"
            pos="relative"
            l="-2px"
            value={values[2]}
            onChange={handleChangePartialValue(2)}
          />
          <Input
            prefix="L"
            colorScheme="techPurple"
            bdRadius="0 8px 8px 0"
            pos="relative"
            l="-3px"
            value={values[3]}
            onChange={handleChangePartialValue(3)}
          />
        </>
      )}
    </div>
  )
}
