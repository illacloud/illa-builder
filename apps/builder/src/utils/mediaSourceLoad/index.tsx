import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
  publicDriveRequest,
} from "@illa-public/illa-net"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import { FC, createContext, useCallback, useRef } from "react"
import { useSelector } from "react-redux"
import { getIllaMode } from "@/redux/config/configSelector"
import { Inject, MediaSourceLoadProviderProps } from "./interface"

export const MediaSourceLoadContext = createContext<Inject>({} as Inject)

export const MediaSourceLoadProvider: FC<MediaSourceLoadProviderProps> = ({
  children,
}) => {
  const mode = useSelector(getIllaMode)
  const isShowedCollaError = useRef<boolean>(false)

  const sourceLoadErrorHandler = useCallback(
    async (sourceURL: string | undefined) => {
      if (isShowedCollaError.current || !sourceURL) return
      let prefix = HTTP_REQUEST_PUBLIC_BASE_URL + PUBLIC_DRIVE_REQUEST_PREFIX
      if (mode === "production" || !sourceURL.includes(prefix)) return
      try {
        await publicDriveRequest({
          url: sourceURL.replace(prefix, ""),
          method: "GET",
        })
      } catch (e) {
        let res: boolean = false
        if (!isShowedCollaError.current) {
          res = handleCollaPurchaseError(e, CollarModalType.TRAFFIC)
        }
        if (res) {
          isShowedCollaError.current = true
        }
      }
    },
    [mode],
  )
  return (
    <MediaSourceLoadContext.Provider value={{ sourceLoadErrorHandler }}>
      {children}
    </MediaSourceLoadContext.Provider>
  )
}

MediaSourceLoadContext.displayName = "MediaSourceLoadContext"
