import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input, Modal, useMessage } from "@illa-design/react"

export interface ForkAndDeployModalProps {
  visible: boolean
  okLoading: boolean
  onVisibleChange: (visible: boolean) => void
  onOk: (appName: string) => void
}

export const ForkAndDeployModal: FC<ForkAndDeployModalProps> = (props) => {
  const { visible, okLoading, onVisibleChange, onOk } = props

  const { t } = useTranslation()

  const message = useMessage()
  const [appName, setAppName] = useState<string>()

  return (
    <Modal
      w="496px"
      closable
      autoFocus
      footerAlign="right"
      visible={visible}
      title={t("editor.tutorial.panel.tutorial.modal.title")}
      okText={t("editor.tutorial.panel.tutorial.modal.fork")}
      cancelText={t("editor.tutorial.panel.tutorial.modal.cancel")}
      okButtonProps={{
        colorScheme: "techPurple",
        disabled: !appName,
      }}
      okLoading={okLoading}
      onCancel={() => {
        onVisibleChange(false)
      }}
      onOk={() => {
        if (appName === undefined || appName === "" || appName.trim() === "") {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          return
        }
        onOk(appName)
      }}
    >
      <Input colorScheme="techPurple" onChange={setAppName} />
    </Modal>
  )
}

ForkAndDeployModal.displayName = "ForkAndDeployModal"
