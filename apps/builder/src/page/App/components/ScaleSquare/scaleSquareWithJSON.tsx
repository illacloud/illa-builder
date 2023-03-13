import { memo } from "react"
import { Rnd } from "react-rnd"
import { TransformWidgetWrapperWithJson } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/renderWithJSON"
import { ScaleSquarePropsWithJSON } from "./interface"
import { applyWrapperPendingStyle } from "./style"
import { getRealShapeAndPosition } from "./utils/getRealShapeAndPosition"

export const ScaleSquareWithJSON = memo<ScaleSquarePropsWithJSON>(
  (props: ScaleSquarePropsWithJSON) => {
    const { componentNode, unitW, unitH, blockColumns } = props
    const { x, y, w, h } = getRealShapeAndPosition(componentNode, unitH, unitW)

    return (
      <Rnd
        bounds="parent"
        size={{
          width: w,
          height: h,
        }}
        position={{
          x: x,
          y: y,
        }}
        enableResizing={false}
        disableDragging
        minWidth={componentNode.minW * unitW}
        minHeight={componentNode.minH * unitH}
      >
        <div
          className="wrapperPending"
          css={applyWrapperPendingStyle(
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          )}
        >
          <TransformWidgetWrapperWithJson
            componentNode={componentNode}
            blockColumns={blockColumns}
          />
        </div>
      </Rnd>
    )
  },
)

ScaleSquareWithJSON.displayName = "ScaleSquareWithJSON"
