import FilterAltIcon from "@mui/icons-material/FilterAlt"
import RefreshIcon from "@mui/icons-material/Refresh"
import { Button } from "@mui/material"
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid-premium"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ExportAllSetting } from "../ExportAllSetting"
import { ToolbarProps } from "./interface"

export const Toolbar: FC<ToolbarProps> = (props) => {
  const {
    columnSetting,
    filterSetting,
    densitySetting,
    exportSetting,
    exportAllSetting,
    refreshSetting,
    quickFilterSetting,
    onRefresh,
  } = props

  const { t } = useTranslation()

  return (
    <GridToolbarContainer>
      {columnSetting && <GridToolbarColumnsButton />}
      {filterSetting && (
        <GridToolbarFilterButton
          componentsProps={{
            button: {
              startIcon: <FilterAltIcon />,
            },
          }}
        />
      )}
      {densitySetting && <GridToolbarDensitySelector />}
      {exportSetting && <GridToolbarExport />}
      {exportAllSetting && <ExportAllSetting />}
      {refreshSetting && (
        <Button
          startIcon={<RefreshIcon />}
          size="small"
          onClick={() => {
            onRefresh()
          }}
        >
          {t("widget.table.refresh")}
        </Button>
      )}
      {quickFilterSetting && <GridToolbarQuickFilter />}
    </GridToolbarContainer>
  )
}

Toolbar.displayName = "Toolbar"
