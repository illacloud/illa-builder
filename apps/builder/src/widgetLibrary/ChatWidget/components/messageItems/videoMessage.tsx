import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading, Trigger } from "@illa-design/react"
import { MessageSpecProps } from "@/widgetLibrary/ChatWidget/interface"
import { loadingStyle, videoStyle } from "@/widgetLibrary/ChatWidget/style"
import { Options } from "../options"

export const VideoMessage: FC<Partial<MessageSpecProps>> = (props) => {
  const { content, isReply, toolbarDelete, toolbarReply, isOwnMessage } = props
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (content === "") {
    return <div css={loadingStyle}>{t("widget.video.empty")}</div>
  }

  return (
    <Trigger
      bdRadius="4px"
      bg="white"
      content={<Options {...props} />}
      colorScheme="transparent"
      disabled={!toolbarDelete && !toolbarReply}
      position={isOwnMessage ? "left-start" : "right-start"}
      showArrow={false}
      autoFitPosition={false}
      withoutPadding
      trigger="hover"
      withoutShadow
    >
      <div css={videoStyle(isReply)}>
        {loading ? (
          <div css={loadingStyle}>
            <Loading colorScheme="white" />
          </div>
        ) : error ? (
          <div css={loadingStyle}>{t("widget.video.fail")}</div>
        ) : null}
        <ReactPlayer
          style={loading || error ? { display: "none" } : undefined}
          fallback={
            <div css={loadingStyle}>
              <Loading colorScheme="white" />
            </div>
          }
          width="100%"
          height="100%"
          url={content}
          draggable={false}
          onReady={() => {
            setLoading(false)
            setError(false)
          }}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
        />
      </div>
    </Trigger>
  )
}
