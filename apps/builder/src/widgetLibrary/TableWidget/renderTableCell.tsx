import { CellContext } from "@tanstack/table-core"
import { FC } from "react"
import {
  Button,
  ButtonGroup,
  Image,
  Link,
  Rate,
  Tag,
  getColor,
} from "@illa-design/react"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"
import {
  ColumnItemShape,
  TableCellAlign,
  TableCellButtonGroupItemProps,
  TableCellIconGroupItemProps,
  tagColorSchemeOptions,
} from "@/widgetLibrary/TableWidget/interface"
import {
  applyAlignmentStyle,
  applyIconContainerStyle,
  applyTableButtonGroupStyle,
  overFlowStyle,
} from "@/widgetLibrary/TableWidget/style"
import { getConfigFromColumnShapeData } from "@/widgetLibrary/TableWidget/utils"

export const RenderTableStringCell: FC<{
  value?: string
  alignment?: TableCellAlign
}> = (props) => {
  const { value, alignment } = props
  return <div css={applyAlignmentStyle(alignment)}>{value ? value : "-"}</div>
}

export const RenderTableLink: FC<{
  cell: CellContext<any, any>
  value?: string
  alignment?: TableCellAlign
}> = (props) => {
  const { cell, value, alignment } = props
  const cellValue = value ?? cell.getValue()

  return (
    <div css={applyAlignmentStyle(alignment)}>
      {cellValue ? (
        <Link href={cellValue} target="_blank">{`${cellValue}`}</Link>
      ) : (
        "-"
      )}
    </div>
  )
}

export const RenderTableImage: FC<{
  cell: CellContext<any, any>
  value?: string
  data: ColumnItemShape
}> = (props) => {
  const { cell, value, data } = props
  const { fromCurrentRow } = data
  const objectFit = getConfigFromColumnShapeData(
    "objectFit",
    data,
    cell.row.index,
    fromCurrentRow,
  )
  return (
    <Image
      w="100%"
      width="100%"
      height="42px"
      src={value}
      objectFit={objectFit}
      draggable={false}
    />
  )
}

export const RenderTableTag: FC<{
  cell: CellContext<any, any>
  value?: string
  color: string | "auto"
  alignment?: TableCellAlign
}> = (props) => {
  const { cell, value, color, alignment } = props
  const rowIndex = cell.row.index
  const tagDefaultColor = [
    "techPink",
    "purple",
    "red",
    "green",
    "orange",
    "cyan",
  ]
  const colorScheme =
    color === "auto"
      ? tagDefaultColor[rowIndex % tagDefaultColor.length]
      : tagColorSchemeOptions.includes(color)
      ? color
      : getColor(color, "03")

  return (
    <div css={applyAlignmentStyle(alignment)}>
      {value ? <Tag colorScheme={colorScheme}>{`${value}`}</Tag> : "-"}
    </div>
  )
}

export const RenderTableButton: FC<{
  cell: CellContext<any, any>
  value?: string
  data: ColumnItemShape
  eventPath: string
  handleOnClickMenuItem?: (path: string) => void
}> = (props) => {
  const { value, data, cell, eventPath, handleOnClickMenuItem } = props
  const rowIndex = cell.row.index
  const paths = [eventPath, `${cell.row.index}`]
  const { fromCurrentRow } = data
  const disabled = getConfigFromColumnShapeData(
    "disabled",
    data,
    rowIndex,
    fromCurrentRow,
  )
  const colorScheme = getConfigFromColumnShapeData(
    "colorScheme",
    data,
    rowIndex,
    fromCurrentRow,
  )
  const clickEvent = () => {
    handleOnClickMenuItem?.(convertPathToString(paths))
  }

  return (
    <Button
      css={overFlowStyle}
      fullWidth
      disabled={disabled}
      colorScheme={colorScheme}
      onClick={clickEvent}
    >
      {`${value ?? "-"}`}
    </Button>
  )
}

export const RenderTableButtonGroup: FC<{
  cell: CellContext<any, any>
  value?: TableCellButtonGroupItemProps[]
  alignment?: TableCellAlign
  eventPath: string
  handleOnClick?: (path: string) => void
}> = (props) => {
  const { value, alignment, eventPath, handleOnClick } = props

  const handleOnClickButtonItem = (index: number) => {
    const paths = [`${eventPath}`, "buttonGroupContent", `${index}`, "events"]
    handleOnClick?.(convertPathToString(paths))
  }
  return value ? (
    <ButtonGroup css={applyTableButtonGroupStyle(alignment)} spacing="8px">
      {value.map((item, index) => {
        const { cellValue, colorScheme, disabled, variant } = item
        return (
          <Button
            key={index}
            colorScheme={colorScheme}
            disabled={disabled}
            variant={variant}
            onClick={() => handleOnClickButtonItem(index)}
          >
            {cellValue ? cellValue : "-"}
          </Button>
        )
      })}
    </ButtonGroup>
  ) : (
    <span>{"-"}</span>
  )
}

export const RenderTableIconGroup: FC<{
  cell: CellContext<any, any>
  value?: TableCellIconGroupItemProps[]
  alignment?: TableCellAlign
  eventPath: string
  handleOnClick?: (path: string) => void
}> = (props) => {
  const { value, alignment, eventPath, handleOnClick } = props

  const handleOnClickIconItem = (index: number) => {
    const paths = [`${eventPath}`, "iconGroupContent", `${index}`, "events"]
    handleOnClick?.(convertPathToString(paths))
  }

  return (
    <div css={applyAlignmentStyle(alignment)}>
      {value ? (
        value.map((item, index) => {
          const { cellValue, colorScheme, disabled } = item
          const Icon = getIcon(cellValue)

          return Icon ? (
            <Icon
              css={applyIconContainerStyle(colorScheme, disabled)}
              key={index}
              onClick={() => !disabled && handleOnClickIconItem(index)}
            />
          ) : (
            <span>{"-"}</span>
          )
        })
      ) : (
        <span>{"-"}</span>
      )}
    </div>
  )
}

export const RenderTableMarkdown: FC<{
  value?: string
  alignment?: TableCellAlign
}> = (props) => {
  const { value, alignment } = props

  return (
    <div css={applyAlignmentStyle(alignment)}>
      {value ? (
        <ILLAMarkdown
          textString={value}
          textColor={getColor("grayBlue", "02")}
          urlColor="grayBlue"
        />
      ) : (
        <span>-</span>
      )}
    </div>
  )
}

export const RenderTableRating: FC<{
  value?: unknown
  alignment?: TableCellAlign
}> = (props) => {
  const { value, alignment } = props
  const maxCount = 5

  return (
    <div css={applyAlignmentStyle(alignment)}>
      <Rate count={maxCount} readonly value={Number(value) || 0} />
    </div>
  )
}
