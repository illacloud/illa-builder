import { get, set, unset } from "lodash"
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from "react"
import { useSelector } from "react-redux"
import { NotificationType, createNotification } from "@illa-design/react"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { isValidUrlScheme } from "@/utils/typeHelper"

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
export const goToURL = (params: { url: string; newTab?: boolean }) => {
  const { url, newTab } = params
  let finalURL = url
  if (!finalURL) return
  if (!isValidUrlScheme(finalURL)) {
    finalURL = `https://${finalURL}`
  }
  if (newTab) {
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
    const oldValue = get(globalDataRef.current, key, {})
    const newValue = {
      ...oldValue,
      ...value,
    }

    set(globalDataRef.current, key, newValue)
  }, [])

  const handleDeleteGlobalData = useCallback((key: string) => {
    unset(globalDataRef.current, key)
  }, [])

  const value = {
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  }

  BUILDER_CALC_CONTEXT = globalDataRef.current

  useEffect(() => {
    return () => {
      BUILDER_CALC_CONTEXT = {}
    }
  }, [])

  return (
    <GLOBAL_DATA_CONTEXT.Provider value={value}>
      {children}
    </GLOBAL_DATA_CONTEXT.Provider>
  )
}

GlobalDataProvider.displayName = "GlobalDataProvider"
