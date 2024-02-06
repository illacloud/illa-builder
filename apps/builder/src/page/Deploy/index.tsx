import { FC, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { useSelector } from "react-redux"
import { Await, useLoaderData } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { deployContainerStyle } from "@/page/Deploy/style"
import Page404 from "@/page/Status/404"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { MediaSourceLoadProvider } from "@/utils/mediaSourceLoad"
import { DeployContent } from "./content"

export const Deploy: FC = () => {
  const data = useLoaderData()

  const appInfo = useSelector(getAppInfo)

  return (
    <>
      <Helmet>
        <title>{appInfo.appName}</title>
      </Helmet>
      <div css={deployContainerStyle}>
        <Suspense fallback={<FullPageLoading />}>
          <Await resolve={data} errorElement={<Page404 />}>
            <MediaSourceLoadProvider>
              <DeployContent />
            </MediaSourceLoadProvider>
          </Await>
        </Suspense>
      </div>
    </>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
