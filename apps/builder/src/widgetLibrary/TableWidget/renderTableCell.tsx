import { convertPathToString } from "@illa-public/dynamic-string"
import { CellContext } from "@tanstack/table-core"
import { FC, SyntheticEvent } from "react"
import {
  Button,
  ButtonGroup,
  Image,
  Link,
  Rate,
  Tag,
  getColor,
  getSpecialThemeColor,
} from "@illa-design/react"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
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
  applyFlexAlignmentStyle,
  applyIconContainerStyle,
  applyTableButtonGroupStyle,
  applyTableCellBackgroundStyle,
  overFlowStyle,
} from "@/widgetLibrary/TableWidget/style"
import {
  getConfigFromColumnShapeData,
  getMappedValue,
} from "@/widgetLibrary/TableWidget/utils"

export const RenderTableStringCell: FC<{
  value?: string
  alignment?: TableCellAlign
  bgColor?: string
}> = (props) => {
  const { value, alignment, bgColor } = props
  return (
    <span
      css={[
        applyAlignmentStyle(alignment),
        applyTableCellBackgroundStyle(bgColor),
      ]}
    >
      {value ? value : "-"}
    </span>
  )
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

const getTagColor = (color: string, rowIndex: number, index: number) => {
  const tagDefaultColor = [
    "techPink",
    "purple",
    "red",
    "green",
    "orange",
    "cyan",
  ]

  return color === "auto"
    ? tagDefaultColor[(rowIndex + index) % tagDefaultColor.length]
    : tagColorSchemeOptions.includes(color)
      ? color
      : getSpecialThemeColor(color)
}

export const RenderTableTag: FC<{
  cell: CellContext<any, any>
  value?: Array<unknown>
  color: string | "auto"
  alignment?: TableCellAlign
}> = (props) => {
  const { cell, value, color, alignment } = props
  const rowIndex = cell.row.index

  return (
    <div css={applyFlexAlignmentStyle(alignment)}>
      {value?.length ? (
        value?.map((itemValue, index) => {
          const colorScheme = getTagColor(color, rowIndex, index)
          return (
            <Tag key={index} colorScheme={colorScheme}>
              {`${itemValue}`}
            </Tag>
          )
        })
      ) : (
        <Tag colorScheme={getTagColor(color, rowIndex, 0)}>{"-"}</Tag>
      )}
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
  const { fromCurrentRow, variant, colorScheme } = data
  const disabled = getConfigFromColumnShapeData(
    "disabled",
    data,
    rowIndex,
    fromCurrentRow,
  )
  const clickEvent = (e: SyntheticEvent) => {
    cell.row.getIsSelected() && e.stopPropagation()
    handleOnClickMenuItem?.(convertPathToString(paths))
  }

  return (
    <Button
      css={overFlowStyle}
      fullWidth
      variant={variant}
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
  handleOnClick?: (path: string, index?: number) => void
}> = (props) => {
  const { cell, value, alignment, eventPath, handleOnClick } = props
  const rowIndex = cell.row.index

  const handleOnClickButtonItem = (e: SyntheticEvent, index: number) => {
    cell.row.getIsSelected() && e.stopPropagation()
    const paths = [`${eventPath}`, "buttonGroupContent", `${index}`, "events"]
    handleOnClick?.(convertPathToString(paths), rowIndex)
  }

  return value ? (
    <ButtonGroup css={applyTableButtonGroupStyle(alignment)} spacing="8px">
      {value.map((item, index) => {
        const { cellValue, colorScheme, disabled, variant, fromCurrentRow } =
          item
        const _disabled = getMappedValue(
          rowIndex,
          disabled,
          fromCurrentRow,
          "disabled",
          false,
        )

        return (
          <Button
            key={index}
            colorScheme={colorScheme}
            disabled={_disabled}
            variant={variant}
            onClick={(e) => handleOnClickButtonItem(e, index)}
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
  handleOnClick?: (path: string, index?: number) => void
}> = (props) => {
  const { cell, value, alignment, eventPath, handleOnClick } = props
  const rowIndex = cell.row.index
  const handleOnClickIconItem = (e: SyntheticEvent, index: number) => {
    cell.row.getIsSelected() && e.stopPropagation()
    const paths = [`${eventPath}`, "iconGroupContent", `${index}`, "events"]
    handleOnClick?.(convertPathToString(paths), rowIndex)
  }

  return (
    <div css={applyAlignmentStyle(alignment)}>
      {value ? (
        value.map((item, index) => {
          const { cellValue, colorScheme, disabled, fromCurrentRow } = item
          const Icon = getIcon(cellValue)
          const _disabled = getMappedValue(
            rowIndex,
            disabled,
            fromCurrentRow,
            "disabled",
            false,
          )
          return Icon ? (
            <Icon
              css={applyIconContainerStyle(colorScheme, _disabled)}
              key={index}
              onClick={(e) => !_disabled && handleOnClickIconItem(e, index)}
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
