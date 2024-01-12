import { isBoolean } from "lodash-es"
import {
  FC,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import ReactPlayer from "react-player"
import { Loading, isNumber, isString } from "@illa-design/react"
import { MediaSourceLoadContext } from "@/utils/mediaSourceLoad"
import {
  audioWrapperStyle,
  fullStyle,
  loadingStyle,
} from "@/widgetLibrary/AudioWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { AudioWidgetProps, WrappedAudioProps } from "./interface"

export const WrappedAudio = forwardRef<ReactPlayer, WrappedAudioProps>(
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
    const [loading, setLoading] = useState(true)
    const [_error, setError] = useState(false)
    const { sourceLoadErrorHandler } = useContext(MediaSourceLoadContext)

    return (
      <>
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
          ref={ref}
          width="100%"
          height="100%"
          // show unavailable link state for audio empty state
          url={url || " "}
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
            sourceLoadErrorHandler?.(url, "AUDIO_WIDGET")
            setLoading(false)
            setError(true)
          }}
          onPlaybackRateChange={onPlaybackRateChange}
        />
      </>
    )
  },
)

WrappedAudio.displayName = "WrappedAudio"

export const AudioWidget: FC<AudioWidgetProps> = (props) => {
  const {
    handleUpdateDsl,
    handleUpdateMultiExecutionResult,
    displayName,
    tooltipText,
    triggerEventHandler,
    deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
  } = props

  const audioRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    updateComponentRuntimeProps({
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
        if (!isString(url)) {
          console.error("TypeError: url is not a string")
          return
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { url },
          },
        ])
      },
      seekTo: (time: number, type: "seconds" | "fraction" = "seconds") => {
        if (!isNumber(time)) {
          console.error("TypeError: value is not a number")
          return
        }
        audioRef.current?.seekTo(time, type)
      },
      mute: (value: boolean) => {
        if (!isBoolean(value)) {
          console.error("TypeError: value is not a boolean")
          return
        }
        const audio = audioRef.current?.getInternalPlayer() as HTMLAudioElement
        if (audio) {
          // As the player doesn't update internally, it's necessary to modify the DOM directly.
          audio.muted = value
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { muted: value },
          },
        ])
      },
      setLoop: (value: boolean) => {
        if (!isBoolean(value)) {
          console.error("TypeError: value is not a boolean")
          return
        }
        const audio = audioRef.current?.getInternalPlayer() as HTMLAudioElement
        if (audio) {
          // As the player doesn't update internally, it's necessary to modify the DOM directly.
          audio.loop = value
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { loop: value },
          },
        ])
      },
      setSpeed: (value: number) => {
        if (!isNumber(value)) {
          console.error("TypeError: value is not a number")
          return
        }
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
        if (!isNumber(value)) {
          console.error("TypeError: value is not a number")
          return
        }
        // volume range [0, 1]
        const clampedValue = Math.max(0, Math.min(1, value))
        const audio = audioRef.current?.getInternalPlayer() as HTMLAudioElement
        if (audio) {
          // As the player doesn't update internally, it's necessary to modify the DOM directly.
          audio.volume = clampedValue
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { volume: clampedValue },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    displayName,
    handleUpdateMultiExecutionResult,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
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
        <WrappedAudio
          {...props}
          ref={audioRef}
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

AudioWidget.displayName = "AudioWidget"

export default AudioWidget
