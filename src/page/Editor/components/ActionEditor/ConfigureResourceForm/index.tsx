import { FC } from "react"
import { ConfigureResourceFormProps } from "./interface"
import { MySQL } from "./Resources"

import { FormContainerCSS } from "./style"

export const ConfigureResourceForm: FC<ConfigureResourceFormProps> = (
  props,
) => {
  return (
    <div css={FormContainerCSS}>
      <MySQL />
    </div>
  )
}
