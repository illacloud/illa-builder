import { createContext, ReactNode, FC, useState, useEffect } from "react"
import { NotificationType, Notification } from "@illa-design/notification"

interface Injected {
  globalData: { [key: string]: any }
  handleUpdateGlobalData: (key: string, value: any) => void
}

export const GLOBAL_DATA_CONTEXT = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

// {{builder.user}}
// TODO: @WeiChen wait to real global data
const dataTree = {
  builder: {
    user: "weichen",
    email: "weichen@test.com",
  },
  query1: {
    run: () => {
      return [1, 2, 3, 4, 5]
    },
    run2: (a: string) => {
      return a
    },
  },
}

// {{showNotification("info","222","333")}}
const showNotification = (
  type: NotificationType,
  title: string,
  description: string,
  duration: number = 4500,
) => {
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
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

// {{goToURL("https://www.baidu.com",true)}}
const goToURL = (url: string, isNewTab?: boolean) => {
  if (isNewTab) {
    window.open(url)
  } else {
    window.location.href = url
  }
}

const initState = {
  ...dataTree,
  showNotification,
  runScript,
  goToURL,
}

export const GlobalDataProvider: FC<Props> = ({ children }) => {
  const [globalData, setGlobalData] = useState<Record<string, any>>(initState)

  const handleUpdateGlobalData = (key: string, value: any) => {
    setGlobalData({
      ...globalData,
      [key]: value,
    })
  }

  const value = {
    globalData: { ...globalData },
    handleUpdateGlobalData,
  }

  return (
    <GLOBAL_DATA_CONTEXT.Provider value={value}>
      {children}
    </GLOBAL_DATA_CONTEXT.Provider>
  )
}

GlobalDataProvider.displayName = "GlobalDataProvider"
