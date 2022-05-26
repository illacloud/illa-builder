import { FC } from "react"
import { MinusIcon, PlusIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { controlStyle } from "./style"

export const ZoomControl: FC = (props) => {
  return (
    <div css={controlStyle}>
      <Button
        colorScheme="gray"
        size="small"
        leftIcon={<PlusIcon size={"10px"} />}
      />
      <span>100%</span>
      <Button
        colorScheme="gray"
        size="small"
        leftIcon={<MinusIcon size={"10px"} />}
      />
    </div>
  )
}

ZoomControl.displayName = "ZoomControl"
