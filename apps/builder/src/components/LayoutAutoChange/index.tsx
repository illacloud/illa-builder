import { FC, ReactNode, lazy } from "react"
import { useWindowSize } from "react-use"
import { layLoad } from "@/router/routerConfig"
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
        ? layLoad(lazy(() => import("@/page/status/MobileFobidden")))
        : desktopPage}
    </>
  )
}

export default LayoutAutoChange
