import { FC, HTMLAttributes } from "react"
import { useDrag } from "react-dnd"

import { DemoStyle } from "./style"
import { FileWordIcon } from "@illa-design/icon"
import { ItemTypes } from "../../../dragConfig/dragType"
import { DropInfo } from "../../../dragConfig/interface"

interface DemoWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export interface PanelDrag {
  type: string
}

export interface PanelDragCollectInfo {
  opacity: number
}

export const DemoWidget: FC<DemoWidgetProps> = (props) => {
  const { className } = props
  const [frameCollectProps, dragRefFrame, dragPreviewFrame] = useDrag<
    PanelDrag,
    DropInfo,
    PanelDragCollectInfo
  >(
    () => ({
      type: ItemTypes.FRAME,
      item: { type: ItemTypes.FRAME, hasDropped: false } as PanelDrag,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  )

  return (
    <div
      className={className}
      css={DemoStyle}
      ref={dragRefFrame}
      style={{ opacity: frameCollectProps.opacity }}
    >
      <FileWordIcon size="20px" />
      <div>Frame</div>
    </div>
  )
}

DemoWidget.displayName = "DemoWidget"
