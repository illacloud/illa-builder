import { BaseSelectSetterProps } from "../../SelectSetter/interface"

export interface ColumnMappedSelectProps extends BaseSelectSetterProps {
  wrappedCodeFunc?: (code: string) => string
  onlyHasSetter?: boolean
}
