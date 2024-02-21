import { CameraDevice } from "html5-qrcode"
import { FC } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import {
  CloseIcon,
  Modal,
  Select,
  SelectValue,
  TriggerProvider,
} from "@illa-design/react"
import {
  containerStyle,
  iconStyle,
  modalStyle,
  readerContainer,
  readerStyle,
  successContentStyle,
} from "./style"

interface CodeModalProps {
  displayName: string
  errorShow: boolean
  colorScheme: string
  devices: CameraDevice[]
  selectDeviceID: string
  handleCancel: () => void
  handleSwitchDevice: (value?: SelectValue) => void
}

interface SuccessModalProps {
  colorScheme: string
  value: string
  onOK: () => void
  onClose: () => void
}

const SCAN_MODAL_INDEX = 1000
const SUCCESS_MODAL_INDEX = 1005

export const CodeModal: FC<CodeModalProps> = ({
  displayName,
  errorShow,
  devices,
  colorScheme,
  selectDeviceID,
  handleCancel,
  handleSwitchDevice,
}) => {
  const { t } = useTranslation()
  return createPortal(
    <TriggerProvider zIndex={SCAN_MODAL_INDEX}>
      <Modal
        visible
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
                colorScheme={colorScheme}
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
      </Modal>
    </TriggerProvider>,
    document.body,
  )
}

export const SuccessModal: FC<SuccessModalProps> = ({
  value,
  colorScheme,
  onClose,
  onOK,
}) => {
  const { t } = useTranslation()
  return createPortal(
    <TriggerProvider zIndex={SUCCESS_MODAL_INDEX}>
      <Modal
        visible
        _css={modalStyle}
        title={t("editor.inspect.setter_message.scan.title")}
        okText={t("editor.inspect.setter_message.scan.rescan")}
        cancelText={t("editor.inspect.setter_message.scan.close")}
        onOk={onOK}
        onCancel={onClose}
        okButtonProps={{
          colorScheme,
        }}
      >
        <span css={successContentStyle}>
          {t("editor.inspect.setter_message.scan.desc", {
            scanValue: value,
          })}
        </span>
      </Modal>
    </TriggerProvider>,
    document.body,
  )
}
export default CodeModal
