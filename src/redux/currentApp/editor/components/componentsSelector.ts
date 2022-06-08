import { RootState } from "@/store"
import { BaseDSL } from "@/wrappedComponents/interface"

export function searchDsl(
  children: BaseDSL[],
  displayName: string,
): BaseDSL | null {
  children.forEach((value, index, array) => {
    if (value.displayName == displayName) {
      return value
    } else {
      if (value.childrenNode != undefined) {
        return searchDsl(value.childrenNode, displayName)
      }
    }
  })
  return null
}

export const getBaseDSL = (state: RootState, displayName: string) => {
  const map: Map<string, BaseDSL> = state.currentApp.editor.components.map
  map.forEach((value, key) => {})
}
