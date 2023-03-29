import dayjs from "dayjs"
import duration from "dayjs/plugin/Duration"
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import ReactPlayer from "react-player"
import { Loading, VideoPlayIcon } from "@illa-design/react"
import {
  audioStyle,
  fullStyle,
  loadingStyle,
} from "@/widgetLibrary/AudioWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { VideoWidgetProps, WrappedVideoProps } from "./interface"

dayjs.extend(duration)

export const WrappedAudio = forwardRef<ReactPlayer, WrappedVideoProps>(
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
    const [error, setError] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    if (url === "") {
      return <div css={loadingStyle}>{t("widget.video.empty")}</div>
    }

    const durationStr = useMemo(() => {
      if (!duration) return "00:00"
      return dayjs.duration(duration, "seconds").format("mm:ss")
    }, [duration])
    const currentTimeStr = useMemo(() => {
      if (!currentTime) return "00:00"
      return dayjs.duration(duration, "seconds").format("mm:ss")
    }, [currentTime])

    const handleDuration = (duration: number) => {
      const durationStr = dayjs.duration(duration, "seconds").format("mm:ss")
    }

    return (
      <>
        {/*{loading ? (*/}
        {/*  <div css={loadingStyle}>*/}
        {/*    <Loading colorScheme="white" />*/}
        {/*  </div>*/}
        {/*) : //   : error ? (*/}
        {/*//   <div css={loadingStyle}>{t("widget.video.fail")}</div>*/}
        {/*// )*/}
        {/*null}*/}
        <div css={audioStyle}>
          <VideoPlayIcon />
          <span></span>
          <span>
            {currentTimeStr}/{durationStr}
          </span>
        </div>
        <ReactPlayer
          // style={loading || error ? { display: "none" } : undefined}
          // fallback={
          //   <div css={loadingStyle}>
          //     <Loading colorScheme="white" />
          //   </div>
          // }
          config={{
            file: {
              forceAudio: true,
            },
          }}
          ref={ref}
          width="100%"
          height="54px"
          url={url}
          volume={volume}
          muted={muted}
          controls={controls}
          playbackRate={playbackRate}
          loop={loop}
          playing={autoPlay || playing}
          draggable={false}
          onReady={(player) => {
            const duration = player.getDuration()
            // transform seconds to time string, use Day.js
            const durationStr = dayjs
              .duration(duration, "seconds")
              .format("mm:ss")

            console.log(
              durationStr,
              player,
              player.getSecondsLoaded(),
              player.getCurrentTime(),
              player.getInternalPlayer(),
              "player",
            )
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
          onDuration={setDuration}
          onSeek={(seek) => {
            console.log("seek", seek)
          }}
          onProgress={(progress) => {
            console.log("progress", progress)
            const { playedSeconds } = progress
            setCurrentTime(playedSeconds)
          }}
        />
      </>
    )
  },
)

WrappedAudio.displayName = "WrappedAudio"

export const AudioWidget: FC<VideoWidgetProps> = (props) => {
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
      setAudioUrl: (url: string) => {
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
  }, [
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullStyle}>
        <WrappedAudio
          {...props}
          // controls change need to reload react-player
          key={Number(controls)}
          ref={videoRef}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        />
      </div>
    </TooltipWrapper>
  )
}

AudioWidget.displayName = "AudioWidget"
