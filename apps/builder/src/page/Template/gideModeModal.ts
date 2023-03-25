import { createModal } from "@illa-design/react"
import i18n from "@/i18n/config"
import { ILLARoute } from "@/router"

const modal = createModal()

export const openGuideModal = (teamIdentifier: string) => {
  const { t } = i18n
  modal.show({
    id: "openGuide",
    title: t("tutorial.modal.tutorial.first_time.title"),
    children: t("tutorial.modal.tutorial.first_time.description"),
    cancelText: t("tutorial.modal.tutorial.first_time.cancel"),
    okText: t("tutorial.modal.tutorial.first_time.take"),
    okButtonProps: {
      colorScheme: "techPurple",
    },
    onOk: () => {
      ILLARoute.navigate(`/${teamIdentifier}/guide`)
    },
  })
}
