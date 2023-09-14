import { FC } from "react"
import { Input } from "@illa-design/react"
import { DirectionPaddingSetterProps } from "./interface"
import { directionPaddingContainerStyle } from "./style"

export const DirectionPaddingSetter: FC<DirectionPaddingSetterProps> = (
  props,
) => {
  const { isAll } = props
  return (
    <div css={directionPaddingContainerStyle}>
      {isAll ? (
        <Input prefix="All" colorScheme="techPurple" />
      ) : (
        <>
          <Input prefix="T" colorScheme="techPurple" bdRadius="8px 0 0 8px" />
          <Input
            prefix="R"
            colorScheme="techPurple"
            bdRadius="0"
            pos="relative"
            l="-1px"
          />
          <Input
            prefix="B"
            colorScheme="techPurple"
            bdRadius="0"
            pos="relative"
            l="-2px"
          />
          <Input
            prefix="L"
            colorScheme="techPurple"
            bdRadius="0 8px 8px 0"
            pos="relative"
            l="-3px"
          />
        </>
      )}
    </div>
  )
}
