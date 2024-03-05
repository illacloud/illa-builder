import IconHotSpot from "@illa-public/icon-hot-spot"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { AttachmentIcon, Loading, Trigger, getColor } from "@illa-design/react"
import { ACCEPT } from "../../KnowledgeUpload/contants"
import { sendFileContainerStyle, sendFileIconStyle } from "./style"

interface UploadButton {
  handleClick: () => void
  parseKnowledgeLoading: boolean
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = forwardRef<HTMLInputElement, UploadButton>(
  ({ handleClick, handleFileChange, parseKnowledgeLoading }, ref) => {
    const { t } = useTranslation()
    return (
      <Trigger
        content={t("dashboard.message.support_for_uploadin")}
        position="top"
        maxW="300px"
      >
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
            multiple
            onChange={handleFileChange}
          />
        </div>
      </Trigger>
    )
  },
)

UploadButton.displayName = "UploadButton"
export default UploadButton
