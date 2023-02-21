import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { Loading } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyHiddenStyle, fullStyle } from "@/widgetLibrary/VideoWidget/style"
import { VideoWidgetProps, WrappedVideoProps } from "./interface"

export const WrappedVideo = forwardRef<ReactPlayer, WrappedVideoProps>(
  (props, ref) => {
    const {
      url,
      playing,
      autoPlay,
      controls = true,
      loop,
      onPlay,
      onReady,
      onPause,
      onEnded,
    } = props
    const [loading, setLoading] = useState(true)

    return (
      <>
        {loading ? (
          <div css={fullStyle}>
            <Loading />
          </div>
        ) : null}
        <ReactPlayer
          style={{ visibility: loading ? "hidden" : "visible" }}
          ref={ref}
          width="100%"
          height="100%"
          url={url}
          controls={controls}
          loop={loop}
          playing={autoPlay || playing}
          draggable={false}
          onReady={() => {
            setLoading(false)
            onReady()
          }}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onError={() => {
            setLoading(false)
          }}
        />
      </>
    )
  },
)

WrappedVideo.displayName = "WrappedVideo"

export const VideoWidget: FC<VideoWidgetProps> = (props) => {
  const {
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateMultiExecutionResult,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    tooltipText,
    triggerEventHandler,
  } = props

  const videoRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      setVideoUrl: (url: string) => {
        handleUpdateOriginalDSLMultiAttr({ url })
      },
      seekTo: (time: number, type: "seconds" | "fraction" = "seconds") => {
        videoRef.current?.seekTo(time, type)
      },
      play: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { playing: true },
          },
        ])
      },
      pause: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { playing: false },
          },
        ])
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [handleUpdateGlobalData, displayName, handleDeleteGlobalData])

  const onPlay = useCallback(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: { playing: true },
      },
    ])
    triggerEventHandler("play")
  }, [triggerEventHandler, handleUpdateMultiExecutionResult])

  const onPause = useCallback(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: { playing: false },
      },
    ])
    triggerEventHandler("pause")
  }, [triggerEventHandler, handleUpdateMultiExecutionResult])

  const onReady = useCallback(() => {
    triggerEventHandler("ready")
  }, [triggerEventHandler])

  const onEnded = useCallback(() => {
    triggerEventHandler("ended")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullStyle}>
        <WrappedVideo
          ref={videoRef}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          {...props}
        />
      </div>
    </TooltipWrapper>
  )
}

VideoWidget.displayName = "VideoWidget"
