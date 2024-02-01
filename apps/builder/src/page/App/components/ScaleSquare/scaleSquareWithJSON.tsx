import { memo } from "react"
import { Rnd } from "react-rnd"
import { TransformWidgetWrapperWithJson } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/renderWithJSON"
import { UNIT_HEIGHT } from "../DotPanel/constant/canvas"
import { DEFAULT_MIN_COLUMN } from "./constant/widget"
import { ScaleSquarePropsWithJSON } from "./interface"
import { jsonWrapperPendingStyle } from "./style"
import { getRealShapeAndPosition } from "./utils/getRealShapeAndPosition"

const ScaleSquareWithJSON = (props: ScaleSquarePropsWithJSON) => {
  const { componentNode, unitW, displayNamePrefix } = props
  const { x, y, w, h } = getRealShapeAndPosition(
    componentNode,
    unitW,
    displayNamePrefix,
  )

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
      minWidth={DEFAULT_MIN_COLUMN * unitW}
      minHeight={componentNode.minH * UNIT_HEIGHT}
    >
      <div className="wrapperPending" css={jsonWrapperPendingStyle}>
        <TransformWidgetWrapperWithJson
          componentNode={componentNode}
          unitW={unitW}
        />
      </div>
    </Rnd>
  )
}

ScaleSquareWithJSON.displayName = "ScaleSquareWithJSON"
export default memo(ScaleSquareWithJSON)
