import { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const resourcesOperationReport = (
  reduxAction: string,
  currentAppID: string,
  action: PayloadAction<any>,
  teamID: string,
  uid: string,
  prevRootState: RootState,
  nextRootState: RootState,
) => {
  const { payload } = action
  switch (reduxAction) {
  }
}
