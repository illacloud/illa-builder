import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useMessage } from "@illa-design/react"
import { track } from "@/utils/mixpanelHelper"
import { ResourceCreatePanel } from "../components/resourceCreatePanel"
import { ResourceCreateOrEditPanelProps } from "./interface"

export const ResourceCreateOrEditPanel: FC<ResourceCreateOrEditPanelProps> = (
  props,
) => {
  const { resourceID, resourceType } = props

  const message = useMessage()
  const { t } = useTranslation()

  const handleOnFinished = () => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE_EDIT,
      {
        element: "resource_configure_save",
      },
    )
    message.info({
      content: t("dashboard.message.save_resource"),
    })
    setTimeout(() => {
      window.close()
    }, 3000)
  }

  const handleClickBack = () => {
    window.close()
  }

  return (
    <ResourceCreatePanel
      resourceID={resourceID}
      resourceType={resourceType}
      handleOnFinished={handleOnFinished}
      handleOnClickBack={handleClickBack}
    />
  )
}
