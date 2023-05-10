import { FC, Suspense, useEffect } from "react"
import { useSelector } from "react-redux"
import { Await, useLoaderData } from "react-router-dom"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { FullPageLoading } from "@/components/FullPageLoading"
import {
  deployContainerStyle,
  deployLogoStyle,
  logoStyle,
} from "@/page/Deploy/style"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import Page404 from "../status/404"
import { DeployContent } from "./content"

export const Deploy: FC = () => {
  const currentApp = useSelector(getAppInfo)
  const data = useLoaderData()

  useEffect(() => {
    document.title = currentApp.appName
  }, [currentApp.appName])

  return (
    <div css={deployContainerStyle}>
      <Suspense fallback={<FullPageLoading />}>
        <Await resolve={data} errorElement={<Page404 />}>
          <DeployContent />
        </Await>
      </Suspense>
      <div
        css={deployLogoStyle}
        onClick={() => {
          window.open("https://illacloud.com", "_blank")
        }}
      >
        <span>Powered by</span>
        <Logo css={logoStyle} />
      </div>
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
