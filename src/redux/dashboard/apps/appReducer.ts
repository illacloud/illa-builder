import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  AddAppPayload,
  RenameAppPayload,
} from "@/redux/dashboard/apps/appPayload"
import { AppsState, DashboardApp } from "@/redux/dashboard/apps/appState"

export const updateAppListReducer: CaseReducer<
  AppsState,
  PayloadAction<DashboardApp[]>
> = (state, action) => {
  state.list = action.payload
}

export const addAppReducer: CaseReducer<
  AppsState,
  PayloadAction<AddAppPayload>
> = (state, action) => {
  let payload = action.payload
  if (payload.index == undefined) {
    state.list.push(payload.app)
  } else {
    let list = state.list
    state.list = [
      ...list.splice(0, payload.index),
      payload.app,
      ...list.splice(payload.index, list.length),
    ]
  }
}

export const removeAppReducer: CaseReducer<AppsState, PayloadAction<string>> = (
  state,
  action,
) => {
  let index = state.list.findIndex((element, index) => {
    return element.appId == action.payload
  })
  if (index != -1) {
    let list = state.list
    state.list = [
      ...list.splice(0, index),
      ...list.splice(index + 1, list.length),
    ]
  }
}

export const renameAppReducer: CaseReducer<
  AppsState,
  PayloadAction<RenameAppPayload>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index].appName = action.payload.newName
  }
}
