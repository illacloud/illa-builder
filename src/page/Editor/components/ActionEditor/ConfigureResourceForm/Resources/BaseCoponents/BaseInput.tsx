import { Input, Password } from "@illa-design/input"
import { forwardRef } from "react"
import { useController } from "react-hook-form"

import { BaseInputProps } from "./interface"

export const BaseInput = forwardRef<HTMLDivElement, BaseInputProps>(
  (props, ref) => {
    const {
      inputType = "Input",
      name,
      rules,
      shouldUnregister,
      defaultValue,
      control,
    } = props
    const {
      field,
      fieldState: { error },
    } = useController({ name, rules, shouldUnregister, defaultValue, control })

    return (
      <div ref={ref}>
        {inputType === "Input" ? (
          <Input {...field} borderColor={error ? "red" : "blue"} />
        ) : (
          <Password {...field} borderColor={error ? "red" : "blue"} />
        )}
        {error?.message}
      </div>
    )
  },
)
