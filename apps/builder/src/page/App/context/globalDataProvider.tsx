import { createContext, ReactNode, FC, useState, useCallback } from "react"
import { NotificationType, Notification } from "@illa-design/react"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { useSelector } from "react-redux"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { cloneDeep, unset } from "lodash"

interface Injected {
  globalData: { [key: string]: any }
  handleUpdateGlobalData: (key: string, value: any) => void
  handleDeleteGlobalData: (key: string) => void
}

export const GLOBAL_DATA_CONTEXT = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export let BUILDER_CALC_CONTEXT = {}

// {{showNotification("info","222","333")}}
export const showNotification = (params: {
  type: NotificationType
  title: string
  description: string
  duration: number
}) => {
  const { type, title, description, duration = 4500 } = params
  if (!type) return
  Notification[type]({
    title,
    content: description,
    duration,
  })
}

const runScript = (script: string) => {
  try {
    // TODO: @WeiChen wait use parser
    const result = eval(script)
  } catch (ignore) {}
}

// {{goToURL("https://www.baidu.com",true)}}
export const goToURL = (params: { url: string; isNewTab?: boolean }) => {
  const { url, isNewTab } = params
  let finalURL = url
  if (!finalURL) return
  if (!isValidUrlScheme(finalURL)) {
    finalURL = `https://${finalURL}`
  }
  if (isNewTab) {
    window.open(finalURL, "_blank")
  } else {
    window.location.assign(finalURL)
  }
}

const initState = {
  showNotification,
  runScript,
  goToURL,
}

export const GlobalDataProvider: FC<Props> = ({ children }) => {
  const userInfo = useSelector(getCurrentUser)
  const builderInfo = useSelector(getBuilderInfo)
  const [globalData, setGlobalData] = useState<Record<string, any>>({
    ...initState,
    currentUser: userInfo,
    builderInfo,
  })

  const handleUpdateGlobalData = useCallback((key: string, value: any) => {
    setGlobalData((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }, [])

  const handleDeleteGlobalData = useCallback((key: string) => {
    setGlobalData((prevState) => {
      const newGlobalData = cloneDeep(prevState)
      unset(newGlobalData, key)
      return newGlobalData
    })
  }, [])

  const value = {
    globalData: { ...globalData },
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  }

  BUILDER_CALC_CONTEXT = globalData

  return (
    <GLOBAL_DATA_CONTEXT.Provider value={value}>
      {children}
    </GLOBAL_DATA_CONTEXT.Provider>
  )
}

GlobalDataProvider.displayName = "GlobalDataProvider"
