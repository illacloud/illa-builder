import { SerializedStyles } from "@emotion/react"
import type { CellContext, RowData } from "@tanstack/react-table"
import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    custom?: boolean
    haveMappedValue?: boolean
    style?: SerializedStyles
    getBackgroundColor?: (
      props: CellContext<TData, TValue>,
    ) => string | undefined
    getRenderedValueAsString?: (props: CellContext<TData, TValue>) => string
  }
}
