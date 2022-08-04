import { RootState } from "@/store"

export const getBuilderInfo = (state: RootState) => {
  return state.builderInfo
}

export const getLanguageValue = (state: RootState) => {
  return state.builderInfo.language
}
