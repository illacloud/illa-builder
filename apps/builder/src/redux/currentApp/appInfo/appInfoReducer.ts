import { AppInfoShape } from "@illa-public/public-types"
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

export const updateAppInfoReducer: CaseReducer<
  AppInfoShape,
  PayloadAction<AppInfoShape>
> = (state, action) => {
  return action.payload
}

export const updateAppContributeReducer: CaseReducer<
  AppInfoShape,
  PayloadAction<boolean>
> = (state, action) => {
  state.config.publishedToMarketplace = action.payload
}

export const updateAppPublicReducer: CaseReducer<
  AppInfoShape,
  PayloadAction<boolean>
> = (state, action) => {
  state.config.public = action.payload
}

export const updateAppDeployedReducer: CaseReducer<
  AppInfoShape,
  PayloadAction<boolean>
> = (state, action) => {
  state.deployed = action.payload
}
