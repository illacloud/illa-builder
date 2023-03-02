import createCache from "@emotion/cache"
import { CacheProvider, Global } from "@emotion/react"
import { useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
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
import { GlobalDataProvider } from "@/page/App/context/globalDataProvider"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import {
  getCurrentConfigLanguage,
  getCurrentTranslateLanguage,
} from "@/redux/currentUser/currentUserSelector"
import { ILLARoute } from "@/router"
import { px2Rem } from "@/utils/stylis-plugin/px2rem"
import { globalStyle } from "./style"

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
      <DndProvider backend={HTML5Backend}>
        <GlobalDataProvider>
          <ConfigProvider locale={configLanguage}>
            <Global styles={globalStyle} />
            <MessageGroup pt={!isProductMode ? "46px" : "0"} />
            <NotificationGroup pt={!isProductMode ? "46px" : "0"} />
            <ModalGroup />
            <RouterProvider router={ILLARoute} />
            <div
              className="illaCodeMirrorWrapper"
              css={illaCodeMirrorTooltipStyle}
            />
          </ConfigProvider>
        </GlobalDataProvider>
      </DndProvider>
    </CacheProvider>
  )
}

export default App
