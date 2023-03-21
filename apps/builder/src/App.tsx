import createCache from "@emotion/cache"
import { CSSObject, CacheProvider, Global } from "@emotion/react"
import { Tour, TourProvider, components } from "@reactour/tour"
import { useEffect } from "react"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"
import { HelmetProvider } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RouterProvider } from "react-router-dom"
import {
  ConfigProvider,
  MessageGroup,
  ModalGroup,
  NotificationGroup,
} from "@illa-design/react"
import "@/api/base"
import { illaCodeMirrorTooltipStyle } from "@/components/CodeEditor/CodeMirror/theme"
import { STEP } from "@/components/Guide/config"
import { GlobalDataProvider } from "@/page/App/context/globalDataProvider"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import {
  getCurrentConfigLanguage,
  getCurrentTranslateLanguage,
} from "@/redux/currentUser/currentUserSelector"
import { ILLARoute } from "@/router"
import { px2Rem } from "@/utils/stylis-plugin/px2rem"
import { globalStyle } from "./style"

const dragOptions = {
  enableTouchEvents: true,
  enableMouseEvents: true,
}

function App() {
  const configLanguage = useSelector(getCurrentConfigLanguage)
  const currentUserLanguage = useSelector(getCurrentTranslateLanguage)
  const { i18n } = useTranslation()
  const isProductMode = useSelector(getIsILLAProductMode)

  useEffect(() => {
    if (!!currentUserLanguage) {
      i18n.changeLanguage(currentUserLanguage)
    }
  }, [currentUserLanguage, i18n])

  let cache = createCache({
    key: "css",
    stylisPlugins: [
      px2Rem({
        unit: "rem",
        remSize: 100,
      }),
    ],
  })

  return (
    <CacheProvider value={cache}>
      <HelmetProvider>
        <DndProvider backend={TouchBackend} options={dragOptions}>
          <GlobalDataProvider>
            <ConfigProvider locale={configLanguage}>
              <TourProvider
                showNavigation={false}
                showBadge={false}
                showCloseButton={false}
                steps={STEP}
              >
                <Global styles={globalStyle} />
                <MessageGroup pt={!isProductMode ? "46px" : "0"} />
                <NotificationGroup pt={!isProductMode ? "46px" : "0"} />
                <ModalGroup />
                <RouterProvider router={ILLARoute} />
                <div
                  className="illaCodeMirrorWrapper"
                  css={illaCodeMirrorTooltipStyle}
                />
              </TourProvider>
            </ConfigProvider>
          </GlobalDataProvider>
        </DndProvider>
      </HelmetProvider>
    </CacheProvider>
  )
}

export default App
