import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
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
    const [loading, setLoading] = useState(true)

    return (
      <>
        {loading ? (
          <div css={loadingStyle}>
            <Loading />
          </div>
        ) : null}
        <ReactPlayer
          style={{ display: loading ? "none" : "unset" }}
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
    muted,
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
      mute: (value: boolean) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { muted: value },
          },
        ])
      },
      loop: (value: boolean) => {
        // [TODO]
        console.log("loop", value)
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { loop: value },
          },
        ])
      },
      setSpeed: (value: number) => {
        // [TODO]
        console.log("playbackRate", value)
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { playbackRate: value },
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

  // useEffect(()=>{
  //   if (videoRef.current) {
  //     videoRef.current.setState({mute: true})
  //   }
  // }, [muted])

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
