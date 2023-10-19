import { ResourceType } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements"
import { ConfigElementProvider } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/provider"
import { Header } from "../components/resourceHeader"
import { WhiteList } from "../components/whiteList"
import { containerStyle, innerContainerStyle } from "./style"

export const ResourceCreate: FC = () => {
  const { resourceType } = useParams()

  const message = useMessage()
  const { t } = useTranslation()

  const handleOnFinished = () => {
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
      onFinished={handleOnFinished}
    >
      <div css={innerContainerStyle}>
        <Header resourceType={resourceType as ResourceType} />
        <div css={containerStyle}>
          <ConfigElement
            resourceType={resourceType as ResourceType}
            hasFooter={false}
          />
          {isCloudVersion && <WhiteList />}
        </div>
      </div>
    </ConfigElementProvider>
  )
}
