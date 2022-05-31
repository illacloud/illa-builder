import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  BuilderInfo,
  ConnectionError,
} from "@/redux/builderInfo/builderInfoState"

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
  state.connection = {
    ...state.connection,
    loading: action.payload,
  }
  return state
}

export const updateConnectErrorReducer: CaseReducer<
  BuilderInfo,
  PayloadAction<ConnectionError>
> = (state, action) => {
  state.connection = {
    ...state.connection,
    error: action.payload,
  }
  return state
}
