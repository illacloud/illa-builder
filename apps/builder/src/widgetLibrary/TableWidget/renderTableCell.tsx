import { CellContext } from "@tanstack/table-core"
import { FC } from "react"
import { Button, Image, Link } from "@illa-design/react"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { overFlowStyle } from "@/widgetLibrary/TableWidget/style"
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
