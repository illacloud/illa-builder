import { css, Global } from "@emotion/react"
import { BrowserRouter } from "react-router-dom"
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
import i18n from "./i18n/config"
import { useEffect } from "react"
import { ILLARoute } from "@/router"

function App() {
  const configLanguage = useSelector(getCurrentConfigLanguage)
  const currentUserLanguage = useSelector(getCurrentTranslateLanguage)

  useEffect(() => {
    if (!!currentUserLanguage) {
      i18n.changeLanguage(currentUserLanguage).then()
    }
  }, [currentUserLanguage])

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
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
