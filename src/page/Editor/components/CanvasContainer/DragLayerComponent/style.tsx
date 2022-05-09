import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { DragLayerProps } from "./index"

export const GridDefaults = {
  DEFAULT_CELL_SIZE: 1,
  DEFAULT_WIDGET_WIDTH: 200,
  DEFAULT_WIDGET_HEIGHT: 100,
  DEFAULT_GRID_COLUMNS: 64,
  DEFAULT_GRID_ROW_HEIGHT: 10,
  CANVAS_EXTENSION_OFFSET: 2,
}

export const CONTAINER_GRID_PADDING = GridDefaults.DEFAULT_GRID_ROW_HEIGHT * 0.6

const GRID_POINT_SIZE = 1

export function applyDragLayer(
  props: DragLayerProps,
): SerializedStyles {
  return css`
    position: absolute;
    pointer-events: none;
    left: ${props.noPad
      ? "0"
      : `${CONTAINER_GRID_PADDING - GRID_POINT_SIZE}px`};
    top: ${props.noPad
      ? "0"
      : `${CONTAINER_GRID_PADDING - GRID_POINT_SIZE}px}`};
    height: ${props.noPad
      ? `100%`
      : `calc(100% - ${(CONTAINER_GRID_PADDING - GRID_POINT_SIZE) * 2}px)}`};

    width: ${props.noPad
      ? `100%`
      : `calc(100% - ${(CONTAINER_GRID_PADDING - GRID_POINT_SIZE) * 2}px)`};

    background-image: radial-gradient(
      circle at ${GRID_POINT_SIZE}px ${GRID_POINT_SIZE}px,
      ${globalColor(`--${illaPrefix}-grayBlue-08`)} ${GRID_POINT_SIZE}px,
      transparent 0
    );
    background-size: ${props.columnWidth -
      GRID_POINT_SIZE / GridDefaults.DEFAULT_GRID_COLUMNS}px
      ${props.rowHeight}px;
  `
}
