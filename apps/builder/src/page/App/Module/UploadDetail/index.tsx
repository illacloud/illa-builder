import { motion } from "framer-motion"
import { FC, useState, useSyncExternalStore } from "react"
import { CloseIcon, Loading, SuccessIcon, UploadIcon } from "@illa-design/react"
import { ProcessDetailModal } from "./components/ProcessDetailModal"
import { updateFileDetailStore } from "./store"
import {
  closeIconStyle,
  controllerAreaContainerStyle,
  placeholderIconStyle,
  processingTextStyle,
  uploadDetailContainerStyle,
} from "./style"
import { getAreaStatues, getSuccessFiles } from "./utils"

const getStatusIcon = (status: "success" | "processing" | "initial") => {
  switch (status) {
    case "success":
      return <SuccessIcon />
    case "processing":
      return <Loading colorScheme="white" w="12px" h="12px" />
    case "initial":
    default:
      return <span css={placeholderIconStyle} />
  }
}

export const UploadDetailButton: FC = () => {
  const [processModalVisible, setProcessModalVisible] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const uploadFiles = useSyncExternalStore(
    updateFileDetailStore.subscribe,
    updateFileDetailStore.getSnapshot,
  )

  return (
    <>
      <motion.div
        initial={{
          y: 0,
        }}
        animate={
          showButton
            ? {
                y: -32,
              }
            : {
                y: 24,
              }
        }
        css={uploadDetailContainerStyle}
        onMouseEnter={() => {
          if (!showButton) {
            setShowButton(true)
          }
        }}
      >
        <div
          css={controllerAreaContainerStyle}
          onClick={() => {
            if (showButton) {
              setProcessModalVisible(true)
            } else {
              setShowButton(true)
            }
          }}
        >
          <UploadIcon />
          <span css={processingTextStyle}>
            {getSuccessFiles(uploadFiles).length}/{uploadFiles.length}
          </span>
          {getStatusIcon(getAreaStatues(uploadFiles))}
        </div>
        <span
          css={closeIconStyle}
          onClick={() => {
            setShowButton(false)
          }}
        >
          <CloseIcon />
        </span>
      </motion.div>

      <ProcessDetailModal
        open={processModalVisible}
        changeOpen={setProcessModalVisible}
      />
    </>
  )
}
