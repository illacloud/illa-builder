import createCache from "@emotion/cache"
import { CacheProvider, Global } from "@emotion/react"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import {
  getCurrentConfigLanguage,
  getCurrentTranslateLanguage,
} from "@illa-public/user-data"
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
import { illaCodeMirrorTooltipStyle } from "@/components/CodeEditor/CodeMirror/theme"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { ILLARoute } from "@/router"
import { px2Rem } from "@/utils/stylis-plugin/px2rem"
import { globalStyle } from "./style"
import { track } from "./utils/mixpanelHelper"
import { UpgradeDrawerGroup, UpgradeModalGroup } from '@illa-public/upgrade-modal'

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

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.ILLA_ACTIVE,
      ILLA_MIXPANEL_PUBLIC_PAGE_NAME.PLACEHOLDER,
    )
  }, [])

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
          <ConfigProvider locale={configLanguage}>
            <Global styles={globalStyle} />
            <MessageGroup pt={!isProductMode ? "46px" : "0"} />
            <UpgradeDrawerGroup />
            <UpgradeModalGroup />
            <NotificationGroup pt={!isProductMode ? "46px" : "0"} />
            <ModalGroup />
            <RouterProvider router={ILLARoute} />
            <div
              className="illaCodeMirrorWrapper"
              css={illaCodeMirrorTooltipStyle}
            />
          </ConfigProvider>
        </DndProvider>
      </HelmetProvider>
    </CacheProvider>
  )
}

export default App
