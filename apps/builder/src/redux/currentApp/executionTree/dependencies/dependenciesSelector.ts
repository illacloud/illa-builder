import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import toposort from "toposort"

export const getDependencies = (state: RootState) =>
  state.currentApp.executionTree.dependencies

// TODO:Longbo
export const getEvalOrderSelector = createSelector(
  [getDependencies],
  (dependencies) => {
    const dependencyTree: Array<[string, string]> = []
    Object.keys(dependencies).forEach((key: string) => {
      if (dependencies[key].length) {
        dependencies[key].forEach((dep) => dependencyTree.push([key, dep]))
      } else {
        dependencyTree.push([key, ""])
      }
    })

    const order = toposort(dependencyTree).filter((d) => !!d)

    return {
      order,
      point: -1,
    }
  },
)
