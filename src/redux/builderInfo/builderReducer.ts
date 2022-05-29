import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { BuilderInfo } from "@/redux/builderInfo/builderState"

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

export const updateConnectLoadingReducer: CaseReducer<
  BuilderInfo,
  PayloadAction<boolean>
> = (state, action) => {
  state.connectStatus = {
    ...state.connectStatus,
    loading: action.payload,
  }
  return state
}

export const updateConnectErrorReducer: CaseReducer<
  BuilderInfo,
  PayloadAction<boolean>
> = (state, action) => {
  state.connectStatus = {
    ...state.connectStatus,
    error: action.payload,
  }
  return state
}
