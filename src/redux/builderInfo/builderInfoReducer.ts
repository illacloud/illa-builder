import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { BuilderInfo } from "@/redux/builderInfo/builderInfoState"

export const updateLanguageReducer: CaseReducer<
  BuilderInfo,
  PayloadAction<string>
> = (state, action) => {
  state = {
    ...state,
    language: action.payload,
  }
  return state
}
