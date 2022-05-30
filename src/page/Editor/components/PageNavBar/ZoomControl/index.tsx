import { FC } from "react"
import { MinusIcon, PlusIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { controlStyle, numStyle } from "./style"

export const ZoomControl: FC = (props) => {
  return (
    <div css={controlStyle}>
      <Button colorScheme="grayBlue" size="small" leftIcon={<PlusIcon />} />
      <span css={numStyle}>100%</span>
      <Button colorScheme="grayBlue" size="small" leftIcon={<MinusIcon />} />
    </div>
  )
}

ZoomControl.displayName = "ZoomControl"
