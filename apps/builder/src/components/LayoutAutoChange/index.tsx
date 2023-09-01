import { FC, ReactNode, lazy } from "react"
import { useWindowSize } from "react-use"
import { lazyLoad } from "@/router/utils/lazyLoad"
import { isMobileByWindowSize } from "@/utils/screen"

interface LayoutAutoChangeProps {
  desktopPage: ReactNode
}

export const LayoutAutoChange: FC<LayoutAutoChangeProps> = (props) => {
  const { desktopPage } = props
  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)
  return (
    <>
      {isMobile
        ? lazyLoad(lazy(() => import("@/page/Status/MobileFobidden")))
        : desktopPage}
    </>
  )
}

export default LayoutAutoChange
