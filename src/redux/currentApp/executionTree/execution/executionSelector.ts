import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const getExecution = (state: RootState) =>
  state.currentApp.executionTree.execution
