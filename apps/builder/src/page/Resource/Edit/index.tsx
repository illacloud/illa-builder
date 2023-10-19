import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { ResourceType } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ConfigElementProvider } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/provider"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { track } from "@/utils/mixpanelHelper"
import { ConfigElement } from "../../App/components/Actions/ResourceGenerator/ConfigElements"
import { Header } from "../components/resourceHeader"
import { WhiteList } from "../components/whiteList"
import { containerStyle, innerContainerStyle } from "./style"

export const ResourceEdit: FC = () => {
  const { resourceID } = useParams()

  const resourceList = useSelector(getAllResources)

  const message = useMessage()
  const { t } = useTranslation()

  const resource = resourceList.find((r) => r.resourceID === resourceID)

  if (!resource) {
    return <Navigate to="/404" />
  }

  const resourceType = resource.resourceType

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

  return (
    <ConfigElementProvider
      resourceType={resourceType as ResourceType}
      resourceID={resourceID}
      onFinished={handleOnFinished}
    >
      <div css={innerContainerStyle}>
        <Header resourceType={resourceType as ResourceType} />

        <div css={containerStyle}>
          <ConfigElement
            resourceType={resourceType}
            resourceID={resourceID}
            hasFooter={false}
          />
          {isCloudVersion && <WhiteList />}
        </div>
      </div>
    </ConfigElementProvider>
  )
}
