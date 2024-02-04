import { CameraDevice } from "html5-qrcode"
import { FC } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { CloseIcon, Modal, Select, SelectValue } from "@illa-design/react"
import {
  containerStyle,
  iconStyle,
  modalStyle,
  readerContainer,
  readerStyle,
} from "./style"

interface CodeModalProps {
  displayName: string
  showScanner: boolean
  errorShow: boolean
  devices: CameraDevice[]
  selectDeviceID: string
  handleCancel: () => void
  handleSwitchDevice: (value?: SelectValue) => void
}

const CodeModal: FC<CodeModalProps> = ({
  displayName,
  showScanner,
  errorShow,
  devices,
  selectDeviceID,
  handleCancel,
  handleSwitchDevice,
}) => {
  const { t } = useTranslation()
  return createPortal(
    <Modal
      visible={showScanner}
      _css={modalStyle}
      onCancel={handleCancel}
      footer={false}
      withoutPadding
      closable
    >
      <div css={containerStyle}>
        <span css={iconStyle} onClick={handleCancel}>
          <CloseIcon />
        </span>
        {errorShow ? (
          <span>
            {t("editor.inspect.setter_message.qr_code.startup_failed")}
          </span>
        ) : (
          <div css={readerContainer}>
            <div id={`${displayName}-reader`} css={readerStyle} />
            <Select
              options={devices.map((item) => {
                return {
                  label: item.label,
                  value: item.id,
                }
              })}
              value={selectDeviceID}
              onChange={handleSwitchDevice}
            />
          </div>
        )}
      </div>
    </Modal>,
    document.body,
  )
}

export default CodeModal
