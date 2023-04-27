import { CellContext } from "@tanstack/table-core"
import { FC } from "react"
import {
  Button,
  ButtonGroup,
  Image,
  Link,
  Tag,
  getColor,
} from "@illa-design/react"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"
import {
  ColumnItemShape,
  TableCellButtonGroupItemProps,
  TableCellIconGroupItemProps,
  tagColorSchemeOptions,
} from "@/widgetLibrary/TableWidget/interface"
import {
  applyIconContainerStyle,
  overFlowStyle,
} from "@/widgetLibrary/TableWidget/style"
import { getConfigFromColumnShapeData } from "@/widgetLibrary/TableWidget/utils"

export const RenderTableLink: FC<{
  cell: CellContext<any, any>
  value?: string
}> = (props) => {
  const { cell, value } = props
  const cellValue = value ?? cell.getValue()

  return cellValue ? (
    <Link href={cellValue} target="_blank">{`${cellValue}`}</Link>
  ) : (
    <span>{"-"}</span>
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
}> = (props) => {
  const { cell, value, color } = props
  const cellValue = value ?? cell.getValue()
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

  return cellValue ? (
    <Tag colorScheme={colorScheme}>{`${cellValue}`}</Tag>
  ) : (
    <span>{"-"}</span>
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
  eventPath: string
  handleOnClick?: (path: string) => void
}> = (props) => {
  const { cell, value, eventPath, handleOnClick } = props

  const handleOnClickButtonItem = (index: number) => {
    const paths = [`${eventPath}`, "buttonGroupContent", `${index}`, "events"]
    handleOnClick?.(convertPathToString(paths))
  }
  return value ? (
    <ButtonGroup spacing="8px">
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
  eventPath: string
  handleOnClick?: (path: string) => void
}> = (props) => {
  const { cell, value, eventPath, handleOnClick } = props

  const handleOnClickIconItem = (index: number) => {
    const paths = [`${eventPath}`, "iconGroupContent", `${index}`, "events"]
    handleOnClick?.(convertPathToString(paths))
  }

  return value ? (
    <div>
      {value.map((item, index) => {
        const { label, cellValue, colorScheme, disabled } = item
        const Icon = getIcon(cellValue)

        return Icon ? (
          <Icon
            css={applyIconContainerStyle(colorScheme, disabled)}
            key={index}
            onClick={() => !disabled && handleOnClickIconItem(index)}
          />
        ) : (
          "-"
        )
      })}
    </div>
  ) : (
    <span>{"-"}</span>
  )
}
