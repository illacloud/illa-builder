import { FC } from "react"
import { ConfigureResourceFormProps } from "./interface"
import { MySQL } from "./Resources"

import { BackBtnCSS, FormContainerCSS } from "./style"
import { Button } from "@illa-design/button"
import {
  BackAreaCSS,
  BackIconCSS,
  BackTextCSS,
} from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/Resources/MySQL/style"
import { PaginationPreIcon } from "@illa-design/icon"

export const ConfigureResourceForm: FC<ConfigureResourceFormProps> = (
  props,
) => {
  const { back } = props
  return (
    <div css={FormContainerCSS}>
      <MySQL />
      <Button
        variant="text"
        size="medium"
        colorScheme="grayBlue"
        type="button"
        onClick={back}
        css={BackBtnCSS}
      >
        <div css={BackAreaCSS}>
          <div css={BackIconCSS}>
            <PaginationPreIcon />
          </div>
          <span css={BackTextCSS}>Back</span>
        </div>
      </Button>
    </div>
  )
}
