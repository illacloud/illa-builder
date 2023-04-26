import { FC, useCallback, useMemo } from "react"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { ColumnItemShape, Columns, ColumnType, ColumnTypeOption } from "@/widgetLibrary/TableWidget/interface"
import { BaseSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"

interface ColumnTypeSelectSetterProps extends BaseSelectSetterProps {
}

export const ColumnTypeSelectSetter: FC<ColumnTypeSelectSetterProps> = (
  props,
) => {
  const { widgetDisplayName, parentAttrName, handleUpdateMultiAttrDSL } = props


  const handleUpdateDsl = useCallback(
    (attrName: string, value: ColumnType) => {
      let columnProps: Record<string, unknown> = {}
      switch (value) {
        case Columns.Date:
          columnProps[`${parentAttrName}.format`] = "YYYY-MM-DD"
          break
        case Columns.DateTime:
          columnProps[`${parentAttrName}.format`] = "YYYY-MM-DD HH:mm:ss"
          break
        case Columns.Time:
          columnProps[`${parentAttrName}.format`] = "HH:mm:ss"
          break
      }
      handleUpdateMultiAttrDSL?.({
        ...columnProps,
        [attrName]: value,
      })
    },
    [handleUpdateMultiAttrDSL],
  )

  return (
    <BaseSelectSetter
      {...props}
      handleUpdateDsl={handleUpdateDsl}
      options={ColumnTypeOption}
    />
  )
}
