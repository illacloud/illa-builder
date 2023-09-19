import { FC, useCallback } from "react"
import BaseSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseSelect"
import { BaseSelectSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/interface"
import {
  generateNewButtonCellContent,
  generateNewIconCellContent,
} from "@/page/App/components/InspectPanel/PanelSetters/TableSetter/CellSetter/utils/generateNewColumns"
import {
  ColumnType,
  ColumnTypeOption,
  Columns,
} from "@/widgetLibrary/TableWidget/interface"

interface ColumnTypeSelectSetterProps extends BaseSelectSetterProps {}

const ColumnTypeSelectSetter: FC<ColumnTypeSelectSetterProps> = (props) => {
  const { parentAttrName, handleUpdateMultiAttrDSL } = props

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
        case Columns.ButtonGroup:
          columnProps[`${parentAttrName}.buttonGroupContent`] = [
            generateNewButtonCellContent(1),
            generateNewButtonCellContent(2),
          ]
          break
        case Columns.IconGroup:
          columnProps[`${parentAttrName}.iconGroupContent`] = [
            generateNewIconCellContent(1),
          ]
          break
      }
      handleUpdateMultiAttrDSL?.({
        ...columnProps,
        [attrName]: value,
      })
    },
    [handleUpdateMultiAttrDSL, parentAttrName],
  )

  return (
    <BaseSelectSetter
      {...props}
      handleUpdateDsl={handleUpdateDsl}
      options={ColumnTypeOption}
    />
  )
}

ColumnTypeSelectSetter.displayName = "ColumnTypeSelectSetter"

export default ColumnTypeSelectSetter
