import { CellContext } from "@tanstack/table-core"
import { Link } from "@illa-design/link"

const renderTableLink = (props: CellContext<any, any>) => {
  const cellValue = props.getValue()
  return cellValue ? (
    <Link href={cellValue} target="_blank">{`${cellValue}`}</Link>
  ) : (
    "-"
  )
}
