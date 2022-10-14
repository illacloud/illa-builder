import { css, Global } from "@emotion/react"
import { BrowserRouter } from "react-router-dom"
import { globalStyle } from "./style"
import { ConfigProvider } from "@illa-design/config-provider"
import "@/api/base"
import { TouchBackend } from "react-dnd-touch-backend"
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

const DND_OPTIONS = {
  enableMouseEvents: true,
}

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
    <BrowserRouter>
      <DndProvider backend={TouchBackend} options={DND_OPTIONS}>
        <GlobalDataProvider>
          <ConfigProvider locale={configLanguage}>
            <Global styles={css(globalStyle)} />
            <ILLARoute />
          </ConfigProvider>
        </GlobalDataProvider>
      </DndProvider>
    </BrowserRouter>
  )
}

export default App
