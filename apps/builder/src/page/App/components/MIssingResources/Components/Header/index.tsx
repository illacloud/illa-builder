import { FC } from "react"
import { CloseIcon } from "@illa-design/react"
import IconHotSpot from "@/components/IconHotSpot"
import { headerContainerStyle, headerStyle } from "./style"

export const MissingResourceHeader: FC<{ handleCloseModal: () => void }> = ({
  handleCloseModal,
}) => {
  return (
    <div css={headerContainerStyle}>
      <h3 css={headerStyle}>Missing Resources</h3>
      <IconHotSpot onClick={handleCloseModal}>
        <CloseIcon />
      </IconHotSpot>
    </div>
  )
}
