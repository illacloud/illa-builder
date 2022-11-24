import {
  createContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react"
import {
  NotificationType,
  Notification,
  createNotification,
} from "@illa-design/notification"
import { isValidUrlScheme } from "@/utils/typeHelper"
import { useSelector } from "react-redux"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { cloneDeep, unset } from "lodash"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

interface Injected {
  handleUpdateGlobalData: (key: string, value: any) => void
  handleDeleteGlobalData: (key: string) => void
}

export const GLOBAL_DATA_CONTEXT = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

export let BUILDER_CALC_CONTEXT = {}

export const showNotification = (params: {
  type: NotificationType
  title: string
  description: string
  duration: number
}) => {
  const { type, title, description, duration = 4500 } = params
  const notification = createNotification()
  notification.show({
    title,
    content: description,
    duration,
    type,
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

  const globalDataRef = useRef<Record<string, any>>({
    ...initState,
    currentUser: userInfo,
    builderInfo,
  })

  const handleUpdateGlobalData = useCallback((key: string, value: any) => {
    BUILDER_CALC_CONTEXT = {
      ...BUILDER_CALC_CONTEXT,
      [key]: value,
    }
  }, [])

  const handleDeleteGlobalData = useCallback((key: string) => {
    unset(BUILDER_CALC_CONTEXT, key)
  }, [])

  const value = {
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  }

  BUILDER_CALC_CONTEXT = globalDataRef.current

  return (
    <GLOBAL_DATA_CONTEXT.Provider value={value}>
      {children}
    </GLOBAL_DATA_CONTEXT.Provider>
  )
}

GlobalDataProvider.displayName = "GlobalDataProvider"
