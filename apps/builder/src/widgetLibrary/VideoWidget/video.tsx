import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading } from "@illa-design/react"
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
    } = props
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)

    if (url === "") {
      return <div css={loadingStyle}>{t("widget.video.empty")}</div>
    }

    return (
      <>
        {loading ? (
          <div css={loadingStyle}>
            <Loading colorScheme="white" />
          </div>
        ) : null}
        <ReactPlayer
          style={loading ? { display: "none" } : undefined}
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
            onReady()
          }}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onError={() => {
            setLoading(false)
          }}
          onProgress={(progress) => {
            console.log(" video onProgress", progress)
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
      setLoop: (value: boolean) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { loop: value },
          },
        ])
      },
      setSpeed: (value: number) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { playbackRate: value },
          },
        ])
      },
      setVolume: (value: number) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { volume: value },
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

  const [currentUrl, setCurrentUrl] = useState(url)

  useEffect(() => {
    // controls change need to reload react-player
    // player reload when url change
    setCurrentUrl(undefined)
    setTimeout(() => {
      setCurrentUrl(url)
    }, 10)
  }, [controls])

  useEffect(() => {
    setCurrentUrl(url)
  }, [url])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullStyle}>
        <WrappedVideo
          {...props}
          ref={videoRef}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          url={currentUrl}
        />
      </div>
    </TooltipWrapper>
  )
}

VideoWidget.displayName = "VideoWidget"
