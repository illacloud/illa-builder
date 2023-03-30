import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading, isNumber } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { fullStyle, loadingStyle } from "@/widgetLibrary/VideoWidget/style"
import { VideoWidgetProps, WrappedVideoProps } from "./interface"

export const WrappedVideo = forwardRef<ReactPlayer, WrappedVideoProps>(
  (props, ref) => {
    const {
      url,
      playing,
      autoPlay,
      controls = true,
      loop,
      volume,
      muted,
      playbackRate,
      onPlay,
      onReady,
      onPause,
      onEnded,
      onPlaybackRateChange,
    } = props
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    if (url === "") {
      return <div css={loadingStyle}>{t("widget.video.empty")}</div>
    }

    return (
      <>
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
          ref={ref}
          width="100%"
          height="100%"
          url={url}
          volume={volume}
          muted={muted}
          controls={controls}
          playbackRate={playbackRate}
          loop={loop}
          playing={autoPlay || playing}
          draggable={false}
          onReady={() => {
            setLoading(false)
            setError(false)
            onReady()
          }}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
          onPlaybackRateChange={onPlaybackRateChange}
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
    controls,
    url,
  } = props

  const videoRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
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
      setVideoUrl: (url: string) => {
        handleUpdateOriginalDSLMultiAttr({ url })
      },
      seekTo: (time: number, type: "seconds" | "fraction" = "seconds") => {
        videoRef.current?.seekTo(time, type)
      },
      mute: (value: boolean) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { muted: value },
          },
        ])
      },
      showControls: (value: boolean) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { controls: value },
          },
        ])
      },
      setLoop: (value: boolean) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { loop: value },
          },
        ])
      },
      setSpeed: (value: number) => {
        // playbackRate range [0.0625, 16]
        const clampedValue = Math.max(0.0625, Math.min(16, value))
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { playbackRate: clampedValue },
          },
        ])
      },
      setVolume: (value: number) => {
        // volume range [0, 1]
        const clampedValue = Math.max(0, Math.min(1, value))
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { volume: clampedValue },
          },
        ])
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateMultiExecutionResult,
  ])

  const onPlay = useCallback(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: { playing: true },
      },
    ])
    triggerEventHandler("play")
  }, [displayName, triggerEventHandler, handleUpdateMultiExecutionResult])

  const onPause = useCallback(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: { playing: false },
      },
    ])
    triggerEventHandler("pause")
  }, [displayName, triggerEventHandler, handleUpdateMultiExecutionResult])

  const onReady = useCallback(() => {
    triggerEventHandler("loaded")
  }, [triggerEventHandler])

  const onEnded = useCallback(() => {
    triggerEventHandler("ended")
  }, [triggerEventHandler])

  const onPlaybackRateChange = useCallback(
    (playbackRate: number) => {
      if (isNumber(playbackRate)) {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { playbackRate },
          },
        ])
      }
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullStyle}>
        <WrappedVideo
          {...props}
          // controls change need to reload react-player
          key={Number(controls)}
          ref={videoRef}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onPlaybackRateChange={onPlaybackRateChange}
        />
      </div>
    </TooltipWrapper>
  )
}

VideoWidget.displayName = "VideoWidget"
