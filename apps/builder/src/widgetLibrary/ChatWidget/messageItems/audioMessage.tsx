import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading } from "@illa-design/react"
import { MessageSpecProps } from "../interface"
import { audioStyle, audioWrapperStyle, loadingStyle } from "../style"

export const AudioMessage: FC<MessageSpecProps> = (props) => {
  const { content, isReply } = props
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [_error, setError] = useState(false)

  if (content === "") {
    return <div css={loadingStyle}>{t("widget.audio.no_audio")}</div>
  }

  return (
    <div css={audioStyle(isReply)}>
      {loading ? (
        <div css={loadingStyle}>
          <Loading colorScheme="black" />
        </div>
      ) : null}
      <ReactPlayer
        css={audioWrapperStyle}
        style={loading ? { display: "none" } : undefined}
        config={{
          file: {
            forceAudio: true,
          },
        }}
        width="100%"
        height="100%"
        url={content}
        controls={true}
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
