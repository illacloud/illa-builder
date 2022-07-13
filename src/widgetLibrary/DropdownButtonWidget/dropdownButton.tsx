import { forwardRef, useMemo } from "react"
import { Button } from "@illa-design/button"
import { Dropdown } from "@illa-design/dropdown"
import { WrappedDropdownButtonProps } from "./interface"

export const WrappedDropdownButton = forwardRef<
  any,
  WrappedDropdownButtonProps
>((props, ref) => {
  return (
    <Dropdown dropList={<span>hello</span>}>
      <Button>Menu</Button>
    </Dropdown>
  )
})

WrappedDropdownButton.displayName = "WrappedDropdownButton"

export const DropdownButtonWidget = WrappedDropdownButton
