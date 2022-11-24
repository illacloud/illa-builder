import { css, Global } from "@emotion/react"
import { RouterProvider } from "react-router-dom"
import { globalStyle } from "./style"
import { ConfigProvider } from "@illa-design/config-provider"
import "@/api/base"
import { HTML5Backend } from "react-dnd-html5-backend"
import { GlobalDataProvider } from "@/page/App/context/globalDataProvider"
import { DndProvider } from "react-dnd"
import { useSelector } from "react-redux"
import {
  getCurrentConfigLanguage,
  getCurrentTranslateLanguage,
} from "@/redux/currentUser/currentUserSelector"
import { useEffect } from "react"
import { ILLARoute } from "@/router"
import { useTranslation } from "react-i18next"
import { MessageGroup } from "@illa-design/message"
import { NotificationGroup } from "@illa-design/notification"

function App() {
  const configLanguage = useSelector(getCurrentConfigLanguage)
  const currentUserLanguage = useSelector(getCurrentTranslateLanguage)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!!currentUserLanguage) {
      i18n.changeLanguage(currentUserLanguage)
    }
  }, [currentUserLanguage, i18n])

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalDataProvider>
        <ConfigProvider locale={configLanguage}>
          <Global styles={css(globalStyle)} />
          <MessageGroup />
          <NotificationGroup />
          <RouterProvider router={ILLARoute} />
        </ConfigProvider>
      </GlobalDataProvider>
    </DndProvider>
  )
}

export default App
