import { FC, LazyExoticComponent, Suspense } from "react"
import { FullPageLoading } from "@/components/FullPageLoading"

export const SettingLazyLoad: FC<{ Comp: LazyExoticComponent<any> }> = ({
  Comp,
}) => {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <Comp />
    </Suspense>
  )
}

SettingLazyLoad.displayName = "AuthLayLoad"
