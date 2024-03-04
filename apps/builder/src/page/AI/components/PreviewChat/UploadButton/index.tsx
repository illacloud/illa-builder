import IconHotSpot from "@illa-public/icon-hot-spot"
import { forwardRef } from "react"
import { AttachmentIcon, Loading, getColor } from "@illa-design/react"
import { ACCEPT } from "../../KnowledgeUpload/contants"
import { sendFileContainerStyle, sendFileIconStyle } from "./style"

interface UploadButton {
  handleClick: () => void
  parseKnowledgeLoading: boolean
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = forwardRef<HTMLInputElement, UploadButton>(
  ({ handleClick, handleFileChange, parseKnowledgeLoading }, ref) => {
    return (
      <div css={sendFileContainerStyle}>
        <IconHotSpot onClick={handleClick} css={sendFileIconStyle}>
          {parseKnowledgeLoading ? (
            <Loading colorScheme="grayBlue" />
          ) : (
            <AttachmentIcon size="16px" color={getColor("grayBlue", "02")} />
          )}
        </IconHotSpot>
        <input
          style={{ display: "none" }}
          type="file"
          accept={ACCEPT.join(",")}
          ref={ref}
          onChange={handleFileChange}
        />
      </div>
    )
  },
)

UploadButton.displayName = "UploadButton"
export default UploadButton
