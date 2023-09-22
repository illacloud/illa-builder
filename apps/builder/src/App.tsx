import { Global } from "@emotion/react"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { UpgradeModalGroup } from "@illa-public/upgrade-modal"
import { getCurrentTranslateLanguage } from "@illa-public/user-data"
import { useEffect, useMemo } from "react"
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
  enUS,
  jaJP,
  koKR,
  zhCN,
} from "@illa-design/react"
import { illaCodeMirrorTooltipStyle } from "@/components/CodeEditor/CodeMirror/theme"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { ILLARoute } from "@/router"
import { globalStyle } from "./style"
import { track } from "./utils/mixpanelHelper"

const dragOptions = {
  enableTouchEvents: true,
  enableMouseEvents: true,
}

function App() {
  const currentUserLanguage = useSelector(getCurrentTranslateLanguage)
  const configLanguage = useMemo(() => {
    switch (currentUserLanguage) {
      case "en-US":
        return enUS
      case "zh-CN":
        return zhCN
      case "ja-JP":
        return jaJP
      case "ko-KR":
        return koKR
      default:
        return enUS
    }
  }, [currentUserLanguage])
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

  return (
    <HelmetProvider>
      <DndProvider backend={TouchBackend} options={dragOptions}>
        <ConfigProvider locale={configLanguage}>
          <Global styles={globalStyle} />
          <MessageGroup pt={!isProductMode ? "46px" : "0"} />
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
  )
}

export default App
