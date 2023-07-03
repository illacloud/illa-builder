import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading } from "@illa-design/react"
import { MessageSpecProps } from "../interface"
import { loadingStyle, videoStyle } from "../style"

export const VideoMessage: FC<MessageSpecProps> = (props) => {
  const { content, isReply } = props
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (content === "") {
    return <div css={loadingStyle}>{t("widget.video.empty")}</div>
  }

  return (
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
  )
}
