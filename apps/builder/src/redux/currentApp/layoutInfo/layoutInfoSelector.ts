import { createSelector } from "@reduxjs/toolkit"
import { getCurrentApp } from "../selector"

export const layoutInfo = createSelector(
  [getCurrentApp],
  (currentApp) => currentApp.layoutInfo,
)

export const getClientWidgetLayoutInfo = createSelector(
  [layoutInfo],
  (layoutInfo) => layoutInfo.widgetsLayoutInfo,
)
