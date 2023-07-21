import { FC, IframeHTMLAttributes, useState } from "react"
import { Loading } from "@illa-design/react"
import { loadingStyle } from "./style"

export const Iframe: FC<IframeHTMLAttributes<HTMLIFrameElement>> = (props) => {
  const [isLoading, setIsLoading] = useState(true)

  const onLoad = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      <iframe
        onLoad={onLoad}
        style={{ display: isLoading ? "none" : "block" }}
        {...props}
      />
    </>
  )
}

Iframe.displayName = "Iframe"
