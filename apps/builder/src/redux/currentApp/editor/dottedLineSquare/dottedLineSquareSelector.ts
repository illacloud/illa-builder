import { RootState } from "@/store"

export const getDottedLineSquareMap = (state: RootState) => {
  return state.currentApp.editor.dottedLineSquare
}
