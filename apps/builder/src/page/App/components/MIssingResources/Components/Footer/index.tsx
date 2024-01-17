import { FC } from "react"
import { Button } from "@illa-design/react"
import { MissingResourceFooterProps } from "./interface"
import { missingResourceFooterContainerStyle } from "./style"

export const MissingResourceFooter: FC<MissingResourceFooterProps> = ({
  handleCancelModal,
  handleConfirmModal,
}) => {
  return (
    <div css={missingResourceFooterContainerStyle}>
      <Button colorScheme="grayBlue" fullWidth onClick={handleCancelModal}>
        Cancel
      </Button>
      <Button colorScheme="black" fullWidth onClick={handleConfirmModal}>
        Save
      </Button>
    </div>
  )
}
