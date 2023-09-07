import { FC, Suspense } from "react"
import { Await, useLoaderData } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { deployContainerStyle } from "@/page/Deploy/style"
import Page404 from "@/page/Status/404"
import { DeployContent } from "./content"

export const Deploy: FC = () => {
  const data = useLoaderData()
  return (
    <div css={deployContainerStyle}>
      <Suspense fallback={<FullPageLoading />}>
        <Await resolve={data} errorElement={<Page404 />}>
          <DeployContent />
        </Await>
      </Suspense>
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
