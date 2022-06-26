import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

export const getDependencies = (state: RootState) =>
  state.currentApp.executionTree.dependencies

// TODO:Longbo
export const getEvalOrderSelector = createSelector(
  [getDependencies],
  (dependencies) => {},
)
