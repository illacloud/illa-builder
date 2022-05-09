import { FC, HTMLAttributes } from "react"
import { useDrag } from "react-dnd"

import { DemoStyle } from "./style"
import { FileDefaultIcon } from "@illa-design/icon"
import { ItemTypes } from "../../../dragConfig/dragType"
import { DropInfo } from "../../../dragConfig/interface"

interface DemoWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export interface PanelDrag {
  type: string
}

export interface PanelDragCollectInfo {
  opacity: number
}

export const TestWidget: FC<DemoWidgetProps> = (props) => {
  const { className } = props
    const [textCollectProps, dragRefText, dragPreviewText] = useDrag<
      PanelDrag,
      DropInfo,
      PanelDragCollectInfo
    >(
      () => ({
        type: ItemTypes.TEXT,
        item: { type: ItemTypes.TEXT, hasDropped: false } as PanelDrag,
        collect: (monitor) => {
          return {
            opacity: monitor.isDragging() ? 0.5 : 1,
          }
        },
      }),
      [],
    )

  return (
    <div
      className={className}
      css={DemoStyle}
      ref={dragRefText}
      style={{ opacity: textCollectProps.opacity }}
    >
      <FileDefaultIcon size="20px" />
      <div>Text</div>
    </div>
  )
}

TestWidget.displayName = "TestWidget"
