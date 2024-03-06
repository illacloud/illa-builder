import {
  MouseEvent,
  TouchEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import useMeasure from "react-use-measure"
import { RefreshIcon, getSpecialThemeColor } from "@illa-design/react"
import { DPR } from "./constants"
import { ICustomRef, WrappedSignatureProps } from "./interface"
import {
  canvasContainerStyle,
  canvasStyle,
  lineStyle,
  resetIconStyle,
  signTextStyle,
} from "./style"

interface SignatureCanvasProps
  extends Pick<
    WrappedSignatureProps,
    | "disabled"
    | "guideColor"
    | "penColor"
    | "text"
    | "value"
    | "handleUpdateSignature"
  > {}

const SignatureCanvas = forwardRef<ICustomRef, SignatureCanvasProps>(
  (
    {
      value,
      guideColor = "grayBlue",
      penColor = "grayBlue",
      text,
      disabled,
      handleUpdateSignature,
    },
    ref,
  ) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [boundsRef, bound] = useMeasure()
    const ctx = useRef<CanvasRenderingContext2D | null>()
    const startX = useRef(0)
    const startY = useRef(0)

    useImperativeHandle(ref, () => ({
      clear: () => handleReset(),
    }))

    const handleStartDraw = (
      e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
    ) => {
      e.stopPropagation()
      setIsDrawing(true)
      if (!ctx.current) {
        ctx.current = canvasRef.current?.getContext("2d")
      }
      if (!canvasRef.current || !ctx.current) return
      if ("offsetX" in e.nativeEvent && "offsetY" in e.nativeEvent) {
        startX.current = e.nativeEvent.offsetX
        startY.current = e.nativeEvent.offsetY
      } else {
        const touch = (e as TouchEvent).touches[0]
        const touchTarget = touch.target as HTMLCanvasElement
        startX.current =
          touch.clientX - touchTarget.getBoundingClientRect().left
        startY.current = touch.clientY - touchTarget.getBoundingClientRect().top
      }
      ctx.current.lineWidth = 2 * DPR
      ctx.current.lineCap = "round"
      ctx.current.strokeStyle = getSpecialThemeColor(penColor)
      ctx.current.beginPath()
    }

    const handleDraw = (
      e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
    ) => {
      e.stopPropagation()
      const currentCtx = ctx.current
      if (!isDrawing || !currentCtx) return
      let offsetX, offsetY
      if ("offsetX" in e.nativeEvent && "offsetY" in e.nativeEvent) {
        offsetX = e.nativeEvent.offsetX
        offsetY = e.nativeEvent.offsetY
      } else {
        const touch = (e as TouchEvent).touches[0]
        const touchTarget = touch.target as HTMLCanvasElement
        offsetX = touch.clientX - touchTarget.getBoundingClientRect().left
        offsetY = touch.clientY - touchTarget.getBoundingClientRect().top
      }
      currentCtx.moveTo(startX.current * DPR, startY.current * DPR)
      currentCtx.lineTo(offsetX * DPR, offsetY * DPR)
      startX.current = offsetX
      startY.current = offsetY
      currentCtx.stroke()
    }

    const handleEndDraw = (
      e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
    ) => {
      e.stopPropagation()
      if (!isDrawing) return
      setIsDrawing(false)
      ctx.current?.closePath()
      const data = canvasRef.current?.toDataURL("image/png")
      const rep = /^data:image\/png[^,]+base64,/
      handleUpdateSignature(data, data?.replace(rep, ""))
    }

    const handleReset = () => {
      if (!ctx.current) return
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0,
      )
      handleUpdateSignature()
    }

    useEffect(() => {
      const el = canvasRef.current
      const preventDefault = (e: Event) => {
        e.preventDefault()
      }
      el?.addEventListener("touchstart", preventDefault, { passive: false })
      return () => {
        el?.removeEventListener("touchstart", preventDefault)
      }
    }, [])

    return (
      <div css={canvasContainerStyle(disabled)} ref={boundsRef}>
        {!value && !isDrawing && (
          <span css={signTextStyle(guideColor)}>{text}</span>
        )}
        <RefreshIcon
          css={resetIconStyle(guideColor)}
          onClick={handleReset}
          size="16px"
        />
        <canvas
          ref={canvasRef}
          css={canvasStyle}
          width={DPR * bound.width}
          height={DPR * bound.height}
          onMouseDownCapture={handleStartDraw}
          onMouseMoveCapture={handleDraw}
          onMouseUp={handleEndDraw}
          onMouseOut={handleEndDraw}
          onTouchStart={handleStartDraw}
          onTouchMove={handleDraw}
          onTouchEnd={handleEndDraw}
        />
        <div css={lineStyle(guideColor)} />
      </div>
    )
  },
)

SignatureCanvas.displayName = "SignatureCanvas"

export default SignatureCanvas
