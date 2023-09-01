import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { createModal } from "@illa-design/react"
import i18n from "@/i18n/config"
import { ILLARoute } from "@/router"
import { updateTutorialViewed } from "@/services/users"
import { track } from "@/utils/mixpanelHelper"

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
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "before_onboarding_modal_confirm" },
      )
      ILLARoute.navigate(`/${teamIdentifier}/guide`)
    },
    onCancel: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "before_onboarding_modal_close" },
      )
    },
    afterOpen: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "before_onboarding_modal" },
      )
    },
  })
}
