import { FC, memo } from "react"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { useResizeStart } from "./hooks"
import { PartResizeHandlerProps, ResizeHandlerProps } from "./interface"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applySquarePointerStyle,
} from "./style"

const TopLeftResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("tl", displayName)
    return <div css={applySquarePointerStyle("tl")} ref={dragRef} />
  },
)
TopLeftResizeHandler.displayName = "TopLeftResizeHandler"

const TopRightResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("tr", displayName)

    return <div css={applySquarePointerStyle("tr")} ref={dragRef} />
  },
)
TopRightResizeHandler.displayName = "TopRightResizeHandler"

const BottomLeftResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("bl", displayName)

    return <div css={applySquarePointerStyle("bl")} ref={dragRef} />
  },
)
BottomLeftResizeHandler.displayName = "BottomLeftResizeHandler"

const BottomRightResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("br", displayName)

    return <div css={applySquarePointerStyle("br")} ref={dragRef} />
  },
)
BottomRightResizeHandler.displayName = "BottomRightResizeHandler"

const TopResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("t", displayName)

    return (
      <div css={applyBarHandlerStyle("t")} ref={dragRef}>
        <div className="handler" css={applyBarPointerStyle("t")} />
      </div>
    )
  },
)
TopResizeHandler.displayName = "TopResizeHandler"

const BottomResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("b", displayName)

    return (
      <div css={applyBarHandlerStyle("b")} ref={dragRef}>
        <div className="handler" css={applyBarPointerStyle("b")} />
      </div>
    )
  },
)
BottomResizeHandler.displayName = "BottomResizeHandler"

const LeftResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("l", displayName)

    return (
      <div css={applyBarHandlerStyle("l")} ref={dragRef}>
        <div className="handler" css={applyBarPointerStyle("l")} />
      </div>
    )
  },
)
LeftResizeHandler.displayName = "LeftResizeHandler"

const RightResizeHandler = memo<PartResizeHandlerProps>(
  (props: PartResizeHandlerProps) => {
    const { displayName } = props
    const [, dragRef] = useResizeStart("r", displayName)

    return (
      <div css={applyBarHandlerStyle("r")} ref={dragRef}>
        <div className="handler" css={applyBarPointerStyle("r")} />
      </div>
    )
  },
)
RightResizeHandler.displayName = "RightResizeHandler"

const ResizeHandler: FC<ResizeHandlerProps> = (props) => {
  const { resizeDirection, displayName } = props

  return (
    <div className="resize-handler-container">
      {resizeDirection === RESIZE_DIRECTION.ALL && (
        <TopLeftResizeHandler displayName={displayName} />
      )}
      {resizeDirection !== RESIZE_DIRECTION.HORIZONTAL && (
        <TopResizeHandler displayName={displayName} />
      )}
      {resizeDirection === RESIZE_DIRECTION.ALL && (
        <TopRightResizeHandler displayName={displayName} />
      )}
      {resizeDirection !== RESIZE_DIRECTION.VERTICAL && (
        <LeftResizeHandler displayName={displayName} />
      )}
      {resizeDirection !== RESIZE_DIRECTION.VERTICAL && (
        <RightResizeHandler displayName={displayName} />
      )}
      {resizeDirection === RESIZE_DIRECTION.ALL && (
        <BottomLeftResizeHandler displayName={displayName} />
      )}
      {resizeDirection !== RESIZE_DIRECTION.HORIZONTAL && (
        <BottomResizeHandler displayName={displayName} />
      )}
      {resizeDirection === RESIZE_DIRECTION.ALL && (
        <BottomRightResizeHandler displayName={displayName} />
      )}
    </div>
  )
}

ResizeHandler.displayName = "ResizeHandler"

export default memo(ResizeHandler)
