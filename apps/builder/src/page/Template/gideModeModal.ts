import { createModal } from "@illa-design/react"
import { updateTutorialViewed } from "@/api/users"
import i18n from "@/i18n/config"
import { ILLARoute } from "@/router"

const modal = createModal()

export const openGuideModal = async (teamIdentifier: string) => {
  const { t } = i18n
  await updateTutorialViewed(true)
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
