import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading, Trigger } from "@illa-design/react"
import { MessageSpecProps } from "@/widgetLibrary/ChatWidget/interface"
import {
  audioStyle,
  audioWrapperStyle,
  loadingStyle,
} from "@/widgetLibrary/ChatWidget/style"
import { Options } from "../options"

export const AudioMessage: FC<Partial<MessageSpecProps>> = (props) => {
  const { content, isReply, toolbarDelete, toolbarReply, isOwnMessage } = props
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [_error, setError] = useState(false)

  if (content === "") {
    return <div css={loadingStyle}>{t("widget.audio.no_audio")}</div>
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
    </Trigger>
  )
}
